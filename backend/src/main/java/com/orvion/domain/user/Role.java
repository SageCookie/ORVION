package com.orvion.domain.user;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 50, unique = true, nullable = false)
    private RoleEnum name;

    @Column(length = 255)
    private String description;

    public Role() {}

    public Role(Long id, RoleEnum name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public static RoleBuilder builder() { return new RoleBuilder(); }

    public static class RoleBuilder {
        private Long id;
        private RoleEnum name;
        private String description;

        public RoleBuilder id(Long id) { this.id = id; return this; }
        public RoleBuilder name(RoleEnum name) { this.name = name; return this; }
        public RoleBuilder description(String description) { this.description = description; return this; }

        public Role build() {
            return new Role(id, name, description);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public RoleEnum getName() { return name; }
    public void setName(RoleEnum name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
