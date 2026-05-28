# 05 - Performance Optimized Tailwind

Projeto focado em configuracao de build otimizada do Tailwind: content scanning, safelist controlada, CSS minificado e arquivo final pequeno.

## Como executar

Abra `index.html` diretamente no navegador para ver a versao gerada.

Para reconstruir o CSS:

```bash
npm install
npm run build
```

## Conceitos

- `content` restrito para remover classes nao usadas
- `safelist` para classes dinamicas previsiveis
- `@layer` para componentes reutilizaveis
- `--minify` para gerar CSS de producao

