package com.orvion.domain.production;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionOrderRepository extends JpaRepository<ProductionOrder, Long> {
    @Query("SELECT p FROM ProductionOrder p WHERE " +
           "(:query IS NULL OR LOWER(p.productionNumber) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.product.name) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<ProductionOrder> searchProduction(@Param("query") String query, Pageable pageable);
}
