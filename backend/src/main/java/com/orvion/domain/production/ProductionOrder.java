package com.orvion.domain.production;

import com.orvion.domain.order.Order;
import com.orvion.domain.product.Product;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "production_orders")
public class ProductionOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String productionNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer targetQuantity;

    @Column(nullable = false)
    private Integer producedQuantity = 0;

    @Column(nullable = false)
    private Integer rejectedQuantity = 0;

    @Column(nullable = false, length = 30)
    private String status = "PLANNED";

    @Column(length = 100)
    private String assignedEmployeeName;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate expectedCompletionDate;

    private LocalDate actualCompletionDate;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public ProductionOrder() {}

    public ProductionOrder(Long id, String productionNumber, Order order, Product product, Integer targetQuantity, Integer producedQuantity, Integer rejectedQuantity, String status, String assignedEmployeeName, LocalDate startDate, LocalDate expectedCompletionDate, LocalDate actualCompletionDate, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.productionNumber = productionNumber;
        this.order = order;
        this.product = product;
        this.targetQuantity = targetQuantity;
        this.producedQuantity = producedQuantity != null ? producedQuantity : 0;
        this.rejectedQuantity = rejectedQuantity != null ? rejectedQuantity : 0;
        this.status = status != null ? status : "PLANNED";
        this.assignedEmployeeName = assignedEmployeeName;
        this.startDate = startDate;
        this.expectedCompletionDate = expectedCompletionDate;
        this.actualCompletionDate = actualCompletionDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ProductionOrderBuilder builder() { return new ProductionOrderBuilder(); }

    public static class ProductionOrderBuilder {
        private Long id;
        private String productionNumber;
        private Order order;
        private Product product;
        private Integer targetQuantity;
        private Integer producedQuantity = 0;
        private Integer rejectedQuantity = 0;
        private String status = "PLANNED";
        private String assignedEmployeeName;
        private LocalDate startDate;
        private LocalDate expectedCompletionDate;
        private LocalDate actualCompletionDate;
        private Instant createdAt;
        private Instant updatedAt;

        public ProductionOrderBuilder id(Long id) { this.id = id; return this; }
        public ProductionOrderBuilder productionNumber(String productionNumber) { this.productionNumber = productionNumber; return this; }
        public ProductionOrderBuilder order(Order order) { this.order = order; return this; }
        public ProductionOrderBuilder product(Product product) { this.product = product; return this; }
        public ProductionOrderBuilder targetQuantity(Integer targetQuantity) { this.targetQuantity = targetQuantity; return this; }
        public ProductionOrderBuilder producedQuantity(Integer producedQuantity) { this.producedQuantity = producedQuantity; return this; }
        public ProductionOrderBuilder rejectedQuantity(Integer rejectedQuantity) { this.rejectedQuantity = rejectedQuantity; return this; }
        public ProductionOrderBuilder status(String status) { this.status = status; return this; }
        public ProductionOrderBuilder assignedEmployeeName(String assignedEmployeeName) { this.assignedEmployeeName = assignedEmployeeName; return this; }
        public ProductionOrderBuilder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public ProductionOrderBuilder expectedCompletionDate(LocalDate expectedCompletionDate) { this.expectedCompletionDate = expectedCompletionDate; return this; }
        public ProductionOrderBuilder actualCompletionDate(LocalDate actualCompletionDate) { this.actualCompletionDate = actualCompletionDate; return this; }
        public ProductionOrderBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public ProductionOrderBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public ProductionOrder build() {
            return new ProductionOrder(id, productionNumber, order, product, targetQuantity, producedQuantity, rejectedQuantity, status, assignedEmployeeName, startDate, expectedCompletionDate, actualCompletionDate, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProductionNumber() { return productionNumber; }
    public void setProductionNumber(String productionNumber) { this.productionNumber = productionNumber; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public Integer getTargetQuantity() { return targetQuantity; }
    public void setTargetQuantity(Integer targetQuantity) { this.targetQuantity = targetQuantity; }
    public Integer getProducedQuantity() { return producedQuantity; }
    public void setProducedQuantity(Integer producedQuantity) { this.producedQuantity = producedQuantity; }
    public Integer getRejectedQuantity() { return rejectedQuantity; }
    public void setRejectedQuantity(Integer rejectedQuantity) { this.rejectedQuantity = rejectedQuantity; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAssignedEmployeeName() { return assignedEmployeeName; }
    public void setAssignedEmployeeName(String assignedEmployeeName) { this.assignedEmployeeName = assignedEmployeeName; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getExpectedCompletionDate() { return expectedCompletionDate; }
    public void setExpectedCompletionDate(LocalDate expectedCompletionDate) { this.expectedCompletionDate = expectedCompletionDate; }
    public LocalDate getActualCompletionDate() { return actualCompletionDate; }
    public void setActualCompletionDate(LocalDate actualCompletionDate) { this.actualCompletionDate = actualCompletionDate; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
