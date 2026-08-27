# Static Files Router

Site simples com FastAPI servindo paginas HTML estaticas, CSS local e rotas dedicadas para assets.

## Features

- `GET /` com homepage em HTML renderizada por template
- `GET /about` com pagina institucional
- `GET /static/site.css` servindo stylesheet local
- `StaticFiles` montado em `/static`
- `Jinja2Templates` para renderizacao server-side
- Validacao de assets na inicializacao e 404 customizado em HTML
- Testes cobrindo HTML, CSS e rota ausente

## Estrutura

```text
app/
  api/routes.py
  core/
    errors.py
    exceptions.py
    settings.py
  models/site.py
  services/site_service.py
  static/site.css
  templates/
    about.html
    home.html
  main.py
tests/test_static_site.py
run.py
requirements.txt
```

## Como executar

```bash
python -m pip install -r requirements.txt
python run.py
```

Servidor padrao: `http://127.0.0.1:8004`

## Rotas

- `GET /health`
- `GET /`
- `GET /about`
- `GET /static/site.css`

## Como testar

```bash
python -m pytest tests/test_static_site.py -q
```

Validado localmente em Python `3.9.10` com `4` testes passando.
