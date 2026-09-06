package com.orvion.domain.customer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByCustomerCode(String customerCode);

    @Query("SELECT c FROM Customer c WHERE " +
           "(:query IS NULL OR LOWER(c.companyName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.contactName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.customerCode) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.email) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Customer> searchCustomers(@Param("query") String query, Pageable pageable);
}
