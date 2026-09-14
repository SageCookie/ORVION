# Docker Setup - Complete Guide

## ✅ One-Command Setup

Your project is now fully configured for "clone and run" Docker deployment. No manual configuration needed.

```bash
docker compose up --build
```

That's it. Everything works with sensible defaults.

## What Changed

### 1. **Persistent Upload Storage**
Added `orvion_uploads` volume so uploaded files survive container restarts.

### 2. **Proper Backend Healthcheck**
- Switched runtime image from `distroless` to `eclipse-temurin:21-jre-alpine`
- Added `curl` for healthcheck support
- Backend now properly reports health at `/actuator/health`

### 3. **Cleaner Environment Configuration**
Updated `.env.example` to be Docker-first:
- Defaults work immediately with `docker compose`
- Removed confusing `SPRING_PROFILES_ACTIVE=h2` (Docker always uses `postgres`)
- Documented that ML service is optional

### 4. **Better Documentation**
Updated README with clear "Quick Start (Docker)" section showing the minimal steps.

## Services

| Service | URL | Notes |
|---------|-----|-------|
| Frontend | http://localhost:5173 | React + Nginx |
| Backend | http://localhost:8080 | Spring Boot + PostgreSQL |
| Swagger | http://localhost:8080/swagger-ui.html | API docs |
| PostgreSQL | localhost:5432 | `orvion_db` / `orvion_user` |
| Prometheus* | http://localhost:9090 | `--profile observability` |
| Grafana* | http://localhost:3000 | `--profile observability` |

*Observability stack is optional.

## Demo Accounts

All accounts use password: `Password123!`

- `admin@orvion.com` — Super Admin
- `business.admin@orvion.com` — Business Admin
- `sales@orvion.com` — Sales Manager
- `inventory@orvion.com` — Inventory Manager
- `production@orvion.com` — Production Manager
- `accountant@orvion.com` — Accountant
- `delivery@orvion.com` — Delivery Manager
- `employee@orvion.com` — Employee

## Data Persistence

Two Docker volumes persist data across restarts:
- `orvion_pgdata` — PostgreSQL database
- `orvion_uploads` — File uploads

To reset everything:
```bash
docker compose down -v
docker compose up --build
```

## No .env Required

All defaults are in `docker-compose.yml` with fallback values. Only create `.env` if you need custom values:

```bash
cp .env.example .env
# Edit as needed
```

## ML Service (Optional)

The backend references `ORVION_ML_BASE_URL=http://ml-service:8000` but no ML service exists in this repo. The app works fine without it — ML endpoints return errors if called, but all core features function normally.

To disable ML references, set in `.env`:
```
ORVION_ML_BASE_URL=http://localhost:9999
```

## Testing the Setup

1. Start services:
   ```bash
   docker compose up --build
   ```

2. Wait for "ORVION Data Initialization Completed Successfully!" in logs

3. Open http://localhost:5173

4. Login with `admin@orvion.com` / `Password123!`

5. Create a customer, product, quotation — everything persists

6. Stop and restart:
   ```bash
   docker compose down
   docker compose up
   ```

7. Data and uploads still there ✓

## What Someone Else Needs

To run your project from scratch:

**Prerequisites:**
- Docker Desktop (or Docker Engine + Docker Compose)

**Steps:**
```bash
git clone <your-repo-url>
cd orvion
docker compose up --build
```

That's literally it. Zero configuration files to create or edit.
