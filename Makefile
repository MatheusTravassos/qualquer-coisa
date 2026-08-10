.PHONY: dev serve validate clean help

help:
	@echo "Ivaiporã Turismo — comandos"
	@echo "  make dev       Inicia o servidor em localhost:8080"
	@echo "  make validate  Valida sintaxe e referências locais"
	@echo "  make clean     Remove caches Python"

dev:
	python3 server.py

serve: dev

validate:
	python3 tools/validate_project.py

clean:
	@find . -type d -name __pycache__ -prune -exec rm -rf {} +
	@find . -type f -name '*.pyc' -delete
