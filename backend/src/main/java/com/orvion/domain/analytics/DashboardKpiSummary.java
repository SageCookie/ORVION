package com.orvion.domain.analytics;

import java.math.BigDecimal;
import java.util.List;

public class DashboardKpiSummary {
    private BigDecimal totalRevenue;
    private BigDecimal outstandingReceivables;
    private Long totalOrdersCount;
    private Long pendingOrdersCount;
    private Long activeProductionCount;
    private Long lowStockAlertsCount;
    private Long totalCustomersCount;
    private List<SalesTrendMetric> salesTrend;

    public DashboardKpiSummary() {}

    public DashboardKpiSummary(BigDecimal totalRevenue, BigDecimal outstandingReceivables, Long totalOrdersCount, Long pendingOrdersCount, Long activeProductionCount, Long lowStockAlertsCount, Long totalCustomersCount, List<SalesTrendMetric> salesTrend) {
        this.totalRevenue = totalRevenue;
        this.outstandingReceivables = outstandingReceivables;
        this.totalOrdersCount = totalOrdersCount;
        this.pendingOrdersCount = pendingOrdersCount;
        this.activeProductionCount = activeProductionCount;
        this.lowStockAlertsCount = lowStockAlertsCount;
        this.totalCustomersCount = totalCustomersCount;
        this.salesTrend = salesTrend;
    }

    public static DashboardKpiSummaryBuilder builder() { return new DashboardKpiSummaryBuilder(); }

    public static class DashboardKpiSummaryBuilder {
        private BigDecimal totalRevenue;
        private BigDecimal outstandingReceivables;
        private Long totalOrdersCount;
        private Long pendingOrdersCount;
        private Long activeProductionCount;
        private Long lowStockAlertsCount;
        private Long totalCustomersCount;
        private List<SalesTrendMetric> salesTrend;

        public DashboardKpiSummaryBuilder totalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; return this; }
        public DashboardKpiSummaryBuilder outstandingReceivables(BigDecimal outstandingReceivables) { this.outstandingReceivables = outstandingReceivables; return this; }
        public DashboardKpiSummaryBuilder totalOrdersCount(Long totalOrdersCount) { this.totalOrdersCount = totalOrdersCount; return this; }
        public DashboardKpiSummaryBuilder pendingOrdersCount(Long pendingOrdersCount) { this.pendingOrdersCount = pendingOrdersCount; return this; }
        public DashboardKpiSummaryBuilder activeProductionCount(Long activeProductionCount) { this.activeProductionCount = activeProductionCount; return this; }
        public DashboardKpiSummaryBuilder lowStockAlertsCount(Long lowStockAlertsCount) { this.lowStockAlertsCount = lowStockAlertsCount; return this; }
        public DashboardKpiSummaryBuilder totalCustomersCount(Long totalCustomersCount) { this.totalCustomersCount = totalCustomersCount; return this; }
        public DashboardKpiSummaryBuilder salesTrend(List<SalesTrendMetric> salesTrend) { this.salesTrend = salesTrend; return this; }

        public DashboardKpiSummary build() {
            return new DashboardKpiSummary(totalRevenue, outstandingReceivables, totalOrdersCount, pendingOrdersCount, activeProductionCount, lowStockAlertsCount, totalCustomersCount, salesTrend);
        }
    }

    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }
    public BigDecimal getOutstandingReceivables() { return outstandingReceivables; }
    public void setOutstandingReceivables(BigDecimal outstandingReceivables) { this.outstandingReceivables = outstandingReceivables; }
    public Long getTotalOrdersCount() { return totalOrdersCount; }
    public void setTotalOrdersCount(Long totalOrdersCount) { this.totalOrdersCount = totalOrdersCount; }
    public Long getPendingOrdersCount() { return pendingOrdersCount; }
    public void setPendingOrdersCount(Long pendingOrdersCount) { this.pendingOrdersCount = pendingOrdersCount; }
    public Long getActiveProductionCount() { return activeProductionCount; }
    public void setActiveProductionCount(Long activeProductionCount) { this.activeProductionCount = activeProductionCount; }
    public Long getLowStockAlertsCount() { return lowStockAlertsCount; }
    public void setLowStockAlertsCount(Long lowStockAlertsCount) { this.lowStockAlertsCount = lowStockAlertsCount; }
    public Long getTotalCustomersCount() { return totalCustomersCount; }
    public void setTotalCustomersCount(Long totalCustomersCount) { this.totalCustomersCount = totalCustomersCount; }
    public List<SalesTrendMetric> getSalesTrend() { return salesTrend; }
    public void setSalesTrend(List<SalesTrendMetric> salesTrend) { this.salesTrend = salesTrend; }
}
