package com.orvion.domain.quotation;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import com.orvion.common.util.PdfGeneratorUtil;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quotations")
public class QuotationController {

    private final QuotationService quotationService;

    public QuotationController(QuotationService quotationService) {
        this.quotationService = quotationService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER','ROLE_ACCOUNTANT')")
    public ResponseEntity<ApiResponse<PagedResponse<Quotation>>> getQuotations(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Quotation> result = quotationService.getQuotations(query, page, size);
        PagedResponse<Quotation> paged = PagedResponse.<Quotation>builder()
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
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER','ROLE_ACCOUNTANT')")
    public ResponseEntity<ApiResponse<Quotation>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(quotationService.getById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER')")
    public ResponseEntity<ApiResponse<Quotation>> create(@RequestBody QuotationCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Quotation created", quotationService.createQuotation(request)));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER')")
    public ResponseEntity<ApiResponse<Quotation>> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success("Quotation status updated", quotationService.updateStatus(id, status)));
    }

    @PostMapping("/{id}/convert")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER')")
    public ResponseEntity<ApiResponse<Object>> convertToOrder(@PathVariable Long id) {
        Object order = quotationService.convertToOrder(id);
        return ResponseEntity.ok(ApiResponse.success("Quotation successfully converted into Order", order));
    }

    @GetMapping("/{id}/pdf")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_SALES_MANAGER','ROLE_ACCOUNTANT')")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
        Quotation quote = quotationService.getById(id);
        byte[] pdfBytes = PdfGeneratorUtil.generateQuotationPdf(quote);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + quote.getQuotationNumber() + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
