# 03-Fastify-Microservice

Microsservico Fastify real com plugin de rotas, schema de payload e respostas HTTP.

## Arquivos

- `src/server.js`: cria o servidor Fastify e registra os plugins.
- `src/routes/order-routes.js`: expoe `GET /orders`, `GET /orders/:id` e `POST /orders`.
- `src/services/order-service.js`: armazena, busca e cria pedidos.
- `src/validators/order-validator.js`: protege a entrada do `POST /orders`.
