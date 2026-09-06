package com.orvion.domain.quotation;

import com.orvion.common.exception.BadRequestException;
import com.orvion.common.exception.ResourceNotFoundException;
import com.orvion.domain.customer.Customer;
import com.orvion.domain.customer.CustomerRepository;
import com.orvion.domain.order.OrderService;
import com.orvion.domain.product.Product;
import com.orvion.domain.product.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;

@Service
public class QuotationService {
    private final QuotationRepository quotationRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final OrderService orderService;

    public QuotationService(QuotationRepository quotationRepository,
                            CustomerRepository customerRepository,
                            ProductRepository productRepository,
                            OrderService orderService) {
        this.quotationRepository = quotationRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.orderService = orderService;
    }

    @Transactional(readOnly = true)
    public Page<Quotation> getQuotations(String query, int page, int size) {
        return quotationRepository.searchQuotations(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public Quotation getById(Long id) {
        return quotationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quotation not found with id: " + id));
    }

    @Transactional
    public Quotation createQuotation(QuotationCreateRequest req) {
        Customer customer = customerRepository.findById(req.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Quotation quotation = Quotation.builder()
                .quotationNumber("QT-" + System.currentTimeMillis() % 100000)
                .customer(customer)
                .status("DRAFT")
                .issueDate(req.getIssueDate() != null ? req.getIssueDate() : LocalDate.now())
                .validUntil(req.getValidUntil() != null ? req.getValidUntil() : LocalDate.now().plusDays(30))
                .notes(req.getNotes())
                .discountAmount(req.getDiscountAmount() != null ? req.getDiscountAmount() : BigDecimal.ZERO)
                .subtotal(BigDecimal.ZERO)
                .taxAmount(BigDecimal.ZERO)
                .grandTotal(BigDecimal.ZERO)
                .items(new ArrayList<>())
                .build();

        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal taxTotal = BigDecimal.ZERO;

        if (req.getItems() != null) {
            for (QuotationItemRequest itemReq : req.getItems()) {
                Product product = productRepository.findById(itemReq.getProductId())
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + itemReq.getProductId()));

                BigDecimal unitPrice = itemReq.getUnitPrice() != null ? itemReq.getUnitPrice() : product.getSellingPrice();
                int qty = itemReq.getQuantity() != null ? itemReq.getQuantity() : 1;
                BigDecimal lineBase = unitPrice.multiply(BigDecimal.valueOf(qty));
                BigDecimal lineDiscount = itemReq.getDiscount() != null ? itemReq.getDiscount() : BigDecimal.ZERO;
                BigDecimal lineSub = lineBase.subtract(lineDiscount);

                BigDecimal taxRate = product.getTaxRate() != null ? product.getTaxRate() : BigDecimal.valueOf(18);
                BigDecimal lineTax = lineSub.multiply(taxRate).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                BigDecimal lineTotal = lineSub.add(lineTax);

                subtotal = subtotal.add(lineSub);
                taxTotal = taxTotal.add(lineTax);

                QuotationItem item = QuotationItem.builder()
                        .quotation(quotation)
                        .product(product)
                        .quantity(qty)
                        .unitPrice(unitPrice)
                        .taxRate(taxRate)
                        .discount(lineDiscount)
                        .lineTotal(lineTotal)
                        .build();

                quotation.getItems().add(item);
            }
        }

        quotation.setSubtotal(subtotal);
        quotation.setTaxAmount(taxTotal);
        BigDecimal grand = subtotal.add(taxTotal).subtract(quotation.getDiscountAmount());
        quotation.setGrandTotal(grand.compareTo(BigDecimal.ZERO) > 0 ? grand : BigDecimal.ZERO);

        return quotationRepository.save(quotation);
    }

    @Transactional
    public Quotation updateStatus(Long id, String status) {
        Quotation quote = getById(id);
        if ("CONVERTED".equalsIgnoreCase(quote.getStatus())) {
            throw new BadRequestException("Quotation is already converted and cannot change status");
        }
        quote.setStatus(status.toUpperCase());
        return quotationRepository.save(quote);
    }

    @Transactional
    public Object convertToOrder(Long id) {
        Quotation quote = getById(id);
        if ("CONVERTED".equalsIgnoreCase(quote.getStatus())) {
            throw new BadRequestException("Quotation " + quote.getQuotationNumber() + " has ALREADY been converted to an Order!");
        }

        quote.setStatus("CONVERTED");
        quotationRepository.save(quote);

        return orderService.createOrderFromQuotation(quote);
    }
}
