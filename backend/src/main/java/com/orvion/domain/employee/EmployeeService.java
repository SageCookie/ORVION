package com.orvion.domain.employee;

import com.orvion.common.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional(readOnly = true)
    public Page<Employee> getEmployees(String query, int page, int size) {
        return employeeRepository.searchEmployees(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    @Transactional
    public Employee createEmployee(Employee employee) {
        if (employee.getEmployeeCode() == null || employee.getEmployeeCode().isBlank()) {
            employee.setEmployeeCode("EMP-" + System.currentTimeMillis() % 100000);
        }
        return employeeRepository.save(employee);
    }

    @Transactional
    public Employee updateEmployee(Long id, Employee updated) {
        Employee existing = getEmployeeById(id);
        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setDepartment(updated.getDepartment());
        existing.setDesignation(updated.getDesignation());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setStatus(updated.getStatus());
        return employeeRepository.save(existing);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        Employee existing = getEmployeeById(id);
        existing.setStatus("INACTIVE");
        employeeRepository.save(existing);
    }
}
