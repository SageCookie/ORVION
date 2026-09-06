package com.orvion.domain.inventory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByProductId(Long productId);

    @Query("SELECT i FROM Inventory i WHERE " +
           "(:query IS NULL OR LOWER(i.product.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(i.product.sku) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Inventory> searchInventory(@Param("query") String query, Pageable pageable);

    @Query("SELECT i FROM Inventory i WHERE i.quantityOnHand <= i.product.reorderLevel")
    List<Inventory> findLowStock();
}
