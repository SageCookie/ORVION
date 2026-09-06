package com.orvion.domain.product;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(length = 255)
    private String description;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public Category() {}

    public Category(Long id, String name, String code, String description, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.createdAt = createdAt;
    }

    public static CategoryBuilder builder() { return new CategoryBuilder(); }

    public static class CategoryBuilder {
        private Long id;
        private String name;
        private String code;
        private String description;
        private Instant createdAt;

        public CategoryBuilder id(Long id) { this.id = id; return this; }
        public CategoryBuilder name(String name) { this.name = name; return this; }
        public CategoryBuilder code(String code) { this.code = code; return this; }
        public CategoryBuilder description(String description) { this.description = description; return this; }
        public CategoryBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Category build() {
            return new Category(id, name, code, description, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
