# Websocket Realtime Alerts

Servidor de alertas em tempo real com FastAPI, WebSockets, canais e painel HTML de monitoramento.

## Features

- Conexao WebSocket por canal com suporte a multiplos clientes simultaneos
- Publicacao de alertas via endpoint HTTP para broadcast instantaneo
- Snapshot inicial do canal com clientes conectados e historico recente
- Eventos de entrada, saida e mensagens de cliente
- Dashboard HTML para conectar, observar feed e disparar alertas
- Testes automatizados cobrindo REST, WebSocket e validacoes

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
  schemas/
    alerts.py
  services/
    alert_hub.py
    contracts.py
  templates/
    dashboard.html
  main.py
tests/test_alerts_api.py
run.py
requirements.txt
```

## Como executar

```bash
python -m pip install -r requirements.txt
python run.py
```

Servidor padrao: `http://127.0.0.1:8013`

## Endpoints

- `GET /health`
- `GET /`
- `POST /alerts`
- `GET /channels`
- `GET /channels/{channel}`
- `WS /ws/{channel}?username=...`

## Como testar

```bash
python -m pytest tests/test_alerts_api.py -q
```

Validado localmente em Python `3.9.10` com `4` testes passando, incluindo handshake WebSocket, snapshot inicial e broadcast de alertas publicados via HTTP.
