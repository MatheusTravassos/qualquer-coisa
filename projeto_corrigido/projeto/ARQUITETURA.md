# Arquitetura — Ivaiporã Turismo

## Fonte canônica

A pasta `frontend/` contém a aplicação publicada:

- `index.html`: estrutura da interface;
- `styles.css`: tema, responsividade e acessibilidade;
- `script.js`: traduções, atrações, imagens e mapas;
- `*.jpg`: recursos visuais locais.

O `index.html` da raiz apenas redireciona para essa pasta. A pasta `app/` é um espelho de compatibilidade e não deve ser editada manualmente.

## Mapas

Sem uma chave salva em `localStorage` sob `google_maps_api_key`, a aplicação usa os embeds públicos do Google Maps. Quando uma chave válida está disponível, usa a API JavaScript para marcadores e Street View.

## Dados

O frontend usa `localStorage` para dados locais, idioma e tema. O servidor oferece:

- `GET /api/data`: leitura do `db.json` ou dos dados padrão;
- `POST /api/data`: gravação protegida pelo token definido em `IVAIPORA_ADMIN_TOKEN`.

O token não fica no código cliente nem no repositório.

## Backend auxiliar

`backend/api.py` é apenas um protótipo em memória. A API local realmente executada pelo comando `python3 server.py` está em `server.py`.

## Deploy

A Vercel e o servidor local apontam para `frontend/`, evitando divergência entre desenvolvimento e produção. Veja `DEPLOYMENT.md`.
