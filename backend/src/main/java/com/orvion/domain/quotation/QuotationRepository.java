package com.orvion.domain.quotation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, Long> {
    @Query("SELECT q FROM Quotation q WHERE " +
           "(:query IS NULL OR LOWER(q.quotationNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(q.customer.companyName) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Quotation> searchQuotations(@Param("query") String query, Pageable pageable);
}
