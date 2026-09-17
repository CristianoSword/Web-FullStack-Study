# Database Relationships Lookup

Lab avancado de MongoDB para resolver relacionamentos entre collections usando `$lookup`.

## Estrutura

- `docker-compose.yml`: sobe o Mongo local em `localhost:27027`.
- `seed/01-init.js`: cria `customers`, `products` e `orders`, com validators, indices e dataset de ecommerce.
- `models/`: schemas das collections e catalogo das estrategias de join.
- `queries/orders-with-customer.mongodb.js`: enriquece pedidos com dados do cliente.
- `queries/orders-with-products.mongodb.js`: resolve itens de pedido com dados dos produtos.
- `queries/customer-order-summary.mongodb.js`: consolida pedidos e gasto total por cliente.
- `queries/verification.mongodb.js`: confere collections, indices e volume por status.
- `compass/`: exemplo de pedido e playbook de execucao.
- `scripts/`: automacoes para subir, inspecionar, parar e validar o lab.

## Collections

- `commerce_graph.customers`
- `commerce_graph.products`
- `commerce_graph.orders`

## Recursos cobertos

- `$lookup`
- `$unwind`
- `$group`
- `$project`
- joins 1:N entre clientes e pedidos
- joins N:N resolvidos por itens de pedido e produtos

## Executar

```powershell
docker compose up -d
```

## Validar estrutura

```powershell
node .\scripts\validate-lookup.mjs
docker compose config
```

## Compass

1. Conecte em `mongodb://localhost:27027/commerce_graph`.
2. Rode `queries/orders-with-customer.mongodb.js`.
3. Rode `queries/orders-with-products.mongodb.js`.
4. Rode `queries/customer-order-summary.mongodb.js`.
5. Confira a base com `queries/verification.mongodb.js`.
