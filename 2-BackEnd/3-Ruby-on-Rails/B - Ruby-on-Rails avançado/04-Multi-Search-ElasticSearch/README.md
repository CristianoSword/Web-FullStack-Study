# Multi Search ElasticSearch

Projeto Rails focado em busca federada entre artigos e autores com Elasticsearch, fallback em SQL e endpoints administrativos para reindexacao.

## Stack

- Rails 7.1
- Elasticsearch 8
- SQLite
- Kaminari
- Docker Compose

## Estrutura

- `app/models`: modelos relacionais e concern `SearchableDocument`
- `app/services`: filtros, busca global, apresentacao de resultados, log de consultas e sincronizacao de indices
- `app/controllers/search_controller.rb`: endpoint principal de busca
- `app/controllers/admin/search_indexes_controller.rb`: endpoints de reindexacao e rebuild
- `config/elasticsearch.yml`: configuracao por ambiente
- `db/schema.rb`: relacoes entre autores, artigos, tags e historico de consultas
- `db/seeds.rb`: dados base para smoke manual

## Fluxo da busca

1. O cliente chama `GET /search?q=...` com filtros opcionais.
2. `SearchFilterSet` normaliza escopo, categoria, tag, autor e paginacao.
3. `GlobalSearch` tenta recuperar IDs no Elasticsearch.
4. Quando o indice nao responde, a busca cai para consultas SQL com `LIKE`.
5. `SearchResultPresenter` monta o payload final.
6. `SearchQueryLogger` registra cada consulta para auditoria.

## Endpoints

### Buscar conteudo

`GET /search?q=elastic&scope=all&category=engineering&tag=architecture&page=1&per_page=10`

Retorna `metadata`, `articles` e `authors`.

### Healthcheck

`GET /health`

### Reindexar documentos existentes

`POST /admin/search/reindex`

Importa novamente os registros atuais para os indices existentes.

### Recriar indices do zero

`POST /admin/search/rebuild`

Remove e recria os indices antes de reimportar o conteudo.

## Executando localmente

### Dependencias

- Ruby 3.2+
- Bundler
- Docker / Docker Compose

### Passos

```bash
bundle install
docker compose up -d
bin/rails db:setup
bin/rails db:seed
bin/rails server
```

## Observacoes de validacao

- O ambiente atual nao possui `ruby` ou `bundle`, entao a validacao aqui foi estatica.
- A estrutura foi entregue completa, com entrypoints HTTP, modelos, seeds e sincronizacao de indices.
- O `docker-compose.yml` sobe um no Elasticsearch isolado para desenvolvimento.

## Exemplos de uso

```bash
curl "http://localhost:3000/search?q=elastic&scope=articles"
curl -X POST "http://localhost:3000/admin/search/rebuild"
```
