# Async Task Celery Redis

API de processamento assincrono com FastAPI, Celery, Redis e persistencia local de jobs.

## Features

- API para enfileirar jobs analiticos com `FastAPI`
- Worker real em `Celery` usando `Redis` como broker e result backend
- Persistencia de jobs em `SQLite` com historico de status
- Tarefas de analise numerica com histograma, soma de quadrados e contagem de primos
- Fluxo de fila com estados `queued`, `running`, `completed` e `failed`
- Testes automatizados executando Celery em modo eager para smoke local

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
  db/
    base.py
    session.py
  models/
    job.py
  repositories/
    job_repository.py
  schemas/
    jobs.py
  services/
    job_service.py
  workers/
    celery_app.py
    tasks.py
  main.py
tests/test_jobs_api.py
docker-compose.yml
run_api.py
run_worker.py
requirements.txt
```

## Como executar

```bash
docker compose up -d
python -m pip install -r requirements.txt
python run_api.py
python run_worker.py
```

API padrao: `http://127.0.0.1:8012`

## Endpoints

- `GET /health`
- `POST /jobs/analytics`
- `GET /jobs`
- `GET /jobs/{job_id}`

## Configuracao

Variaveis principais:

```env
DATABASE_URL=sqlite+pysqlite:///./jobs.db
REDIS_URL=redis://127.0.0.1:6379
CELERY_TASK_ALWAYS_EAGER=false
```

## Como testar

```bash
python -m pytest tests/test_jobs_api.py -q
```

Validado localmente em Python `3.9.10` com `4` testes passando. Em ambiente real o worker usa Redis; nos testes o Celery roda em modo eager para validar o fluxo sem dependencia externa.
