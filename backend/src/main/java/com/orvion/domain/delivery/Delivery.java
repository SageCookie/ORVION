package com.orvion.domain.delivery;

import com.orvion.domain.order.Order;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "deliveries")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String deliveryNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(length = 100)
    private String assignedDriverName;

    @Column(nullable = false, length = 255)
    private String deliveryAddress;

    @Column(nullable = false, length = 30)
    private String status = "PLANNED";

    @Column(length = 50)
    private String trackingNumber;

    private LocalDate dispatchDate;
    private LocalDate deliveredDate;

    @Column(length = 500)
    private String notes;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Delivery() {}

    public Delivery(Long id, String deliveryNumber, Order order, String assignedDriverName, String deliveryAddress, String status, String trackingNumber, LocalDate dispatchDate, LocalDate deliveredDate, String notes, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.deliveryNumber = deliveryNumber;
        this.order = order;
        this.assignedDriverName = assignedDriverName;
        this.deliveryAddress = deliveryAddress;
        this.status = status != null ? status : "PLANNED";
        this.trackingNumber = trackingNumber;
        this.dispatchDate = dispatchDate;
        this.deliveredDate = deliveredDate;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static DeliveryBuilder builder() { return new DeliveryBuilder(); }

    public static class DeliveryBuilder {
        private Long id;
        private String deliveryNumber;
        private Order order;
        private String assignedDriverName;
        private String deliveryAddress;
        private String status = "PLANNED";
        private String trackingNumber;
        private LocalDate dispatchDate;
        private LocalDate deliveredDate;
        private String notes;
        private Instant createdAt;
        private Instant updatedAt;

        public DeliveryBuilder id(Long id) { this.id = id; return this; }
        public DeliveryBuilder deliveryNumber(String deliveryNumber) { this.deliveryNumber = deliveryNumber; return this; }
        public DeliveryBuilder order(Order order) { this.order = order; return this; }
        public DeliveryBuilder assignedDriverName(String assignedDriverName) { this.assignedDriverName = assignedDriverName; return this; }
        public DeliveryBuilder deliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; return this; }
        public DeliveryBuilder status(String status) { this.status = status; return this; }
        public DeliveryBuilder trackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; return this; }
        public DeliveryBuilder dispatchDate(LocalDate dispatchDate) { this.dispatchDate = dispatchDate; return this; }
        public DeliveryBuilder deliveredDate(LocalDate deliveredDate) { this.deliveredDate = deliveredDate; return this; }
        public DeliveryBuilder notes(String notes) { this.notes = notes; return this; }
        public DeliveryBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public DeliveryBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Delivery build() {
            return new Delivery(id, deliveryNumber, order, assignedDriverName, deliveryAddress, status, trackingNumber, dispatchDate, deliveredDate, notes, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDeliveryNumber() { return deliveryNumber; }
    public void setDeliveryNumber(String deliveryNumber) { this.deliveryNumber = deliveryNumber; }
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
    public String getAssignedDriverName() { return assignedDriverName; }
    public void setAssignedDriverName(String assignedDriverName) { this.assignedDriverName = assignedDriverName; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }
    public LocalDate getDispatchDate() { return dispatchDate; }
    public void setDispatchDate(LocalDate dispatchDate) { this.dispatchDate = dispatchDate; }
    public LocalDate getDeliveredDate() { return deliveredDate; }
    public void setDeliveredDate(LocalDate deliveredDate) { this.deliveredDate = deliveredDate; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
