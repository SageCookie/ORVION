package com.orvion.domain.audit;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/audit-logs")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN')")
    public ResponseEntity<ApiResponse<PagedResponse<AuditLog>>> getLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<AuditLog> result = auditLogService.getLogs(page, size);
        PagedResponse<AuditLog> paged = PagedResponse.<AuditLog>builder()
                .content(result.getContent())
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .last(result.isLast())
                .build();
        return ResponseEntity.ok(ApiResponse.success(paged));
    }
}
