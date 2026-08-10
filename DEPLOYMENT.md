# Deploy — Ivaiporã Turismo

## Vercel

O `vercel.json` já publica a pasta canônica `frontend/`.

```bash
vercel
```

## Netlify

Use:

- Build command: vazio
- Publish directory: `frontend`

## GitHub Pages

Publique o conteúdo da pasta `frontend/` na raiz da branch do Pages. Não publique apenas a raiz do repositório sem preservar o redirecionamento.

## Firebase Hosting

Ao executar `firebase init hosting`, escolha `frontend` como diretório público.

## Apache/Nginx

Configure a raiz pública do site para a pasta `frontend/`.

## Observação de cache

O projeto usa revalidação dos arquivos em cada acesso para evitar que um HTML antigo seja combinado com imagens, CSS ou JavaScript de outra versão durante atualizações.
