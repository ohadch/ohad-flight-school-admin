# Gliding Course Management System Server

## Local Development

### Prepare the local machine
```bash
# Install the frontend's env
cd frontend && yarn

# Install the server's env
cd ../server
python3.11 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
```

### Run the project

Run the DB:
```bash
docker-compose -f docker-compose.dev.yml up -d db
```

Run the frontend:

```bash
cd frontend
yarn dev
```

Run the server
```
cd server
source venv/bin/activate
python main.py
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
