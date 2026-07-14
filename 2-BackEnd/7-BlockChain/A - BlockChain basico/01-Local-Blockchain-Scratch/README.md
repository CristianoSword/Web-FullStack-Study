# 01-Local-Blockchain-Scratch

Blockchain local em Node.js com bloco genesis, transacoes pendentes, mineracao por proof-of-work e recompensa de mineracao.

## O que o projeto cobre

- projeto Node real com scripts de execucao
- modelo de bloco, transacao e estado da cadeia
- hash SHA-256 via `node:crypto`
- bloco genesis
- proof-of-work com dificuldade configuravel
- CLI para demo, cadeia, inclusao de transacao e mineracao

## Como usar

```bash
npm start
npm run demo
npm run chain
node src/index.js add-tx alice bob 25 "Invoice"
node src/index.js mine miner-01
```

## Validacao

Foi executado um smoke test local com:

```bash
node src/index.js demo
```

O comando minerou um bloco valido com hash prefixado por zeros conforme a dificuldade configurada.
