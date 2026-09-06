package com.orvion.domain.invoice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    @Query("SELECT i FROM Invoice i WHERE " +
           "(:query IS NULL OR LOWER(i.invoiceNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(i.customer.companyName) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Invoice> searchInvoices(@Param("query") String query, Pageable pageable);

    @Query("SELECT COALESCE(SUM(i.paidAmount), 0) FROM Invoice i")
    BigDecimal sumTotalPaidRevenue();

    @Query("SELECT COALESCE(SUM(i.balanceDue), 0) FROM Invoice i WHERE i.status != 'PAID'")
    BigDecimal sumTotalOutstandingReceivables();
}
