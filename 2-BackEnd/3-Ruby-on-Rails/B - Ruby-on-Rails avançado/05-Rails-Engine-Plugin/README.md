# 05-Rails-Engine-Plugin

Engine reutilizavel para expor widgets e demonstrar isolamento de namespace.

## Arquivos

- `lib/study_engine/engine.rb`: boot e isolamento da engine.
- `app/models/study_engine/widget.rb`: modelo exportado.
- `app/services/study_engine/widget_registry.rb`: registro de widgets.
- `config/routes.rb`: rotas internas da engine.
