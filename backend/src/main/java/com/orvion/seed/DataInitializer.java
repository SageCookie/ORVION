package com.orvion.seed;

import com.orvion.domain.customer.Customer;
import com.orvion.domain.customer.CustomerRepository;
import com.orvion.domain.product.Category;
import com.orvion.domain.product.Product;
import com.orvion.domain.product.ProductRepository;
import com.orvion.domain.supplier.Supplier;
import com.orvion.domain.supplier.SupplierRepository;
import com.orvion.domain.user.Role;
import com.orvion.domain.user.RoleEnum;
import com.orvion.domain.user.RoleRepository;
import com.orvion.domain.user.User;
import com.orvion.domain.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository,
                           CustomerRepository customerRepository,
                           SupplierRepository supplierRepository,
                           ProductRepository productRepository,
                           PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.supplierRepository = supplierRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Checking & Initializing ORVION Master Data & User Accounts...");

        // 1. Seed Roles
        for (RoleEnum roleEnum : RoleEnum.values()) {
            if (roleRepository.findByName(roleEnum).isEmpty()) {
                Role role = Role.builder()
                        .name(roleEnum)
                        .description("System role for " + roleEnum.name())
                        .build();
                roleRepository.save(role);
            }
        }

        // 2. Seed Users for all 8 Roles (Password: Password123!)
        String encodedPass = passwordEncoder.encode("Password123!");

        seedUser("admin@orvion.com", "Super", "Admin", RoleEnum.ROLE_SUPER_ADMIN, encodedPass);
        seedUser("business.admin@orvion.com", "Business", "Admin", RoleEnum.ROLE_BUSINESS_ADMIN, encodedPass);
        seedUser("sales@orvion.com", "Sales", "Manager", RoleEnum.ROLE_SALES_MANAGER, encodedPass);
        seedUser("inventory@orvion.com", "Inventory", "Manager", RoleEnum.ROLE_INVENTORY_MANAGER, encodedPass);
        seedUser("production@orvion.com", "Production", "Manager", RoleEnum.ROLE_PRODUCTION_MANAGER, encodedPass);
        seedUser("accountant@orvion.com", "Chief", "Accountant", RoleEnum.ROLE_ACCOUNTANT, encodedPass);
        seedUser("delivery@orvion.com", "Logistics", "Lead", RoleEnum.ROLE_DELIVERY_MANAGER, encodedPass);
        seedUser("employee@orvion.com", "Standard", "Staff", RoleEnum.ROLE_EMPLOYEE, encodedPass);

        // 3. Seed Initial Master Data if empty
        if (customerRepository.count() == 0) {
            customerRepository.save(Customer.builder()
                    .customerCode("CUST-10001")
                    .companyName("Acme Global Logistics")
                    .contactName("John Miller")
                    .email("contact@acmeglobal.com")
                    .phone("+1-555-0192")
                    .taxId("TAX-998811")
                    .addressLine1("100 Industrial Blvd")
                    .city("Chicago")
                    .state("IL")
                    .postalCode("60601")
                    .build());

            customerRepository.save(Customer.builder()
                    .customerCode("CUST-10002")
                    .companyName("Apex Manufacturing Inc")
                    .contactName("Sarah Jenkins")
                    .email("procurement@apexman.com")
                    .phone("+1-555-0482")
                    .taxId("TAX-774433")
                    .addressLine1("45 Tech Parkway")
                    .city("Austin")
                    .state("TX")
                    .postalCode("78701")
                    .build());
        }

        if (supplierRepository.count() == 0) {
            supplierRepository.save(Supplier.builder()
                    .supplierCode("SUP-20001")
                    .name("Vortex Steel Supply Co.")
                    .contactName("Robert Vance")
                    .email("sales@vortexsteel.com")
                    .phone("+1-555-9011")
                    .address("78 Metal Works Way, Detroit, MI")
                    .build());
        }

        log.info("ORVION Data Initialization Completed Successfully!");
    }

    private void seedUser(String email, String firstName, String lastName, RoleEnum roleEnum, String passwordHash) {
        if (userRepository.findByEmail(email).isEmpty()) {
            Role role = roleRepository.findByName(roleEnum).orElseThrow();
            User user = User.builder()
                    .email(email)
                    .passwordHash(passwordHash)
                    .firstName(firstName)
                    .lastName(lastName)
                    .role(role)
                    .active(true)
                    .build();
            userRepository.save(user);
        }
    }
}
