package com.orvion.domain.employee;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String employeeCode;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, length = 50)
    private String department;

    @Column(nullable = false, length = 50)
    private String designation;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, length = 20)
    private String status = "ACTIVE";

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public Employee() {}

    public Employee(Long id, String employeeCode, String firstName, String lastName, String department, String designation, String email, String phone, String status, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.employeeCode = employeeCode;
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
        this.designation = designation;
        this.email = email;
        this.phone = phone;
        this.status = status != null ? status : "ACTIVE";
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static EmployeeBuilder builder() { return new EmployeeBuilder(); }

    public static class EmployeeBuilder {
        private Long id;
        private String employeeCode;
        private String firstName;
        private String lastName;
        private String department;
        private String designation;
        private String email;
        private String phone;
        private String status = "ACTIVE";
        private Instant createdAt;
        private Instant updatedAt;

        public EmployeeBuilder id(Long id) { this.id = id; return this; }
        public EmployeeBuilder employeeCode(String employeeCode) { this.employeeCode = employeeCode; return this; }
        public EmployeeBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public EmployeeBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public EmployeeBuilder department(String department) { this.department = department; return this; }
        public EmployeeBuilder designation(String designation) { this.designation = designation; return this; }
        public EmployeeBuilder email(String email) { this.email = email; return this; }
        public EmployeeBuilder phone(String phone) { this.phone = phone; return this; }
        public EmployeeBuilder status(String status) { this.status = status; return this; }
        public EmployeeBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public EmployeeBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Employee build() {
            return new Employee(id, employeeCode, firstName, lastName, department, designation, email, phone, status, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmployeeCode() { return employeeCode; }
    public void setEmployeeCode(String employeeCode) { this.employeeCode = employeeCode; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
