# 02-Background-Jobs-Sidekiq

Fluxo compacto para estudar enfileiramento de lotes com Sidekiq e Active Job.

## Arquivos

- `app/models/export_batch.rb`: lote com status e contagem de itens.
- `app/jobs/export_batch_job.rb`: job enfileirado.
- `app/services/batch_dispatcher.rb`: despacho do processamento.
- `app/controllers/export_batches_controller.rb`: entrada HTTP do fluxo.
