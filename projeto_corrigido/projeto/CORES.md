# 🎨 Paleta de Cores — Ivaiporã Turismo

Cores escolhidas para representar a identidade visual de Ivaiporã, conhecida carinhosamente como a "Capital das Flores".

## Cores Principais

| Cor | Hex | Nome | Uso |
|-----|-----|------|-----|
| ![#10b981](https://via.placeholder.com/20/10b981/10b981?text=+) | `#10b981` | Verde Esmeralda | Primário (natureza, vales, turismo rural) |
| ![#0ea5e9](https://via.placeholder.com/20/0ea5e9/0ea5e9?text=+) | `#0ea5e9` | Azul Céu | Secundário (água, Lago de Santana, Rio Ivaí) |
| ![#f59e0b](https://via.placeholder.com/20/f59e0b/f59e0b?text=+) | `#f59e0b` | Âmbar | Acento (flores, hospitalidade, comércio) |
| ![#1f2937](https://via.placeholder.com/20/1f2937/1f2937?text=+) | `#1f2937` | Cinza Escuro | Textos principais |
| ![#f8fafc](https://via.placeholder.com/20/f8fafc/f8fafc?text=+) | `#f8fafc` | Branco Neutro | Fundo |

## Inspirações

- **Verde (#10b981)**: Vales de Ivaiporã, matas preservadas e agricultura local
- **Azul (#0ea5e9)**: As águas do Lago de Santana e as curvas do majestoso Rio Ivaí
- **Âmbar (#f59e0b)**: A beleza das flores (Capital das Flores), a energia do sol e a hospitalidade do povo ivaiporaense

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

