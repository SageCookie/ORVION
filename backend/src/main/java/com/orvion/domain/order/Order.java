package com.orvion.domain.order;

import com.orvion.domain.customer.Customer;
import com.orvion.domain.quotation.Quotation;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quotation_id")
    private Quotation quotation;

    @Column(nullable = false, length = 30)
    private String status = "PENDING";

    @Column(nullable = false, length = 20)
    private String priority = "NORMAL";

    @Column(nullable = false)
    private LocalDate orderDate;

    @Column(nullable = false)
    private LocalDate promisedDeliveryDate;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal taxAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal grandTotal;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Order() {}

    public Order(Long id, String orderNumber, Customer customer, Quotation quotation, String status, String priority, LocalDate orderDate, LocalDate promisedDeliveryDate, BigDecimal subtotal, BigDecimal taxAmount, BigDecimal discountAmount, BigDecimal grandTotal, List<OrderItem> items, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.customer = customer;
        this.quotation = quotation;
        this.status = status != null ? status : "PENDING";
        this.priority = priority != null ? priority : "NORMAL";
        this.orderDate = orderDate;
        this.promisedDeliveryDate = promisedDeliveryDate;
        this.subtotal = subtotal;
        this.taxAmount = taxAmount;
        this.discountAmount = discountAmount != null ? discountAmount : BigDecimal.ZERO;
        this.grandTotal = grandTotal;
        this.items = items != null ? items : new ArrayList<>();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static OrderBuilder builder() { return new OrderBuilder(); }

    public static class OrderBuilder {
        private Long id;
        private String orderNumber;
        private Customer customer;
        private Quotation quotation;
        private String status = "PENDING";
        private String priority = "NORMAL";
        private LocalDate orderDate;
        private LocalDate promisedDeliveryDate;
        private BigDecimal subtotal;
        private BigDecimal taxAmount;
        private BigDecimal discountAmount = BigDecimal.ZERO;
        private BigDecimal grandTotal;
        private List<OrderItem> items = new ArrayList<>();
        private Instant createdAt;
        private Instant updatedAt;

        public OrderBuilder id(Long id) { this.id = id; return this; }
        public OrderBuilder orderNumber(String orderNumber) { this.orderNumber = orderNumber; return this; }
        public OrderBuilder customer(Customer customer) { this.customer = customer; return this; }
        public OrderBuilder quotation(Quotation quotation) { this.quotation = quotation; return this; }
        public OrderBuilder status(String status) { this.status = status; return this; }
        public OrderBuilder priority(String priority) { this.priority = priority; return this; }
        public OrderBuilder orderDate(LocalDate orderDate) { this.orderDate = orderDate; return this; }
        public OrderBuilder promisedDeliveryDate(LocalDate promisedDeliveryDate) { this.promisedDeliveryDate = promisedDeliveryDate; return this; }
        public OrderBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
        public OrderBuilder taxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; return this; }
        public OrderBuilder discountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; return this; }
        public OrderBuilder grandTotal(BigDecimal grandTotal) { this.grandTotal = grandTotal; return this; }
        public OrderBuilder items(List<OrderItem> items) { this.items = items; return this; }
        public OrderBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public OrderBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Order build() {
            return new Order(id, orderNumber, customer, quotation, status, priority, orderDate, promisedDeliveryDate, subtotal, taxAmount, discountAmount, grandTotal, items, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    public Quotation getQuotation() { return quotation; }
    public void setQuotation(Quotation quotation) { this.quotation = quotation; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public LocalDate getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDate orderDate) { this.orderDate = orderDate; }
    public LocalDate getPromisedDeliveryDate() { return promisedDeliveryDate; }
    public void setPromisedDeliveryDate(LocalDate promisedDeliveryDate) { this.promisedDeliveryDate = promisedDeliveryDate; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public BigDecimal getTaxAmount() { return taxAmount; }
    public void setTaxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; }
    public BigDecimal getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; }
    public BigDecimal getGrandTotal() { return grandTotal; }
    public void setGrandTotal(BigDecimal grandTotal) { this.grandTotal = grandTotal; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
