# 🏗️ Arquitetura — App Paraná

## Separação Backend e Frontend

A aplicação está estruturada em duas camadas bem definidas:

### Frontend (`frontend/`)

- **Responsabilidade**: Interface do usuário
- **Tecnologia**: HTML5, CSS3, JavaScript vanilla
- **Dados**: Persistência local via `localStorage`
- **Senha Admin**: `33826905` (armazenada em `sessionStorage` durante a sessão)
- **Arquivos**:
  - `index.html` — Estrutura
  - `styles.css` — Estilos (tema Paraná com cores: verde, azul, âmbar)
  - `script.js` — Lógica frontend (renderização, eventos)
  - `firebase-config-example.js` — Template para integração Firebase

### Backend (`backend/`)

- **Responsabilidade**: Lógica de servidor e API
- **Tecnologia**: Python com Flask/FastAPI (pronto para integração)
- **Arquivos**:
  - `api.py` — Funções de negócio para gerenciar cidades e atrações

### Servidor (`server.py`)

- Serve o frontend em http://localhost:8080
- Sem cache para desenvolvimento rápido
- Pronto para produção (apenas servir estáticos)

## Fluxo de Dados

```
User (Browser)
      ↓
Frontend (localStorage) → Tela do usuário
      ↓
Backend (em desenvolvimento) → Banco de dados
```

## Integração Backend

Para conectar o backend com o frontend:

1. **Opção 1 — Firebase** (recomendado)
   - Descomente o código em `firebase-config-example.js`
   - Use as funções Firebase para fazer requisições

2. **Opção 2 — API REST própria**
   - Desenvolva endpoints em `backend/api.py`
   - Importe Flask ou FastAPI
   - Faça requisições fetch do frontend

3. **Opção 3 — MongoDB + Node.js**
   - Mude o backend para Express.js
   - Configure conexão com MongoDB Atlas

## Segurança

- ✅ Senha do admin NÃO é exibida
- ⚠️ Senha armazenada em plain text (apenas desenvolvimento)
- 🔄 Use autenticação real em produção (OAuth, JWT, etc)

## Deploy

- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Cloud Run, PythonAnywhere

Veja `DEPLOYMENT.md` para detalhes.
