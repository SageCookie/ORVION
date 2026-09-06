package com.orvion.domain.product;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String sku;

    @Column(nullable = false, length = 150)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 20)
    private String unit;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal costPrice;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal sellingPrice;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal taxRate = BigDecimal.valueOf(18.00);

    @Column(nullable = false)
    private Integer reorderLevel = 10;

    @Column(length = 500)
    private String description;

    @Column(nullable = false, length = 20)
    private String status = "ACTIVE";

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Product() {}

    public Product(Long id, String sku, String name, Category category, String unit, BigDecimal costPrice, BigDecimal sellingPrice, BigDecimal taxRate, Integer reorderLevel, String description, String status, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.category = category;
        this.unit = unit;
        this.costPrice = costPrice;
        this.sellingPrice = sellingPrice;
        this.taxRate = taxRate != null ? taxRate : BigDecimal.valueOf(18.00);
        this.reorderLevel = reorderLevel != null ? reorderLevel : 10;
        this.description = description;
        this.status = status != null ? status : "ACTIVE";
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ProductBuilder builder() { return new ProductBuilder(); }

    public static class ProductBuilder {
        private Long id;
        private String sku;
        private String name;
        private Category category;
        private String unit;
        private BigDecimal costPrice;
        private BigDecimal sellingPrice;
        private BigDecimal taxRate = BigDecimal.valueOf(18.00);
        private Integer reorderLevel = 10;
        private String description;
        private String status = "ACTIVE";
        private Instant createdAt;
        private Instant updatedAt;

        public ProductBuilder id(Long id) { this.id = id; return this; }
        public ProductBuilder sku(String sku) { this.sku = sku; return this; }
        public ProductBuilder name(String name) { this.name = name; return this; }
        public ProductBuilder category(Category category) { this.category = category; return this; }
        public ProductBuilder unit(String unit) { this.unit = unit; return this; }
        public ProductBuilder costPrice(BigDecimal costPrice) { this.costPrice = costPrice; return this; }
        public ProductBuilder sellingPrice(BigDecimal sellingPrice) { this.sellingPrice = sellingPrice; return this; }
        public ProductBuilder taxRate(BigDecimal taxRate) { this.taxRate = taxRate; return this; }
        public ProductBuilder reorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; return this; }
        public ProductBuilder description(String description) { this.description = description; return this; }
        public ProductBuilder status(String status) { this.status = status; return this; }
        public ProductBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public ProductBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Product build() {
            return new Product(id, sku, name, category, unit, costPrice, sellingPrice, taxRate, reorderLevel, description, status, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public BigDecimal getCostPrice() { return costPrice; }
    public void setCostPrice(BigDecimal costPrice) { this.costPrice = costPrice; }
    public BigDecimal getSellingPrice() { return sellingPrice; }
    public void setSellingPrice(BigDecimal sellingPrice) { this.sellingPrice = sellingPrice; }
    public BigDecimal getTaxRate() { return taxRate; }
    public void setTaxRate(BigDecimal taxRate) { this.taxRate = taxRate; }
    public Integer getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
