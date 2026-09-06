package com.orvion.domain.product;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/categories")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER','ROLE_SALES_MANAGER','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<List<Category>>> getCategories() {
        return ResponseEntity.ok(ApiResponse.success(productService.getAllCategories()));
    }

    @PostMapping("/categories")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<Category>> createCategory(@Valid @RequestBody Category category) {
        return ResponseEntity.ok(ApiResponse.success("Category created", productService.createCategory(category)));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER','ROLE_SALES_MANAGER','ROLE_PRODUCTION_MANAGER','ROLE_ACCOUNTANT','ROLE_EMPLOYEE')")
    public ResponseEntity<ApiResponse<PagedResponse<Product>>> getProducts(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Product> result = productService.getProducts(query, page, size);
        PagedResponse<Product> paged = PagedResponse.<Product>builder()
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
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER','ROLE_SALES_MANAGER','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<List<Product>>> getAllActive() {
        return ResponseEntity.ok(ApiResponse.success(productService.getAllActiveProducts()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER','ROLE_SALES_MANAGER')")
    public ResponseEntity<ApiResponse<Product>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getProductById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<Product>> create(@Valid @RequestBody Product product) {
        return ResponseEntity.ok(ApiResponse.success("Product created", productService.createProduct(product)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<Product>> update(@PathVariable Long id, @Valid @RequestBody Product product) {
        return ResponseEntity.ok(ApiResponse.success("Product updated", productService.updateProduct(id, product)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_INVENTORY_MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deactivated", null));
    }
}
