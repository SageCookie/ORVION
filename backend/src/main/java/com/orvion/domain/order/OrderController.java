package com.orvion.domain.order;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER','ROLE_INVENTORY_MANAGER','ROLE_PRODUCTION_MANAGER','ROLE_ACCOUNTANT','ROLE_DELIVERY_MANAGER','ROLE_EMPLOYEE')")
    public ResponseEntity<ApiResponse<PagedResponse<Order>>> getOrders(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Order> result = orderService.getOrders(query, page, size);
        PagedResponse<Order> paged = PagedResponse.<Order>builder()
                .content(result.getContent())
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .last(result.isLast())
                .build();
        return ResponseEntity.ok(ApiResponse.success(paged));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER','ROLE_ACCOUNTANT','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<Order>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getOrderById(id)));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<Order>> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success("Order status updated", orderService.updateStatus(id, status)));
    }
}
