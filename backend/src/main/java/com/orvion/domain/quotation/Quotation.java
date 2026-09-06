package com.orvion.domain.quotation;

import com.orvion.domain.customer.Customer;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quotations")
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String quotationNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(nullable = false, length = 30)
    private String status = "DRAFT";

    @Column(nullable = false)
    private LocalDate issueDate;

    @Column(nullable = false)
    private LocalDate validUntil;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal taxAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal grandTotal;

    @Column(length = 500)
    private String notes;

    @OneToMany(mappedBy = "quotation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<QuotationItem> items = new ArrayList<>();

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Quotation() {}

    public Quotation(Long id, String quotationNumber, Customer customer, String status, LocalDate issueDate, LocalDate validUntil, BigDecimal subtotal, BigDecimal taxAmount, BigDecimal discountAmount, BigDecimal grandTotal, String notes, List<QuotationItem> items, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.quotationNumber = quotationNumber;
        this.customer = customer;
        this.status = status != null ? status : "DRAFT";
        this.issueDate = issueDate;
        this.validUntil = validUntil;
        this.subtotal = subtotal;
        this.taxAmount = taxAmount;
        this.discountAmount = discountAmount != null ? discountAmount : BigDecimal.ZERO;
        this.grandTotal = grandTotal;
        this.notes = notes;
        this.items = items != null ? items : new ArrayList<>();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static QuotationBuilder builder() { return new QuotationBuilder(); }

    public static class QuotationBuilder {
        private Long id;
        private String quotationNumber;
        private Customer customer;
        private String status = "DRAFT";
        private LocalDate issueDate;
        private LocalDate validUntil;
        private BigDecimal subtotal;
        private BigDecimal taxAmount;
        private BigDecimal discountAmount = BigDecimal.ZERO;
        private BigDecimal grandTotal;
        private String notes;
        private List<QuotationItem> items = new ArrayList<>();
        private Instant createdAt;
        private Instant updatedAt;

        public QuotationBuilder id(Long id) { this.id = id; return this; }
        public QuotationBuilder quotationNumber(String quotationNumber) { this.quotationNumber = quotationNumber; return this; }
        public QuotationBuilder customer(Customer customer) { this.customer = customer; return this; }
        public QuotationBuilder status(String status) { this.status = status; return this; }
        public QuotationBuilder issueDate(LocalDate issueDate) { this.issueDate = issueDate; return this; }
        public QuotationBuilder validUntil(LocalDate validUntil) { this.validUntil = validUntil; return this; }
        public QuotationBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
        public QuotationBuilder taxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; return this; }
        public QuotationBuilder discountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; return this; }
        public QuotationBuilder grandTotal(BigDecimal grandTotal) { this.grandTotal = grandTotal; return this; }
        public QuotationBuilder notes(String notes) { this.notes = notes; return this; }
        public QuotationBuilder items(List<QuotationItem> items) { this.items = items; return this; }
        public QuotationBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public QuotationBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Quotation build() {
            return new Quotation(id, quotationNumber, customer, status, issueDate, validUntil, subtotal, taxAmount, discountAmount, grandTotal, notes, items, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getQuotationNumber() { return quotationNumber; }
    public void setQuotationNumber(String quotationNumber) { this.quotationNumber = quotationNumber; }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }
    public LocalDate getValidUntil() { return validUntil; }
    public void setValidUntil(LocalDate validUntil) { this.validUntil = validUntil; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public BigDecimal getTaxAmount() { return taxAmount; }
    public void setTaxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; }
    public BigDecimal getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; }
    public BigDecimal getGrandTotal() { return grandTotal; }
    public void setGrandTotal(BigDecimal grandTotal) { this.grandTotal = grandTotal; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public List<QuotationItem> getItems() { return items; }
    public void setItems(List<QuotationItem> items) { this.items = items; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
