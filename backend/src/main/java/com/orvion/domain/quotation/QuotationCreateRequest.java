package com.orvion.domain.quotation;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class QuotationCreateRequest {
    private Long customerId;
    private LocalDate issueDate;
    private LocalDate validUntil;
    private BigDecimal discountAmount;
    private String notes;
    private List<QuotationItemRequest> items;

    public QuotationCreateRequest() {}

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }
    public LocalDate getValidUntil() { return validUntil; }
    public void setValidUntil(LocalDate validUntil) { this.validUntil = validUntil; }
    public BigDecimal getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public List<QuotationItemRequest> getItems() { return items; }
    public void setItems(List<QuotationItemRequest> items) { this.items = items; }
}
