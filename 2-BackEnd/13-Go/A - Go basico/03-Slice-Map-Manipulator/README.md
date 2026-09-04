# Slice Map Manipulator

CLI de inventario em Go para praticar insercao, busca, remocao, ordenacao e agrupamento usando `slices` e `maps` nativos.

## Estrutura

- `cmd/inventory/main.go`: entrypoint com catalogo inicial.
- `internal/domain`: tipos de item, resumo, ordenacao e agrupamento.
- `internal/service`: regras de negocio com indice por SKU em map e lista ordenavel em slice.
- `internal/ui`: CLI interativa para executar os fluxos.

## Funcionalidades

- cadastro e remocao de itens
- busca por SKU
- pesquisa por nome, categoria ou tags
- ordenacao por `sku`, `name`, `stock` e `category`
- agrupamento por categoria ou faixa de estoque
- resumo do inventario com contagem de categorias e itens em low stock
- restock positivo e negativo com validacoes

## Executar

```bash
go run ./cmd/inventory
```

## Testes

```bash
go test ./...
```

## Exemplo de uso

```text
summary
list
sort stock
group stock-band
add sku-300 headset audio 20 40990 voice,wireless
search voice
restock sku-200 3
remove sku-100
exit
```
