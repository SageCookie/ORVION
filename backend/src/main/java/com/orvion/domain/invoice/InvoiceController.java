package com.orvion.domain.invoice;

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
@RequestMapping("/api/v1/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_ACCOUNTANT','ROLE_SALES_MANAGER')")
    public ResponseEntity<ApiResponse<PagedResponse<Invoice>>> getInvoices(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Invoice> result = invoiceService.getInvoices(query, page, size);
        PagedResponse<Invoice> paged = PagedResponse.<Invoice>builder()
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
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_ACCOUNTANT')")
    public ResponseEntity<ApiResponse<Invoice>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(invoiceService.getById(id)));
    }

    @PostMapping("/from-order/{orderId}")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_ACCOUNTANT','ROLE_SALES_MANAGER')")
    public ResponseEntity<ApiResponse<Invoice>> generateFromOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(ApiResponse.success("Invoice generated", invoiceService.generateInvoiceFromOrder(orderId)));
    }

    @GetMapping("/{id}/pdf")
    @PreAuthorize("hasAnyAuthority('ROLE_SUPER_ADMIN','ROLE_BUSINESS_ADMIN','ROLE_ACCOUNTANT','ROLE_SALES_MANAGER')")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
        Invoice invoice = invoiceService.getById(id);
        byte[] pdfBytes = PdfGeneratorUtil.generateInvoicePdf(invoice);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + invoice.getInvoiceNumber() + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
