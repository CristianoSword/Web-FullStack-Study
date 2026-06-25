# 03-Rails-API-Only-JWT

API-only enxuta para estudar emissao e leitura de JWT em Rails.

## Arquivos

- `app/models/api_user.rb`: usuario da API.
- `app/services/token_encoder.rb` e `token_decoder.rb`: codificacao do token.
- `app/controllers/sessions_controller.rb`: login simples.
- `app/controllers/profile_controller.rb`: leitura do perfil via token.
