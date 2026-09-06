package com.orvion.domain.payment;

import com.orvion.domain.invoice.Invoice;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String paymentNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 30)
    private String paymentMethod;

    @Column(length = 100)
    private String referenceNumber;

    @Column(nullable = false)
    private LocalDate paymentDate;

    @Column(nullable = false, length = 20)
    private String status = "COMPLETED";

    @Column(length = 100)
    private String recordedBy;

    @Column(length = 500)
    private String notes;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public Payment() {}

    public Payment(Long id, String paymentNumber, Invoice invoice, BigDecimal amount, String paymentMethod, String referenceNumber, LocalDate paymentDate, String status, String recordedBy, String notes, Instant createdAt) {
        this.id = id;
        this.paymentNumber = paymentNumber;
        this.invoice = invoice;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.referenceNumber = referenceNumber;
        this.paymentDate = paymentDate;
        this.status = status != null ? status : "COMPLETED";
        this.recordedBy = recordedBy;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    public static PaymentBuilder builder() { return new PaymentBuilder(); }

    public static class PaymentBuilder {
        private Long id;
        private String paymentNumber;
        private Invoice invoice;
        private BigDecimal amount;
        private String paymentMethod;
        private String referenceNumber;
        private LocalDate paymentDate;
        private String status = "COMPLETED";
        private String recordedBy;
        private String notes;
        private Instant createdAt;

        public PaymentBuilder id(Long id) { this.id = id; return this; }
        public PaymentBuilder paymentNumber(String paymentNumber) { this.paymentNumber = paymentNumber; return this; }
        public PaymentBuilder invoice(Invoice invoice) { this.invoice = invoice; return this; }
        public PaymentBuilder amount(BigDecimal amount) { this.amount = amount; return this; }
        public PaymentBuilder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public PaymentBuilder referenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; return this; }
        public PaymentBuilder paymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; return this; }
        public PaymentBuilder status(String status) { this.status = status; return this; }
        public PaymentBuilder recordedBy(String recordedBy) { this.recordedBy = recordedBy; return this; }
        public PaymentBuilder notes(String notes) { this.notes = notes; return this; }
        public PaymentBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Payment build() {
            return new Payment(id, paymentNumber, invoice, amount, paymentMethod, referenceNumber, paymentDate, status, recordedBy, notes, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPaymentNumber() { return paymentNumber; }
    public void setPaymentNumber(String paymentNumber) { this.paymentNumber = paymentNumber; }
    public Invoice getInvoice() { return invoice; }
    public void setInvoice(Invoice invoice) { this.invoice = invoice; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }
    public LocalDate getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRecordedBy() { return recordedBy; }
    public void setRecordedBy(String recordedBy) { this.recordedBy = recordedBy; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
