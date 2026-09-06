package com.orvion.domain.production;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/production")
public class ProductionController {

    private final ProductionService productionService;

    public ProductionController(ProductionService productionService) {
        this.productionService = productionService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_PRODUCTION_MANAGER','ROLE_INVENTORY_MANAGER','ROLE_EMPLOYEE')")
    public ResponseEntity<ApiResponse<PagedResponse<ProductionOrder>>> getOrders(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ProductionOrder> result = productionService.getProductionOrders(query, page, size);
        PagedResponse<ProductionOrder> paged = PagedResponse.<ProductionOrder>builder()
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
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<ProductionOrder>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(productionService.getById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<ProductionOrder>> create(@RequestBody ProductionCreateRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Production order created", productionService.createProductionOrder(req)));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<ProductionOrder>> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success("Production status updated", productionService.updateStatus(id, status)));
    }
}
