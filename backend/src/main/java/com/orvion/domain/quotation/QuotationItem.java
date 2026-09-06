package com.orvion.domain.quotation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.orvion.domain.product.Product;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "quotation_items")
public class QuotationItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quotation_id", nullable = false)
    @JsonIgnoreProperties("items")
    private Quotation quotation;

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
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal lineTotal;

    public QuotationItem() {}

    public QuotationItem(Long id, Quotation quotation, Product product, Integer quantity, BigDecimal unitPrice, BigDecimal taxRate, BigDecimal discount, BigDecimal lineTotal) {
        this.id = id;
        this.quotation = quotation;
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.taxRate = taxRate != null ? taxRate : BigDecimal.valueOf(18.00);
        this.discount = discount != null ? discount : BigDecimal.ZERO;
        this.lineTotal = lineTotal;
    }

    public static QuotationItemBuilder builder() { return new QuotationItemBuilder(); }

    public static class QuotationItemBuilder {
        private Long id;
        private Quotation quotation;
        private Product product;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal taxRate = BigDecimal.valueOf(18.00);
        private BigDecimal discount = BigDecimal.ZERO;
        private BigDecimal lineTotal;

        public QuotationItemBuilder id(Long id) { this.id = id; return this; }
        public QuotationItemBuilder quotation(Quotation quotation) { this.quotation = quotation; return this; }
        public QuotationItemBuilder product(Product product) { this.product = product; return this; }
        public QuotationItemBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public QuotationItemBuilder unitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; return this; }
        public QuotationItemBuilder taxRate(BigDecimal taxRate) { this.taxRate = taxRate; return this; }
        public QuotationItemBuilder discount(BigDecimal discount) { this.discount = discount; return this; }
        public QuotationItemBuilder lineTotal(BigDecimal lineTotal) { this.lineTotal = lineTotal; return this; }

        public QuotationItem build() {
            return new QuotationItem(id, quotation, product, quantity, unitPrice, taxRate, discount, lineTotal);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Quotation getQuotation() { return quotation; }
    public void setQuotation(Quotation quotation) { this.quotation = quotation; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
    public BigDecimal getTaxRate() { return taxRate; }
    public void setTaxRate(BigDecimal taxRate) { this.taxRate = taxRate; }
    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }
    public BigDecimal getLineTotal() { return lineTotal; }
    public void setLineTotal(BigDecimal lineTotal) { this.lineTotal = lineTotal; }
}
