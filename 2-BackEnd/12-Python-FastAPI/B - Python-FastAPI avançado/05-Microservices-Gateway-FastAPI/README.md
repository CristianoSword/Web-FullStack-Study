# Microservices Gateway FastAPI

API Gateway com FastAPI que centraliza chamadas de catalogo, billing e shipping em uma interface unica.

## Features

- Gateway HTTP unico para compor respostas de multiplos microsservicos
- Microsservicos internos separados para `catalog`, `billing` e `shipping`
- Cliente gateway baseado em `httpx` com `ASGITransport` para proxy interno
- Cotacao consolidada de pedido com itens enriquecidos, total fiscal e frete
- Healthcheck agregado do ecossistema inteiro
- Tratamento de erros de downstream com status propagado corretamente
- Testes automatizados cobrindo catalogo, quote e falha em servico interno

## Estrutura

```text
app/
  api/
    dependencies.py
    routes.py
  clients/
    gateway_client.py
  core/
    errors.py
    exceptions.py
    settings.py
  microservices/
    billing.py
    catalog.py
    shipping.py
  schemas/
    gateway.py
  services/
    order_gateway.py
  main.py
tests/test_gateway_api.py
run.py
requirements.txt
```

## Como executar

```bash
python -m pip install -r requirements.txt
python run.py
```

Servidor padrao: `http://127.0.0.1:8014`

## Endpoints

- `GET /health`
- `GET /gateway/health`
- `GET /gateway/catalog/products`
- `POST /gateway/orders/quote`

## Como testar

```bash
python -m pytest tests/test_gateway_api.py -q
```

Validado localmente em Python `3.9.10` com `4` testes passando. O projeto entrega um gateway funcional que consulta servicos separados e compoe a resposta final de cotacao.
