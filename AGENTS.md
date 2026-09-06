# ORVION Developer & Agent Directives

## Architecture Rules
1. **Domain-Driven Modular Monolith**: Organize backend modules strictly inside `com.orvion.domain.<domain>`. Keep controllers, services, entities, DTOs, and repositories encapsulated per domain.
2. **Strict RBAC Enforcement**: All backend business methods must be annotated with `@PreAuthorize("hasAuthority('ROLE_NAME')")` or checked via security context. Frontend route guards are for UX only; backend security is authoritative.
3. **No AI/ML Module Allowed**: Do not add XGBoost, Pandas, Scikit-learn, Python scripts, or predictive endpoints.
4. **Transaction Integrity**: Use `@Transactional` on all multi-entity operations (Quotation → Order conversion, Stock adjustments, Payment processing, Quality check completions).
5. **No Floating Point for Money**: Use `BigDecimal` with explicit scale (2 decimal places) and `RoundingMode.HALF_UP` for all monetary amounts, taxes, discounts, and balances.

## Coding Standards & Naming Conventions
- **Java**: CamelCase for classes/interfaces (`CustomerService`), camelCase for variables/methods (`calculateBalance`), UPPER_SNAKE_CASE for constants & enum values (`SUPER_ADMIN`).
- **TypeScript**: PascalCase for React Components (`DataTable.tsx`), camelCase for hooks & utility functions (`useAuth.ts`), UPPER_SNAKE_CASE for constant values.
- **REST API Endpoints**: Lowercase plural nouns (`/api/v1/customers`, `/api/v1/quotations/{id}/convert`).

## Security Directives
- Passwords must be hashed using BCrypt (`BCryptPasswordEncoder`).
- JWT secrets must be loaded from environment variables or `application.yml`.
- Never log passwords, tokens, or personal identifiers.
- Validate all incoming request DTOs using Jakarta `@Valid` / Bean Validation.

## Build & Test Commands
- **Backend**: `./mvnw clean test` and `./mvnw spring-boot:run`
- **Frontend**: `npm run build` and `npm run dev`
