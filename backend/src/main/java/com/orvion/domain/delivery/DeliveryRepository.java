package com.orvion.domain.delivery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    @Query("SELECT d FROM Delivery d WHERE " +
           "(:query IS NULL OR LOWER(d.deliveryNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.order.orderNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.order.customer.companyName) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Delivery> searchDeliveries(@Param("query") String query, Pageable pageable);
}
