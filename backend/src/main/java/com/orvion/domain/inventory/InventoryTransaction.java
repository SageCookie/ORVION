package com.orvion.domain.inventory;

import com.orvion.domain.product.Product;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "inventory_transactions")
public class InventoryTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, length = 30)
    private String type;

    @Column(nullable = false)
    private Integer quantity;

    @Column(length = 50)
    private String referenceType;

    @Column(length = 50)
    private String referenceId;

    @Column(length = 100)
    private String performedBy;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public InventoryTransaction() {}

    public InventoryTransaction(Long id, Product product, String type, Integer quantity, String referenceType, String referenceId, String performedBy, Instant createdAt) {
        this.id = id;
        this.product = product;
        this.type = type;
        this.quantity = quantity;
        this.referenceType = referenceType;
        this.referenceId = referenceId;
        this.performedBy = performedBy;
        this.createdAt = createdAt;
    }

    public static InventoryTransactionBuilder builder() { return new InventoryTransactionBuilder(); }

    public static class InventoryTransactionBuilder {
        private Long id;
        private Product product;
        private String type;
        private Integer quantity;
        private String referenceType;
        private String referenceId;
        private String performedBy;
        private Instant createdAt;

        public InventoryTransactionBuilder id(Long id) { this.id = id; return this; }
        public InventoryTransactionBuilder product(Product product) { this.product = product; return this; }
        public InventoryTransactionBuilder type(String type) { this.type = type; return this; }
        public InventoryTransactionBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public InventoryTransactionBuilder referenceType(String referenceType) { this.referenceType = referenceType; return this; }
        public InventoryTransactionBuilder referenceId(String referenceId) { this.referenceId = referenceId; return this; }
        public InventoryTransactionBuilder performedBy(String performedBy) { this.performedBy = performedBy; return this; }
        public InventoryTransactionBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public InventoryTransaction build() {
            return new InventoryTransaction(id, product, type, quantity, referenceType, referenceId, performedBy, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public String getReferenceType() { return referenceType; }
    public void setReferenceType(String referenceType) { this.referenceType = referenceType; }
    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
