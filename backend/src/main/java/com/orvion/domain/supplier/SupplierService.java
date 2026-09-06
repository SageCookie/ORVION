package com.orvion.domain.supplier;

import com.orvion.common.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Transactional(readOnly = true)
    public Page<Supplier> getSuppliers(String query, int page, int size) {
        return supplierRepository.searchSuppliers(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public List<Supplier> getAllActive() {
        return supplierRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Supplier getById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));
    }

    @Transactional
    public Supplier create(Supplier supplier) {
        if (supplier.getSupplierCode() == null || supplier.getSupplierCode().isBlank()) {
            supplier.setSupplierCode("SUP-" + System.currentTimeMillis() % 100000);
        }
        return supplierRepository.save(supplier);
    }

    @Transactional
    public Supplier update(Long id, Supplier updated) {
        Supplier existing = getById(id);
        existing.setName(updated.getName());
        existing.setContactName(updated.getContactName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setTaxId(updated.getTaxId());
        existing.setAddress(updated.getAddress());
        existing.setStatus(updated.getStatus());
        return supplierRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        Supplier existing = getById(id);
        existing.setStatus("INACTIVE");
        supplierRepository.save(existing);
    }
}
