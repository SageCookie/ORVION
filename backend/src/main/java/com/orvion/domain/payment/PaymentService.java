package com.orvion.domain.payment;

import com.orvion.common.exception.BadRequestException;
import com.orvion.common.exception.ResourceNotFoundException;
import com.orvion.domain.invoice.Invoice;
import com.orvion.domain.invoice.InvoiceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;

    public PaymentService(PaymentRepository paymentRepository, InvoiceRepository invoiceRepository) {
        this.paymentRepository = paymentRepository;
        this.invoiceRepository = invoiceRepository;
    }

    @Transactional(readOnly = true)
    public Page<Payment> getPayments(String query, int page, int size) {
        return paymentRepository.searchPayments(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional
    public Payment recordPayment(PaymentRecordRequest req, String recordedBy) {
        Invoice invoice = invoiceRepository.findById(req.getInvoiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + req.getInvoiceId()));

        if (req.getAmount() == null || req.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BadRequestException("Payment amount must be greater than 0");
        }

        if (req.getAmount().compareTo(invoice.getBalanceDue()) > 0) {
            throw new BadRequestException("Payment amount $" + req.getAmount() + " exceeds balance due $" + invoice.getBalanceDue());
        }

        BigDecimal newPaid = invoice.getPaidAmount().add(req.getAmount());
        BigDecimal newBalance = invoice.getGrandTotal().subtract(newPaid);
        if (newBalance.compareTo(BigDecimal.ZERO) < 0) newBalance = BigDecimal.ZERO;

        invoice.setPaidAmount(newPaid);
        invoice.setBalanceDue(newBalance);
        if (newBalance.compareTo(BigDecimal.ZERO) == 0) {
            invoice.setStatus("PAID");
        } else {
            invoice.setStatus("PARTIALLY_PAID");
        }
        invoiceRepository.save(invoice);

        Payment payment = Payment.builder()
                .paymentNumber("PAY-" + System.currentTimeMillis() % 100000)
                .invoice(invoice)
                .amount(req.getAmount())
                .paymentMethod(req.getPaymentMethod() != null ? req.getPaymentMethod() : "BANK_TRANSFER")
                .referenceNumber(req.getReferenceNumber() != null ? req.getReferenceNumber() : "REF-" + System.currentTimeMillis() % 100000)
                .paymentDate(LocalDate.now())
                .status("COMPLETED")
                .recordedBy(recordedBy)
                .notes(req.getNotes())
                .build();

        return paymentRepository.save(payment);
    }
}
