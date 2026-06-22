.PHONY: dev serve clean help

help:
	@echo "📱 App Paraná — Desenvolvimento Web Puro"
	@echo ""
	@echo "Comandos disponíveis:"
	@echo "  make dev      — Inicia servidor de desenvolvimento (localhost:8080)"
	@echo "  make serve    — Alias para dev"
	@echo "  make clean    — Limpa cache de Python"
	@echo "  make help     — Mostra esta mensagem"

dev:
	@echo "🚀 Iniciando servidor em http://localhost:8080"
	python3 server.py

serve: dev

clean:
	@rm -rf __pycache__
	@echo "✓ Cache limpo"
