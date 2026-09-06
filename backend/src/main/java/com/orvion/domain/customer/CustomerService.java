package com.orvion.domain.customer;

import com.orvion.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Transactional(readOnly = true)
    public Page<Customer> getCustomers(String query, int page, int size) {
        return customerRepository.searchCustomers(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public List<Customer> getAllActiveCustomers() {
        return customerRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
    }

    @Transactional
    public Customer createCustomer(Customer customer) {
        if (customer.getCustomerCode() == null || customer.getCustomerCode().isBlank()) {
            customer.setCustomerCode("CUST-" + System.currentTimeMillis() % 100000);
        }
        return customerRepository.save(customer);
    }

    @Transactional
    public Customer updateCustomer(Long id, Customer updated) {
        Customer existing = getCustomerById(id);
        existing.setCompanyName(updated.getCompanyName());
        existing.setContactName(updated.getContactName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setTaxId(updated.getTaxId());
        existing.setAddressLine1(updated.getAddressLine1());
        existing.setCity(updated.getCity());
        existing.setState(updated.getState());
        existing.setPostalCode(updated.getPostalCode());
        existing.setStatus(updated.getStatus());
        return customerRepository.save(existing);
    }

    @Transactional
    public void deleteCustomer(Long id) {
        Customer existing = getCustomerById(id);
        existing.setStatus("INACTIVE");
        customerRepository.save(existing);
    }
}
