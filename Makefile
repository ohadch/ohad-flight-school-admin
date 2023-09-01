NAMESPACE=ohad-flight-school-admin
PROJECT_NAME=ohad-flight-school-admin

makemigrations:
	cd server && alembic revision --autogenerate -m "$(message)"

migrate:
	cd server && alembic upgrade head

rollback:
	cd server && alembic downgrade -1

up:
	docker-compose -f docker-compose.dev.yml up

down:
	docker-compose down

up-k8s:
	@echo "Updating helm dependencies"
	helm dependency update helm/$(PROJECT_NAME)

	@echo "Installing the chart"
	helm upgrade --install \
		$(PROJECT_NAME) \
		helm/$(PROJECT_NAME) \
		--create-namespace \
		-n $(NAMESPACE)

down-k8s:
	helm uninstall $(PROJECT_NAME) -n $(NAMESPACE)

local-registry-up:
	docker-compose -f docker-compose-registry.yml up -d

local-registry-down:
	docker-compose -f docker-compose-registry.yml down