# 02-Parallel-Test-Grid

Laboratorio avancado de **Selenium Grid** com Docker para rodar testes paralelos em Chrome e Firefox.

## O que este projeto cobre

- `docker-compose.yml` com hub e nodes
- script Node conectando em `RemoteWebDriver`
- execucao paralela com `Promise.all`
- suite simples para validar o grid

## Como estudar

```bash
docker compose up -d
python -m http.server 4302 --directory app
npm install
npm start
```
