package com.orvion.domain.quality;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quality-checks")
public class QualityCheckController {

    private final QualityCheckService qualityCheckService;

    public QualityCheckController(QualityCheckService qualityCheckService) {
        this.qualityCheckService = qualityCheckService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<PagedResponse<QualityCheck>>> getQualityChecks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<QualityCheck> result = qualityCheckService.getQualityChecks(page, size);
        PagedResponse<QualityCheck> paged = PagedResponse.<QualityCheck>builder()
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
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_PRODUCTION_MANAGER')")
    public ResponseEntity<ApiResponse<QualityCheck>> create(@RequestBody QualityCheckCreateRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Quality check logged", qualityCheckService.createQualityCheck(req)));
    }
}
