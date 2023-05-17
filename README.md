# Gliding Course Management System Server

## Local Development

### Migrations

```bash
# Create migrations
alembic revision --autogenerate -m "Migration Message"

# Run migrations
alembic upgrade head

# Revert migrations
alembic downgrade -1
```