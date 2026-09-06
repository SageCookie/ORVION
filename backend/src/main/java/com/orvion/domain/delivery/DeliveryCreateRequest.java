package com.orvion.domain.delivery;

public class DeliveryCreateRequest {
    private Long orderId;
    private String assignedDriverName;
    private String deliveryAddress;
    private String notes;

    public DeliveryCreateRequest() {}

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public String getAssignedDriverName() { return assignedDriverName; }
    public void setAssignedDriverName(String assignedDriverName) { this.assignedDriverName = assignedDriverName; }
    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
