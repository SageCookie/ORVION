package com.orvion.domain.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE " +
           "(:query IS NULL OR LOWER(o.orderNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(o.customer.companyName) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Order> searchOrders(@Param("query") String query, Pageable pageable);
}
