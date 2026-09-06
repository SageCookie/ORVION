package com.orvion.domain.inventory;

public class StockAdjustmentRequest {
    private Long productId;
    private String type;
    private Integer quantity;
    private String locationRack;
    private String notes;

    public StockAdjustmentRequest() {}

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public String getLocationRack() { return locationRack; }
    public void setLocationRack(String locationRack) { this.locationRack = locationRack; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
