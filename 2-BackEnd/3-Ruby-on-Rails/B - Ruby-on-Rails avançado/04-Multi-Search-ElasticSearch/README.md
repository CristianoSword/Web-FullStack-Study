# 04-Multi-Search-ElasticSearch

Projeto de busca federada para artigos e autores com uma camada simples de agregacao.

## Arquivos

- `app/models/article_document.rb` e `author_profile.rb`: fontes indexaveis.
- `app/services/global_search.rb`: busca simultanea por colecao.
- `app/controllers/search_controller.rb`: endpoint `/search`.
