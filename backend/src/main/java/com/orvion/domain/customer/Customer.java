package com.orvion.domain.customer;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String customerCode;

    @Column(nullable = false, length = 150)
    private String companyName;

    @Column(nullable = false, length = 100)
    private String contactName;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(length = 50)
    private String taxId;

    @Column(nullable = false, length = 255)
    private String addressLine1;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(length = 20)
    private String postalCode;

    @Column(nullable = false, length = 20)
    private String status = "ACTIVE";

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Customer() {}

    public Customer(Long id, String customerCode, String companyName, String contactName, String email, String phone, String taxId, String addressLine1, String city, String state, String postalCode, String status, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.customerCode = customerCode;
        this.companyName = companyName;
        this.contactName = contactName;
        this.email = email;
        this.phone = phone;
        this.taxId = taxId;
        this.addressLine1 = addressLine1;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.status = status != null ? status : "ACTIVE";
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static CustomerBuilder builder() { return new CustomerBuilder(); }

    public static class CustomerBuilder {
        private Long id;
        private String customerCode;
        private String companyName;
        private String contactName;
        private String email;
        private String phone;
        private String taxId;
        private String addressLine1;
        private String city;
        private String state;
        private String postalCode;
        private String status = "ACTIVE";
        private Instant createdAt;
        private Instant updatedAt;

        public CustomerBuilder id(Long id) { this.id = id; return this; }
        public CustomerBuilder customerCode(String customerCode) { this.customerCode = customerCode; return this; }
        public CustomerBuilder companyName(String companyName) { this.companyName = companyName; return this; }
        public CustomerBuilder contactName(String contactName) { this.contactName = contactName; return this; }
        public CustomerBuilder email(String email) { this.email = email; return this; }
        public CustomerBuilder phone(String phone) { this.phone = phone; return this; }
        public CustomerBuilder taxId(String taxId) { this.taxId = taxId; return this; }
        public CustomerBuilder addressLine1(String addressLine1) { this.addressLine1 = addressLine1; return this; }
        public CustomerBuilder city(String city) { this.city = city; return this; }
        public CustomerBuilder state(String state) { this.state = state; return this; }
        public CustomerBuilder postalCode(String postalCode) { this.postalCode = postalCode; return this; }
        public CustomerBuilder status(String status) { this.status = status; return this; }
        public CustomerBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public CustomerBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Customer build() {
            return new Customer(id, customerCode, companyName, contactName, email, phone, taxId, addressLine1, city, state, postalCode, status, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCustomerCode() { return customerCode; }
    public void setCustomerCode(String customerCode) { this.customerCode = customerCode; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getTaxId() { return taxId; }
    public void setTaxId(String taxId) { this.taxId = taxId; }
    public String getAddressLine1() { return addressLine1; }
    public void setAddressLine1(String addressLine1) { this.addressLine1 = addressLine1; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
