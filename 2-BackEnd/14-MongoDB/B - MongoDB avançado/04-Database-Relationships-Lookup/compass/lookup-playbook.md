# Lookup Playbook

1. Conecte em `mongodb://localhost:27027/commerce_graph`.
2. Abra a collection `orders`.
3. Rode `queries/orders-with-customer.mongodb.js` para enriquecer pedidos com cliente.
4. Rode `queries/orders-with-products.mongodb.js` para resolver produtos por item.
5. Rode `queries/customer-order-summary.mongodb.js` para consolidar gasto por cliente.
6. Confira estrutura e indices com `queries/verification.mongodb.js`.
