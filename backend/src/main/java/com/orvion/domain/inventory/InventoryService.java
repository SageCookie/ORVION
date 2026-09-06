package com.orvion.domain.inventory;

import com.orvion.common.exception.BadRequestException;
import com.orvion.common.exception.ResourceNotFoundException;
import com.orvion.domain.product.Product;
import com.orvion.domain.product.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final InventoryTransactionRepository transactionRepository;
    private final ProductRepository productRepository;

    public InventoryService(InventoryRepository inventoryRepository,
                            InventoryTransactionRepository transactionRepository,
                            ProductRepository productRepository) {
        this.inventoryRepository = inventoryRepository;
        this.transactionRepository = transactionRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public Page<Inventory> getInventory(String query, int page, int size) {
        return inventoryRepository.searchInventory(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public List<Inventory> getLowStockItems() {
        return inventoryRepository.findLowStock();
    }

    @Transactional(readOnly = true)
    public Page<InventoryTransaction> getTransactions(Long productId, int page, int size) {
        if (productId != null) {
            return transactionRepository.findByProductId(productId, PageRequest.of(page, size, Sort.by("id").descending()));
        }
        return transactionRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional
    public Inventory recordTransaction(StockAdjustmentRequest req, String performedBy) {
        Product product = productRepository.findById(req.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Inventory inv = inventoryRepository.findByProductId(product.getId())
                .orElseGet(() -> Inventory.builder()
                        .product(product)
                        .quantityOnHand(0)
                        .quantityReserved(0)
                        .locationRack(req.getLocationRack() != null ? req.getLocationRack() : "MAIN-RACK")
                        .build());

        int qty = req.getQuantity() != null ? req.getQuantity() : 0;

        if ("STOCK_IN".equalsIgnoreCase(req.getType())) {
            inv.setQuantityOnHand(inv.getQuantityOnHand() + qty);
        } else if ("STOCK_OUT".equalsIgnoreCase(req.getType())) {
            if (inv.getQuantityOnHand() < qty) {
                throw new BadRequestException("Insufficient stock on hand for product: " + product.getName() + ". Available: " + inv.getQuantityOnHand());
            }
            inv.setQuantityOnHand(inv.getQuantityOnHand() - qty);
        } else if ("ADJUSTMENT".equalsIgnoreCase(req.getType())) {
            inv.setQuantityOnHand(qty);
        }

        if (req.getLocationRack() != null && !req.getLocationRack().isBlank()) {
            inv.setLocationRack(req.getLocationRack());
        }

        Inventory saved = inventoryRepository.save(inv);

        InventoryTransaction tx = InventoryTransaction.builder()
                .product(product)
                .type(req.getType().toUpperCase())
                .quantity(qty)
                .referenceType("MANUAL_ADJUSTMENT")
                .referenceId("TX-" + System.currentTimeMillis() % 100000)
                .performedBy(performedBy)
                .build();
        transactionRepository.save(tx);

        return saved;
    }
}
