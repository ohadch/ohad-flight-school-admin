# Gliding Course Management System Server

## Local Development

### Run the DB

```bash
docker-compose -f docker-compose.dev.yml up -d db
```

### Migrations

```bash
# The migrations are declared in the server folder.
cd server

# Create migrations
make makemigrations message="Some migration message"

# Migrate
make migrate

# Rollback last migration
make rollback
```
