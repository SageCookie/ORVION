package com.orvion.domain.supplier;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String supplierCode;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 100)
    private String contactName;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(length = 50)
    private String taxId;

    @Column(length = 255)
    private String address;

    @Column(nullable = false, length = 20)
    private String status = "ACTIVE";

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public Supplier() {}

    public Supplier(Long id, String supplierCode, String name, String contactName, String email, String phone, String taxId, String address, String status, Instant createdAt) {
        this.id = id;
        this.supplierCode = supplierCode;
        this.name = name;
        this.contactName = contactName;
        this.email = email;
        this.phone = phone;
        this.taxId = taxId;
        this.address = address;
        this.status = status != null ? status : "ACTIVE";
        this.createdAt = createdAt;
    }

    public static SupplierBuilder builder() { return new SupplierBuilder(); }

    public static class SupplierBuilder {
        private Long id;
        private String supplierCode;
        private String name;
        private String contactName;
        private String email;
        private String phone;
        private String taxId;
        private String address;
        private String status = "ACTIVE";
        private Instant createdAt;

        public SupplierBuilder id(Long id) { this.id = id; return this; }
        public SupplierBuilder supplierCode(String supplierCode) { this.supplierCode = supplierCode; return this; }
        public SupplierBuilder name(String name) { this.name = name; return this; }
        public SupplierBuilder contactName(String contactName) { this.contactName = contactName; return this; }
        public SupplierBuilder email(String email) { this.email = email; return this; }
        public SupplierBuilder phone(String phone) { this.phone = phone; return this; }
        public SupplierBuilder taxId(String taxId) { this.taxId = taxId; return this; }
        public SupplierBuilder address(String address) { this.address = address; return this; }
        public SupplierBuilder status(String status) { this.status = status; return this; }
        public SupplierBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Supplier build() {
            return new Supplier(id, supplierCode, name, contactName, email, phone, taxId, address, status, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSupplierCode() { return supplierCode; }
    public void setSupplierCode(String supplierCode) { this.supplierCode = supplierCode; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getTaxId() { return taxId; }
    public void setTaxId(String taxId) { this.taxId = taxId; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
