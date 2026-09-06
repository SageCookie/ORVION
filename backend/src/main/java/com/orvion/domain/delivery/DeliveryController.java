package com.orvion.domain.delivery;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_DELIVERY_MANAGER','ROLE_SALES_MANAGER','ROLE_EMPLOYEE')")
    public ResponseEntity<ApiResponse<PagedResponse<Delivery>>> getDeliveries(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Delivery> result = deliveryService.getDeliveries(query, page, size);
        PagedResponse<Delivery> paged = PagedResponse.<Delivery>builder()
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
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_DELIVERY_MANAGER')")
    public ResponseEntity<ApiResponse<Delivery>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(deliveryService.getById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_DELIVERY_MANAGER')")
    public ResponseEntity<ApiResponse<Delivery>> create(@RequestBody DeliveryCreateRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Delivery created", deliveryService.createDelivery(req)));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_DELIVERY_MANAGER')")
    public ResponseEntity<ApiResponse<Delivery>> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success("Delivery status updated", deliveryService.updateStatus(id, status)));
    }
}
