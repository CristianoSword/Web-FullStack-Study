ELASTICSEARCH_CONFIG = Rails.application.config_for(:elasticsearch).deep_symbolize_keys

Elasticsearch::Model.client = Elasticsearch::Client.new(
  url: ELASTICSEARCH_CONFIG.fetch(:host),
  request_timeout: ELASTICSEARCH_CONFIG.fetch(:request_timeout)
)
