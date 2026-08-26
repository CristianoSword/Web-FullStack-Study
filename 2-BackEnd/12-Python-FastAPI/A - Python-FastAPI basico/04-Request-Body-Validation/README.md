# Request Body Validation

API de cadastro com FastAPI focada em validacoes avancadas de body, incluindo email, senha, telefone e endereco.

## Features

- `POST /registrations` para cadastrar clientes com payload tipado
- `POST /registrations/preview` para validar e simular o cadastro
- Validacao de `EmailStr`, idade minima, CEP e telefone
- Regras extras de dominio para senha confirmada e bloqueio de emails descartaveis
- Handler padronizado para erros `422`
- Testes automatizados cobrindo sucesso e falhas de validacao

## Estrutura

```text
app/
  api/routes.py
  core/
    errors.py
    exceptions.py
    settings.py
  models/registration.py
  services/registration_service.py
  main.py
tests/test_registration_api.py
run.py
requirements.txt
```

## Como executar

```bash
python -m pip install -r requirements.txt
python run.py
```

Servidor padrao: `http://127.0.0.1:8003`

## Endpoints

- `GET /health`
- `POST /registrations`
- `POST /registrations/preview`

## Exemplo de payload

```json
{
  "full_name": "Ana Carolina",
  "email": "ana@example.com",
  "password": "StrongPass1",
  "confirm_password": "StrongPass1",
  "age": 29,
  "phone": "(11) 99888-7766",
  "newsletter_opt_in": true,
  "company": "Open Study",
  "address": {
    "street": "Rua das Flores, 123",
    "city": "Sao Paulo",
    "state": "SP",
    "postal_code": "01310-100"
  }
}
```

## Como testar

```bash
python -m pytest tests/test_registration_api.py -q
```

Validado localmente em Python `3.9.10` com `4` testes passando.
