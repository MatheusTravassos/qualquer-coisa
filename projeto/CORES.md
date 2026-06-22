# 🎨 Paleta de Cores — App Paraná

Cores escolhidas para representar a identidade visual do Paraná.

## Cores Principais

| Cor | Hex | Nome | Uso |
|-----|-----|------|-----|
| ![#10b981](https://via.placeholder.com/20/10b981/10b981?text=+) | `#10b981` | Verde Esmeralda | Primário (floresta, natureza) |
| ![#0ea5e9](https://via.placeholder.com/20/0ea5e9/0ea5e9?text=+) | `#0ea5e9` | Azul Céu | Secundário (água, Iguazu) |
| ![#f59e0b](https://via.placeholder.com/20/f59e0b/f59e0b?text=+) | `#f59e0b` | Âmbar | Acento (turismo, energia) |
| ![#1f2937](https://via.placeholder.com/20/1f2937/1f2937?text=+) | `#1f2937` | Cinza Escuro | Textos principais |
| ![#f8fafc](https://via.placeholder.com/20/f8fafc/f8fafc?text=+) | `#f8fafc` | Branco Neutro | Fundo |

## Inspirações

- **Verde (#10b981)**: Florestas tropicais do Paraná
- **Azul (#0ea5e9)**: Cataratas do Iguazu e rios
- **Âmbar (#f59e0b)**: Energia, turismo e hospitalidade

## Como usar

As cores estão definidas como variáveis CSS em `styles.css`:

```css
:root {
  --primary: #10b981;    /* Verde */
  --secondary: #0ea5e9;  /* Azul */
  --accent: #f59e0b;     /* Âmbar */
  --dark: #1f2937;       /* Cinza escuro */
  --light: #f8fafc;      /* Branco */
  --border: #e5e7eb;     /* Cinza claro */
}
```

Use no CSS assim:

```css
.element {
  color: var(--primary);
  background: var(--light);
}
```

## Acessibilidade

- Contraste de cores testado (WCAG AA)
- Textos legíveis em todos os fundos
- Sem dependência exclusiva de cor para indicar ações
