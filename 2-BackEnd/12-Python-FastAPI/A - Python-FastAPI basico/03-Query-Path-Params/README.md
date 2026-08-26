# Query Path Params

API de consulta em catalogo com FastAPI, filtros por query string e leitura de recursos por path params.

## Features

- `GET /products/search` com filtros por `term`, `tag`, `min_price`, `max_price` e `limit`
- `GET /categories/{category}/products/{slug}` para navegao por caminho dinamico
- Dataset em memoria com servico dedicado de catalogo
- Validacao de faixa de preco e limites de consulta
- Handlers padronizados para `404` e `422`
- Testes cobrindo filtros, path params e erros

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
  models/catalog.py
  services/catalog_service.py
  main.py
tests/test_catalog_api.py
run.py
requirements.txt
```

## Como executar

```bash
python -m pip install -r requirements.txt
python run.py
```

Servidor padrao: `http://127.0.0.1:8002`

## Endpoints

- `GET /health`
- `GET /products/search`
- `GET /categories/{category}/products/{slug}`

## Exemplos

`GET /products/search?tag=wireless&limit=2`

`GET /categories/audio/products/wireless-headphones`

## Como testar

```bash
python -m pytest tests/test_catalog_api.py -q
```

Validado localmente em Python `3.9.10` com `4` testes passando.
