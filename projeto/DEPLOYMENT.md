# 🚀 Deploy — App Paraná

Guia para publicar a aplicação em diferentes plataformas.

## Opções de Deploy

### 1. **Vercel** (recomendado — mais fácil)

```bash
npm install -g vercel
vercel
```

- Arquivo `vercel.json` já está configurado
- Deploy automático a cada push no Git

### 2. **Netlify**

1. Vá para [netlify.com](https://netlify.com)
2. Conecte seu repositório GitHub
3. Configure:
   - **Build command**: deixe vazio
   - **Publish directory**: `app`
4. Deploy automático!

### 3. **GitHub Pages**

```bash
git branch -D gh-pages
git checkout --orphan gh-pages
git add app/
git commit -m "Deploy static site"
git push origin gh-pages
```

Depois, vá para Settings → Pages e escolha `gh-pages`.

### 4. **Servidor Apache/Nginx**

1. Faça upload da pasta `app/` para seu servidor
2. Configure o raiz do site para apontar para `app/`
3. Pronto!

### 5. **Firebase Hosting**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Escolha a pasta 'app' como deploy directory
firebase deploy
```

## Pontos importantes

- ✅ Zero dependências — funciona em qualquer lugar
- ✅ Sem build necessário — arquivos estáticos puros
- ✅ Dados salvos no navegador — localStorage
- ✅ Totalmente responsivo — funciona em mobile

## URL do projeto (quando deplyado)

Será algo como:
- Vercel: `https://seu-projeto.vercel.app`
- Netlify: `https://seu-projeto.netlify.app`
- GitHub Pages: `https://seu-usuario.github.io/repo-name`
