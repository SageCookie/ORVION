package com.orvion.domain.order;

import com.orvion.common.exception.ResourceNotFoundException;
import com.orvion.domain.quotation.Quotation;
import com.orvion.domain.quotation.QuotationItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional(readOnly = true)
    public Page<Order> getOrders(String query, int page, int size) {
        return orderRepository.searchOrders(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    @Transactional
    public Order createOrderFromQuotation(Quotation quote) {
        Order order = Order.builder()
                .orderNumber("ORD-" + System.currentTimeMillis() % 100000)
                .customer(quote.getCustomer())
                .quotation(quote)
                .status("PENDING")
                .priority("NORMAL")
                .orderDate(LocalDate.now())
                .promisedDeliveryDate(LocalDate.now().plusDays(14))
                .subtotal(quote.getSubtotal())
                .taxAmount(quote.getTaxAmount())
                .discountAmount(quote.getDiscountAmount())
                .grandTotal(quote.getGrandTotal())
                .items(new ArrayList<>())
                .build();

        if (quote.getItems() != null) {
            for (QuotationItem qItem : quote.getItems()) {
                OrderItem oItem = OrderItem.builder()
                        .order(order)
                        .product(qItem.getProduct())
                        .quantity(qItem.getQuantity())
                        .unitPrice(qItem.getUnitPrice())
                        .taxRate(qItem.getTaxRate())
                        .discount(qItem.getDiscount())
                        .lineTotal(qItem.getLineTotal())
                        .build();
                order.getItems().add(oItem);
            }
        }

        return orderRepository.save(order);
    }

    @Transactional
    public Order updateStatus(Long id, String status) {
        Order order = getOrderById(id);
        order.setStatus(status.toUpperCase());
        return orderRepository.save(order);
    }
}
