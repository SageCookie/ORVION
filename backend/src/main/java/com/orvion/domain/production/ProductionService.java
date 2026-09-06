package com.orvion.domain.production;

import com.orvion.common.exception.ResourceNotFoundException;
import com.orvion.domain.order.Order;
import com.orvion.domain.order.OrderService;
import com.orvion.domain.product.Product;
import com.orvion.domain.product.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class ProductionService {
    private final ProductionOrderRepository productionOrderRepository;
    private final ProductRepository productRepository;
    private final OrderService orderService;

    public ProductionService(ProductionOrderRepository productionOrderRepository,
                             ProductRepository productRepository,
                             OrderService orderService) {
        this.productionOrderRepository = productionOrderRepository;
        this.productRepository = productRepository;
        this.orderService = orderService;
    }

    @Transactional(readOnly = true)
    public Page<ProductionOrder> getProductionOrders(String query, int page, int size) {
        return productionOrderRepository.searchProduction(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public ProductionOrder getById(Long id) {
        return productionOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Production order not found with id: " + id));
    }

    @Transactional
    public ProductionOrder createProductionOrder(ProductionCreateRequest req) {
        Product product = productRepository.findById(req.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Order order = null;
        if (req.getOrderId() != null) {
            order = orderService.getOrderById(req.getOrderId());
        }

        ProductionOrder prod = ProductionOrder.builder()
                .productionNumber("PO-" + System.currentTimeMillis() % 100000)
                .order(order)
                .product(product)
                .targetQuantity(req.getTargetQuantity())
                .status("PLANNED")
                .assignedEmployeeName(req.getAssignedEmployeeName() != null ? req.getAssignedEmployeeName() : "Unassigned")
                .startDate(req.getStartDate() != null ? req.getStartDate() : LocalDate.now())
                .expectedCompletionDate(req.getExpectedCompletionDate() != null ? req.getExpectedCompletionDate() : LocalDate.now().plusDays(7))
                .build();

        return productionOrderRepository.save(prod);
    }

    @Transactional
    public ProductionOrder updateStatus(Long id, String status) {
        ProductionOrder prod = getById(id);
        if ("COMPLETED".equalsIgnoreCase(status) && (prod.getProducedQuantity() < prod.getTargetQuantity())) {
            prod.setProducedQuantity(prod.getTargetQuantity());
            prod.setActualCompletionDate(LocalDate.now());
        }
        prod.setStatus(status.toUpperCase());
        return productionOrderRepository.save(prod);
    }
}
