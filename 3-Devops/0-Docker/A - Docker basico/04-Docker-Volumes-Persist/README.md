# Docker Volumes Persist

Projeto de estudo sobre persistencia em containers usando volume nomeado do Docker para manter um banco SQLite mesmo apos reiniciar ou recriar o container.

## O que foi implementado

- API HTTP em Python padrao para listar, criar, remover e semear itens de inventario.
- Banco SQLite salvo em `DB_PATH`, apontando para o volume montado em `/data`.
- `Dockerfile` com `VOLUME ["/data"]` e porta publicada em `3020`.
- `compose.yaml` com servico `inventory-service` e volume nomeado `inventory_data`.
- Modelos JSON para documentar contrato do inventario, layout do banco e estrategia de volumes.
- Scripts PowerShell para build, subida via compose, execucao com bind mount e smoke plan.

## Estrutura

```text
.
|-- config/
|-- models/
|-- scripts/
|-- seed/
`-- src/
```

## Endpoints

- `GET /health`
- `GET /items`
- `POST /items`
- `DELETE /items/<id>`
- `POST /seed`
- `GET /volumes`

## Fluxo de persistencia

- Volume nomeado principal: `inventory_data:/data`
- Banco persistido: `/data/inventory.db`
- Bind mount opcional para inspecao local: `./runtime-data:/data`

## Scripts

- `scripts/build-image.ps1`
- `scripts/up-compose.ps1`
- `scripts/down-compose.ps1`
- `scripts/run-bind-volume.ps1`
- `scripts/check-volume-plan.ps1`
- `scripts/smoke-api.ps1`
- `scripts/validate-project.py`

## Como usar

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-image.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\up-compose.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-api.ps1
```

## Exemplo de carga

```json
{
  "sku": "CAB-001",
  "name": "USB-C Cable",
  "quantity": 20,
  "location": "rack-a1"
}
```

## Validacao

```powershell
python .\scripts\validate-project.py
python -m py_compile .\src\app.py .\src\database.py .\src\repository.py .\src\runtime.py .\src\responses.py
powershell -ExecutionPolicy Bypass -File .\scripts\check-volume-plan.ps1
```

## Observacao de ambiente

O ambiente atual nao tem daemon Docker acessivel, entao a verificacao foi feita por estrutura do projeto, sintaxe Python, coerencia do `compose.yaml`, definicao de volume e scripts operacionais reais.
