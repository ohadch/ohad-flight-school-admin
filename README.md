# Gliding Course Management System Server

## Local Development

### Run the DB

```bash
docker-compose up -d db
```

### Migrations

```bash
# Create migrations
alembic revision --autogenerate -m "Migration Message"

# Run migrations
alembic upgrade head

# Revert migrations
alembic downgrade -1
```