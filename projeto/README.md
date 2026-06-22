# qualquer-coisa

Aplicação web mobile-first **100% pura** — HTML, CSS e JavaScript.

Nada de React, Express, bundlers ou dependências. Apenas web.

## Estrutura

```
frontend/         # Interface do usuário (HTML/CSS/JS)
  ├── index.html  # Markup
  ├── styles.css  # Estilos (tema Paraná)
  └── script.js   # Lógica (vanilla JS)

backend/          # API e lógica de servidor
  └── api.py      # Backend em Python (pronto para integração)

app/              # (legado - manter para compatibilidade)

regras/           # Documentação das regras
server.py         # Servidor dev local (Python)
CORES.md          # Paleta de cores
DEPLOYMENT.md     # Guia de deploy
```

## Como rodar

### Opção 1: Com o servidor local (recomendado)

```bash
python3 server.py
```

Acesse: **http://localhost:8080**

### Opção 2: Sem servidor (direto no navegador)

Abra `frontend/index.html` no navegador (clique duplo ou arraste para a aba).

## Arquitetura

- **Frontend** (`frontend/`): Interface estática + localStorage
- **Backend** (`backend/`): API Python pronta para integração com banco de dados
- **Servidor** (`server.py`): Serve o frontend em desenvolvimento

## Uso da aplicação

- **Tela inicial**: Lista de cidades e atrações do Paraná
- **Admin**: Botão "Admin" na navegação
  - Senha: `33826905` (não é exibida por segurança)
  - Adicione e remova cidades e atrações
  - Dados salvos no `localStorage`

## Tecnologia

- ✅ HTML5 (semântico)
- ✅ CSS3 (mobile-first, responsivo, tema Paraná)
- ✅ JavaScript vanilla (sem frameworks)
- ✅ localStorage (persistência local)
- ✅ Python backend pronto para integração
- ✅ Zero dependências frontend
- ✅ Zero build tools

## Próximos passos

- Conectar backend com banco de dados real
- Integrar com Firebase ou PostgreSQL
- Autenticação com Google/Email
- Deploy em plataforma estática (Vercel, Netlify, etc)
