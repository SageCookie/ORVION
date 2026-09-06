package com.orvion.domain.supplier;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER','ROLE_SALES_MANAGER','ROLE_ACCOUNTANT')")
    public ResponseEntity<ApiResponse<PagedResponse<Supplier>>> getSuppliers(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Supplier> result = supplierService.getSuppliers(query, page, size);
        PagedResponse<Supplier> paged = PagedResponse.<Supplier>builder()
                .content(result.getContent())
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .last(result.isLast())
                .build();
        return ResponseEntity.ok(ApiResponse.success(paged));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<List<Supplier>>> getAllActive() {
        return ResponseEntity.ok(ApiResponse.success(supplierService.getAllActive()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<Supplier>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(supplierService.getById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<Supplier>> create(@Valid @RequestBody Supplier supplier) {
        return ResponseEntity.ok(ApiResponse.success("Supplier created", supplierService.create(supplier)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<Supplier>> update(@PathVariable Long id, @Valid @RequestBody Supplier supplier) {
        return ResponseEntity.ok(ApiResponse.success("Supplier updated", supplierService.update(id, supplier)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        supplierService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Supplier deactivated", null));
    }
}
