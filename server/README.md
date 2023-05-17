# Gliding Course Management System Server

## Local Development

### Migrations

```bash
# Create migrations
DATABASE_URL=sqlite:///data.db alembic revision --autogenerate -m "Migration Message"

# Run migrations
DATABASE_URL=sqlite:///data.db alembic upgrade head

# Revert migrations
DATABASE_URL=sqlite:///data.db alembic downgrade -1
```