package com.orvion.domain.quality;

public class QualityCheckCreateRequest {
    private Long productionOrderId;
    private Integer inspectedQuantity;
    private Integer passedQuantity;
    private Integer rejectedQuantity;
    private String inspectorName;
    private String notes;

    public QualityCheckCreateRequest() {}

    public Long getProductionOrderId() { return productionOrderId; }
    public void setProductionOrderId(Long productionOrderId) { this.productionOrderId = productionOrderId; }
    public Integer getInspectedQuantity() { return inspectedQuantity; }
    public void setInspectedQuantity(Integer inspectedQuantity) { this.inspectedQuantity = inspectedQuantity; }
    public Integer getPassedQuantity() { return passedQuantity; }
    public void setPassedQuantity(Integer passedQuantity) { this.passedQuantity = passedQuantity; }
    public Integer getRejectedQuantity() { return rejectedQuantity; }
    public void setRejectedQuantity(Integer rejectedQuantity) { this.rejectedQuantity = rejectedQuantity; }
    public String getInspectorName() { return inspectorName; }
    public void setInspectorName(String inspectorName) { this.inspectorName = inspectorName; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
