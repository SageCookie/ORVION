package com.orvion.domain.invoice;

import com.orvion.common.exception.ResourceNotFoundException;
import com.orvion.domain.order.Order;
import com.orvion.domain.order.OrderItem;
import com.orvion.domain.order.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;

@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final OrderRepository orderRepository;

    public InvoiceService(InvoiceRepository invoiceRepository, OrderRepository orderRepository) {
        this.invoiceRepository = invoiceRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional(readOnly = true)
    public Page<Invoice> getInvoices(String query, int page, int size) {
        return invoiceRepository.searchInvoices(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public Invoice getById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));
    }

    @Transactional
    public Invoice generateInvoiceFromOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        Invoice invoice = Invoice.builder()
                .invoiceNumber("INV-" + System.currentTimeMillis() % 100000)
                .order(order)
                .customer(order.getCustomer())
                .status("UNPAID")
                .issueDate(LocalDate.now())
                .dueDate(LocalDate.now().plusDays(30))
                .subtotal(order.getSubtotal())
                .taxAmount(order.getTaxAmount())
                .discountAmount(order.getDiscountAmount())
                .grandTotal(order.getGrandTotal())
                .paidAmount(BigDecimal.ZERO)
                .balanceDue(order.getGrandTotal())
                .items(new ArrayList<>())
                .build();

        if (order.getItems() != null) {
            for (OrderItem oItem : order.getItems()) {
                InvoiceItem iItem = InvoiceItem.builder()
                        .invoice(invoice)
                        .product(oItem.getProduct())
                        .quantity(oItem.getQuantity())
                        .unitPrice(oItem.getUnitPrice())
                        .taxRate(oItem.getTaxRate())
                        .lineTotal(oItem.getLineTotal())
                        .build();
                invoice.getItems().add(iItem);
            }
        }

        return invoiceRepository.save(invoice);
    }
}
