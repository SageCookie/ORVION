package com.orvion.domain.inventory;

import com.orvion.domain.product.Product;
import jakarta.persistence.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false, unique = true)
    private Product product;

    @Column(nullable = false)
    private Integer quantityOnHand = 0;

    @Column(nullable = false)
    private Integer quantityReserved = 0;

    @Column(length = 100)
    private String locationRack;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Inventory() {}

    public Inventory(Long id, Product product, Integer quantityOnHand, Integer quantityReserved, String locationRack, Instant updatedAt) {
        this.id = id;
        this.product = product;
        this.quantityOnHand = quantityOnHand != null ? quantityOnHand : 0;
        this.quantityReserved = quantityReserved != null ? quantityReserved : 0;
        this.locationRack = locationRack;
        this.updatedAt = updatedAt;
    }

    public static InventoryBuilder builder() { return new InventoryBuilder(); }

    public static class InventoryBuilder {
        private Long id;
        private Product product;
        private Integer quantityOnHand = 0;
        private Integer quantityReserved = 0;
        private String locationRack;
        private Instant updatedAt;

        public InventoryBuilder id(Long id) { this.id = id; return this; }
        public InventoryBuilder product(Product product) { this.product = product; return this; }
        public InventoryBuilder quantityOnHand(Integer quantityOnHand) { this.quantityOnHand = quantityOnHand; return this; }
        public InventoryBuilder quantityReserved(Integer quantityReserved) { this.quantityReserved = quantityReserved; return this; }
        public InventoryBuilder locationRack(String locationRack) { this.locationRack = locationRack; return this; }
        public InventoryBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Inventory build() {
            return new Inventory(id, product, quantityOnHand, quantityReserved, locationRack, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public Integer getQuantityOnHand() { return quantityOnHand; }
    public void setQuantityOnHand(Integer quantityOnHand) { this.quantityOnHand = quantityOnHand; }
    public Integer getQuantityReserved() { return quantityReserved; }
    public void setQuantityReserved(Integer quantityReserved) { this.quantityReserved = quantityReserved; }
    public String getLocationRack() { return locationRack; }
    public void setLocationRack(String locationRack) { this.locationRack = locationRack; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
