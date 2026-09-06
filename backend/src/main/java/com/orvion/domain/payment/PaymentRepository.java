package com.orvion.domain.payment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT p FROM Payment p WHERE " +
           "(:query IS NULL OR LOWER(p.paymentNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.invoice.invoiceNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.invoice.customer.companyName) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Payment> searchPayments(@Param("query") String query, Pageable pageable);
}
