makemigrations:
	alembic revision --autogenerate -m "$(message)"

migrate:
	alembic upgrade head

rollback:
	alembic downgrade -1