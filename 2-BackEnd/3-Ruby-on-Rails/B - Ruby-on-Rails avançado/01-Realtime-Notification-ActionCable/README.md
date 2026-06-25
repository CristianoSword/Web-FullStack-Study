# 01-Realtime-Notification-ActionCable

Exemplo de notificacao em tempo real usando um canal dedicado e broadcaster simples.

## Arquivos

- `app/channels/notifications_channel.rb`: stream principal do feed.
- `app/services/notification_broadcaster.rb`: publica payloads no canal.
- `app/controllers/notifications_controller.rb`: cria e dispara notificacoes.
