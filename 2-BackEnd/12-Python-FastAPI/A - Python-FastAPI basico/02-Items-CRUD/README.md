# Items CRUD

CRUD em memoria com FastAPI, Pydantic e separacao entre rotas, servico e repositorio.

## Features

- `POST /items` para criar itens com `sku` unico
- `GET /items` para listar o catalogo atual
- `GET /items/{item_id}` para consultar um item
- `PUT /items/{item_id}` para atualizar descricao, preco e estoque
- `DELETE /items/{item_id}` para remover itens
- Handlers consistentes para `404`, `409` e `422`
- Testes automatizados cobrindo fluxo completo da API

## Estrutura

```text
app/
  api/
    dependencies.py
    routes.py
  core/
    errors.py
    exceptions.py
    settings.py
  models/item.py
  repositories/
    item_repository.py
    memory_item_repository.py
  services/item_service.py
  main.py
tests/test_items_api.py
run.py
requirements.txt
```

## Como executar

```bash
python -m pip install -r requirements.txt
python run.py
```

Servidor padrao: `http://127.0.0.1:8001`

## Endpoints

- `GET /health`
- `GET /items`
- `POST /items`
- `GET /items/{item_id}`
- `PUT /items/{item_id}`
- `DELETE /items/{item_id}`

## Exemplo de payload

```json
{
  "name": "Mechanical Keyboard",
  "sku": "kb-001",
  "description": "Wireless keyboard",
  "price": "499.90",
  "quantity": 8
}
```

## Como testar

```bash
python -m pytest tests/test_items_api.py -q
```

Validado localmente em Python `3.9.10` com `4` testes passando.
