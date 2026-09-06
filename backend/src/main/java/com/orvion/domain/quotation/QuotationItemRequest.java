package com.orvion.domain.quotation;

import java.math.BigDecimal;

public class QuotationItemRequest {
    private Long productId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal discount;

    public QuotationItemRequest() {}

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }
}
