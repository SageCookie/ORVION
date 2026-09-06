package com.orvion.domain.auth.dto;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;

    public AuthResponse() {}

    public AuthResponse(String accessToken, String tokenType, Long id, String email, String firstName, String lastName, String role) {
        this.accessToken = accessToken;
        this.tokenType = tokenType != null ? tokenType : "Bearer";
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    public static AuthResponseBuilder builder() { return new AuthResponseBuilder(); }

    public static class AuthResponseBuilder {
        private String accessToken;
        private String tokenType = "Bearer";
        private Long id;
        private String email;
        private String firstName;
        private String lastName;
        private String role;

        public AuthResponseBuilder accessToken(String accessToken) { this.accessToken = accessToken; return this; }
        public AuthResponseBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
        public AuthResponseBuilder id(Long id) { this.id = id; return this; }
        public AuthResponseBuilder email(String email) { this.email = email; return this; }
        public AuthResponseBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public AuthResponseBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public AuthResponseBuilder role(String role) { this.role = role; return this; }

        public AuthResponse build() {
            return new AuthResponse(accessToken, tokenType, id, email, firstName, lastName, role);
        }
    }

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
