# Docker Network Bridge

Projeto de estudo sobre comunicacao entre containers por uma rede `bridge` customizada do Docker, com um servico de catalogo e um gateway HTTP que consome o servico interno pelo nome do container.

## O que foi implementado

- Dois servicos Python padrao: `catalog-service` e `gateway-service`.
- `compose.yaml` com rede `inventory_bridge` usando driver `bridge`.
- Gateway consultando `http://catalog-service:3031/products` pela rede interna.
- Contratos JSON para topologia, payload de produtos e fluxo de rede.
- Scripts para subir, derrubar, inspecionar rede e fazer smoke plan.

## Estrutura

```text
.
|-- catalog/
|-- config/
|-- gateway/
|-- models/
`-- scripts/
```

## Endpoints

- Catalogo: `GET /health`, `GET /products`
- Gateway: `GET /health`, `GET /catalog`, `GET /network`

## Rede

- Rede customizada: `inventory_bridge`
- DNS interno esperado: `catalog-service`
- Publicacao local:
  - `3031:3031` para o catalogo
  - `3030:3030` para o gateway

## Scripts

- `scripts/up-compose.ps1`
- `scripts/down-compose.ps1`
- `scripts/inspect-network.ps1`
- `scripts/check-bridge-plan.ps1`
- `scripts/smoke-gateway.ps1`
- `scripts/validate-project.py`

## Como usar

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\up-compose.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\inspect-network.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-gateway.ps1
```

## Validacao

```powershell
python .\scripts\validate-project.py
python -m py_compile .\catalog\src\app.py .\gateway\src\app.py
powershell -ExecutionPolicy Bypass -File .\scripts\check-bridge-plan.ps1
```

## Observacao de ambiente

O daemon Docker nao esta disponivel na maquina atual, entao a verificacao foi feita por sintaxe Python, topologia declarada no `compose.yaml`, DNS interno usado pelo gateway e scripts operacionais completos.
