package com.orvion.domain.payment;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_ACCOUNTANT')")
    public ResponseEntity<ApiResponse<PagedResponse<Payment>>> getPayments(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Payment> result = paymentService.getPayments(query, page, size);
        PagedResponse<Payment> paged = PagedResponse.<Payment>builder()
                .content(result.getContent())
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .last(result.isLast())
                .build();
        return ResponseEntity.ok(ApiResponse.success(paged));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_ACCOUNTANT')")
    public ResponseEntity<ApiResponse<Payment>> recordPayment(
            @RequestBody PaymentRecordRequest request,
            Principal principal) {
        String username = principal != null ? principal.getName() : "System";
        return ResponseEntity.ok(ApiResponse.success("Payment recorded", paymentService.recordPayment(request, username)));
    }
}
