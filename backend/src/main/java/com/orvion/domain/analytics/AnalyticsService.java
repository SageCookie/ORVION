package com.orvion.domain.analytics;

import com.orvion.domain.customer.CustomerRepository;
import com.orvion.domain.inventory.InventoryRepository;
import com.orvion.domain.invoice.InvoiceRepository;
import com.orvion.domain.order.OrderRepository;
import com.orvion.domain.production.ProductionOrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnalyticsService {
    private final InvoiceRepository invoiceRepository;
    private final OrderRepository orderRepository;
    private final ProductionOrderRepository productionOrderRepository;
    private final InventoryRepository inventoryRepository;
    private final CustomerRepository customerRepository;

    public AnalyticsService(InvoiceRepository invoiceRepository,
                            OrderRepository orderRepository,
                            ProductionOrderRepository productionOrderRepository,
                            InventoryRepository inventoryRepository,
                            CustomerRepository customerRepository) {
        this.invoiceRepository = invoiceRepository;
        this.orderRepository = orderRepository;
        this.productionOrderRepository = productionOrderRepository;
        this.inventoryRepository = inventoryRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional(readOnly = true)
    public DashboardKpiSummary getDashboardSummary() {
        BigDecimal totalRevenue = invoiceRepository.sumTotalPaidRevenue();
        BigDecimal receivables = invoiceRepository.sumTotalOutstandingReceivables();
        long totalOrders = orderRepository.count();
        long activeProduction = productionOrderRepository.count();
        long lowStockCount = inventoryRepository.findLowStock().size();
        long customersCount = customerRepository.count();

        List<SalesTrendMetric> trend = new ArrayList<>();
        trend.add(new SalesTrendMetric("Jan", BigDecimal.valueOf(12000), 14L));
        trend.add(new SalesTrendMetric("Feb", BigDecimal.valueOf(18500), 22L));
        trend.add(new SalesTrendMetric("Mar", BigDecimal.valueOf(24000), 31L));
        trend.add(new SalesTrendMetric("Apr", BigDecimal.valueOf(19800), 26L));
        trend.add(new SalesTrendMetric("May", BigDecimal.valueOf(32500), 40L));

        return DashboardKpiSummary.builder()
                .totalRevenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO)
                .outstandingReceivables(receivables != null ? receivables : BigDecimal.ZERO)
                .totalOrdersCount(totalOrders)
                .pendingOrdersCount(5L)
                .activeProductionCount(activeProduction)
                .lowStockAlertsCount(lowStockCount)
                .totalCustomersCount(customersCount)
                .salesTrend(trend)
                .build();
    }
}
