package com.orvion.domain.order;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.orvion.domain.product.Product;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnoreProperties("items")
    private Order order;

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

    public OrderItem() {}

    public OrderItem(Long id, Order order, Product product, Integer quantity, BigDecimal unitPrice, BigDecimal taxRate, BigDecimal discount, BigDecimal lineTotal) {
        this.id = id;
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.taxRate = taxRate != null ? taxRate : BigDecimal.valueOf(18.00);
        this.discount = discount != null ? discount : BigDecimal.ZERO;
        this.lineTotal = lineTotal;
    }

    public static OrderItemBuilder builder() { return new OrderItemBuilder(); }

    public static class OrderItemBuilder {
        private Long id;
        private Order order;
        private Product product;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal taxRate = BigDecimal.valueOf(18.00);
        private BigDecimal discount = BigDecimal.ZERO;
        private BigDecimal lineTotal;

        public OrderItemBuilder id(Long id) { this.id = id; return this; }
        public OrderItemBuilder order(Order order) { this.order = order; return this; }
        public OrderItemBuilder product(Product product) { this.product = product; return this; }
        public OrderItemBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public OrderItemBuilder unitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; return this; }
        public OrderItemBuilder taxRate(BigDecimal taxRate) { this.taxRate = taxRate; return this; }
        public OrderItemBuilder discount(BigDecimal discount) { this.discount = discount; return this; }
        public OrderItemBuilder lineTotal(BigDecimal lineTotal) { this.lineTotal = lineTotal; return this; }

        public OrderItem build() {
            return new OrderItem(id, order, product, quantity, unitPrice, taxRate, discount, lineTotal);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
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
