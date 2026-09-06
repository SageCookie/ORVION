package com.orvion.domain.analytics;

import java.math.BigDecimal;

public class SalesTrendMetric {
    private String label;
    private BigDecimal revenue;
    private Long ordersCount;

    public SalesTrendMetric() {}

    public SalesTrendMetric(String label, BigDecimal revenue, Long ordersCount) {
        this.label = label;
        this.revenue = revenue;
        this.ordersCount = ordersCount;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public BigDecimal getRevenue() { return revenue; }
    public void setRevenue(BigDecimal revenue) { this.revenue = revenue; }
    public Long getOrdersCount() { return ordersCount; }
    public void setOrdersCount(Long ordersCount) { this.ordersCount = ordersCount; }
}
