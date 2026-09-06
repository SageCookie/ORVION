package com.orvion.domain.product;

import com.orvion.common.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Transactional(readOnly = true)
    public Page<Product> getProducts(String query, int page, int size) {
        return productRepository.searchProducts(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public List<Product> getAllActiveProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Transactional
    public Product createProduct(Product product) {
        if (product.getSku() == null || product.getSku().isBlank()) {
            product.setSku("SKU-" + System.currentTimeMillis() % 100000);
        }
        Category cat = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        product.setCategory(cat);
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(Long id, Product updated) {
        Product existing = getProductById(id);
        existing.setName(updated.getName());
        existing.setUnit(updated.getUnit());
        existing.setCostPrice(updated.getCostPrice());
        existing.setSellingPrice(updated.getSellingPrice());
        existing.setTaxRate(updated.getTaxRate());
        existing.setReorderLevel(updated.getReorderLevel());
        existing.setDescription(updated.getDescription());
        existing.setStatus(updated.getStatus());
        if (updated.getCategory() != null) {
            Category cat = categoryRepository.findById(updated.getCategory().getId()).orElseThrow();
            existing.setCategory(cat);
        }
        return productRepository.save(existing);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product existing = getProductById(id);
        existing.setStatus("INACTIVE");
        productRepository.save(existing);
    }
}
