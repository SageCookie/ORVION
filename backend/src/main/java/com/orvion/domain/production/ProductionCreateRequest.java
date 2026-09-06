package com.orvion.domain.production;

import java.time.LocalDate;

public class ProductionCreateRequest {
    private Long orderId;
    private Long productId;
    private Integer targetQuantity;
    private String assignedEmployeeName;
    private LocalDate startDate;
    private LocalDate expectedCompletionDate;

    public ProductionCreateRequest() {}

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Integer getTargetQuantity() { return targetQuantity; }
    public void setTargetQuantity(Integer targetQuantity) { this.targetQuantity = targetQuantity; }
    public String getAssignedEmployeeName() { return assignedEmployeeName; }
    public void setAssignedEmployeeName(String assignedEmployeeName) { this.assignedEmployeeName = assignedEmployeeName; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getExpectedCompletionDate() { return expectedCompletionDate; }
    public void setExpectedCompletionDate(LocalDate expectedCompletionDate) { this.expectedCompletionDate = expectedCompletionDate; }
}
