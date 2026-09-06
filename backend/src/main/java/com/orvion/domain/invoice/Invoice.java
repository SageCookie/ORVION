package com.orvion.domain.invoice;

import com.orvion.domain.customer.Customer;
import com.orvion.domain.order.Order;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String invoiceNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(nullable = false, length = 30)
    private String status = "UNPAID";

    @Column(nullable = false)
    private LocalDate issueDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal taxAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal grandTotal;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal paidAmount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal balanceDue;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<InvoiceItem> items = new ArrayList<>();

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Invoice() {}

    public Invoice(Long id, String invoiceNumber, Order order, Customer customer, String status, LocalDate issueDate, LocalDate dueDate, BigDecimal subtotal, BigDecimal taxAmount, BigDecimal discountAmount, BigDecimal grandTotal, BigDecimal paidAmount, BigDecimal balanceDue, List<InvoiceItem> items, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.invoiceNumber = invoiceNumber;
        this.order = order;
        this.customer = customer;
        this.status = status != null ? status : "UNPAID";
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.subtotal = subtotal;
        this.taxAmount = taxAmount;
        this.discountAmount = discountAmount != null ? discountAmount : BigDecimal.ZERO;
        this.grandTotal = grandTotal;
        this.paidAmount = paidAmount != null ? paidAmount : BigDecimal.ZERO;
        this.balanceDue = balanceDue;
        this.items = items != null ? items : new ArrayList<>();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static InvoiceBuilder builder() { return new InvoiceBuilder(); }

    public static class InvoiceBuilder {
        private Long id;
        private String invoiceNumber;
        private Order order;
        private Customer customer;
        private String status = "UNPAID";
        private LocalDate issueDate;
        private LocalDate dueDate;
        private BigDecimal subtotal;
        private BigDecimal taxAmount;
        private BigDecimal discountAmount = BigDecimal.ZERO;
        private BigDecimal grandTotal;
        private BigDecimal paidAmount = BigDecimal.ZERO;
        private BigDecimal balanceDue;
        private List<InvoiceItem> items = new ArrayList<>();
        private Instant createdAt;
        private Instant updatedAt;

        public InvoiceBuilder id(Long id) { this.id = id; return this; }
        public InvoiceBuilder invoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; return this; }
        public InvoiceBuilder order(Order order) { this.order = order; return this; }
        public InvoiceBuilder customer(Customer customer) { this.customer = customer; return this; }
        public InvoiceBuilder status(String status) { this.status = status; return this; }
        public InvoiceBuilder issueDate(LocalDate issueDate) { this.issueDate = issueDate; return this; }
        public InvoiceBuilder dueDate(LocalDate dueDate) { this.dueDate = dueDate; return this; }
        public InvoiceBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
        public InvoiceBuilder taxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; return this; }
        public InvoiceBuilder discountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; return this; }
        public InvoiceBuilder grandTotal(BigDecimal grandTotal) { this.grandTotal = grandTotal; return this; }
        public InvoiceBuilder paidAmount(BigDecimal paidAmount) { this.paidAmount = paidAmount; return this; }
        public InvoiceBuilder balanceDue(BigDecimal balanceDue) { this.balanceDue = balanceDue; return this; }
        public InvoiceBuilder items(List<InvoiceItem> items) { this.items = items; return this; }
        public InvoiceBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public InvoiceBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Invoice build() {
            return new Invoice(id, invoiceNumber, order, customer, status, issueDate, dueDate, subtotal, taxAmount, discountAmount, grandTotal, paidAmount, balanceDue, items, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public BigDecimal getTaxAmount() { return taxAmount; }
    public void setTaxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; }
    public BigDecimal getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; }
    public BigDecimal getGrandTotal() { return grandTotal; }
    public void setGrandTotal(BigDecimal grandTotal) { this.grandTotal = grandTotal; }
    public BigDecimal getPaidAmount() { return paidAmount; }
    public void setPaidAmount(BigDecimal paidAmount) { this.paidAmount = paidAmount; }
    public BigDecimal getBalanceDue() { return balanceDue; }
    public void setBalanceDue(BigDecimal balanceDue) { this.balanceDue = balanceDue; }
    public List<InvoiceItem> getItems() { return items; }
    public void setItems(List<InvoiceItem> items) { this.items = items; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
