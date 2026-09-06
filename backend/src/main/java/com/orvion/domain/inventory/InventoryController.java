package com.orvion.domain.inventory;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER','ROLE_SALES_MANAGER','ROLE_PRODUCTION_MANAGER','ROLE_ACCOUNTANT')")
    public ResponseEntity<ApiResponse<PagedResponse<Inventory>>> getInventory(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Inventory> result = inventoryService.getInventory(query, page, size);
        PagedResponse<Inventory> paged = PagedResponse.<Inventory>builder()
                .content(result.getContent())
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .last(result.isLast())
                .build();
        return ResponseEntity.ok(ApiResponse.success(paged));
    }

    @GetMapping("/low-stock")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<List<Inventory>>> getLowStock() {
        return ResponseEntity.ok(ApiResponse.success(inventoryService.getLowStockItems()));
    }

    @GetMapping("/transactions")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<PagedResponse<InventoryTransaction>>> getTransactions(
            @RequestParam(required = false) Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<InventoryTransaction> result = inventoryService.getTransactions(productId, page, size);
        PagedResponse<InventoryTransaction> paged = PagedResponse.<InventoryTransaction>builder()
                .content(result.getContent())
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .last(result.isLast())
                .build();
        return ResponseEntity.ok(ApiResponse.success(paged));
    }

    @PostMapping("/transactions")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<Inventory>> recordTransaction(
            @RequestBody StockAdjustmentRequest request,
            Principal principal) {
        String username = principal != null ? principal.getName() : "System";
        Inventory inv = inventoryService.recordTransaction(request, username);
        return ResponseEntity.ok(ApiResponse.success("Stock transaction recorded", inv));
    }
}
