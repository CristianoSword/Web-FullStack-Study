# Less Example

Projeto basico para demonstrar recursos essenciais do **Less**:

- variaveis de cor, fonte e espacamento;
- imports entre arquivos `.less`;
- mixins reutilizaveis;
- nesting para componentes;
- funcoes nativas como `darken()` e `fade()`.

## Como usar

```powershell
npm install
npm run build:less
npm start
```

## Estrutura

- `src/less/` - arquivos Less de origem
- `src/css/` - CSS compilado
- `index.html` - pagina de demonstracao principal
- `src/html/index.html` - pagina alternativa carregando o CSS por caminho relativo

## Visual

Abra `index.html` no navegador depois de gerar o CSS, ou use `npm start`.
