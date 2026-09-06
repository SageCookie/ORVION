package com.orvion.domain.invoice;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.orvion.domain.product.Product;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "invoice_items")
public class InvoiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    @JsonIgnoreProperties("items")
    private Invoice invoice;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal taxRate = BigDecimal.valueOf(18.00);

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal lineTotal;

    public InvoiceItem() {}

    public InvoiceItem(Long id, Invoice invoice, Product product, Integer quantity, BigDecimal unitPrice, BigDecimal taxRate, BigDecimal lineTotal) {
        this.id = id;
        this.invoice = invoice;
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.taxRate = taxRate != null ? taxRate : BigDecimal.valueOf(18.00);
        this.lineTotal = lineTotal;
    }

    public static InvoiceItemBuilder builder() { return new InvoiceItemBuilder(); }

    public static class InvoiceItemBuilder {
        private Long id;
        private Invoice invoice;
        private Product product;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal taxRate = BigDecimal.valueOf(18.00);
        private BigDecimal lineTotal;

        public InvoiceItemBuilder id(Long id) { this.id = id; return this; }
        public InvoiceItemBuilder invoice(Invoice invoice) { this.invoice = invoice; return this; }
        public InvoiceItemBuilder product(Product product) { this.product = product; return this; }
        public InvoiceItemBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public InvoiceItemBuilder unitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; return this; }
        public InvoiceItemBuilder taxRate(BigDecimal taxRate) { this.taxRate = taxRate; return this; }
        public InvoiceItemBuilder lineTotal(BigDecimal lineTotal) { this.lineTotal = lineTotal; return this; }

        public InvoiceItem build() {
            return new InvoiceItem(id, invoice, product, quantity, unitPrice, taxRate, lineTotal);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Invoice getInvoice() { return invoice; }
    public void setInvoice(Invoice invoice) { this.invoice = invoice; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
    public BigDecimal getTaxRate() { return taxRate; }
    public void setTaxRate(BigDecimal taxRate) { this.taxRate = taxRate; }
    public BigDecimal getLineTotal() { return lineTotal; }
    public void setLineTotal(BigDecimal lineTotal) { this.lineTotal = lineTotal; }
}
