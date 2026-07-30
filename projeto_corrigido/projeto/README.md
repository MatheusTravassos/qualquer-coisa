# Ivaiporã Turismo

Aplicação web mobile-first feita com HTML, CSS e JavaScript puros.

## Estrutura correta

```text
frontend/          # Fonte canônica publicada e servida
  index.html
  styles.css
  script.js
  *.jpg             # Imagens locais com extensão e conteúdo corretos
app/               # Espelho de compatibilidade do frontend
backend/api.py     # Protótipo de API em memória
server.py          # Servidor local + GET/POST /api/data
vercel.json        # Publica a pasta frontend/
index.html         # Redireciona para frontend/index.html
```

A pasta `frontend/` é a versão principal. A Vercel e o servidor local apontam para ela, evitando que versões diferentes sejam publicadas por engano.

## Executar localmente

```bash
python3 server.py
```

Abra `http://localhost:8080`.

Também é possível abrir `index.html` diretamente; ele redireciona para a versão correta em `frontend/`.

## API local

`GET /api/data` funciona em modo somente leitura sem configuração adicional.

Para habilitar `POST /api/data`, defina um token no ambiente antes de iniciar o servidor:

### Linux/macOS

```bash
export IVAIPORA_ADMIN_TOKEN="uma-senha-forte"
python3 server.py
```

### Windows PowerShell

```powershell
$env:IVAIPORA_ADMIN_TOKEN="uma-senha-forte"
python server.py
```

Envie o token no cabeçalho `Authorization: Bearer <token>`.

## Imagens

As imagens locais foram normalizadas para JPEG real com extensão `.jpg`, otimizadas e copiadas para todos os destinos compatíveis. O JavaScript também possui fallback visual caso uma imagem externa não carregue.
