package com.orvion.domain.customer;

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
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER','ROLE_INVENTORY_MANAGER','ROLE_PRODUCTION_MANAGER','ROLE_ACCOUNTANT','ROLE_DELIVERY_MANAGER','ROLE_EMPLOYEE')")
    public ResponseEntity<ApiResponse<PagedResponse<Customer>>> getCustomers(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Customer> result = customerService.getCustomers(query, page, size);
        PagedResponse<Customer> paged = PagedResponse.<Customer>builder()
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
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER','ROLE_ACCOUNTANT')")
    public ResponseEntity<ApiResponse<List<Customer>>> getAllActive() {
        return ResponseEntity.ok(ApiResponse.success(customerService.getAllActiveCustomers()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER','ROLE_ACCOUNTANT')")
    public ResponseEntity<ApiResponse<Customer>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(customerService.getCustomerById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER')")
    public ResponseEntity<ApiResponse<Customer>> create(@Valid @RequestBody Customer customer) {
        return ResponseEntity.ok(ApiResponse.success("Customer created", customerService.createCustomer(customer)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER')")
    public ResponseEntity<ApiResponse<Customer>> update(@PathVariable Long id, @Valid @RequestBody Customer customer) {
        return ResponseEntity.ok(ApiResponse.success("Customer updated", customerService.updateCustomer(id, customer)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok(ApiResponse.success("Customer deactivated", null));
    }
}
