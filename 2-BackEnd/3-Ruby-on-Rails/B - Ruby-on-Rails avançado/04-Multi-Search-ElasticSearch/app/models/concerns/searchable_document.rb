module SearchableDocument
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks

    settings index: {
      number_of_shards: 1,
      number_of_replicas: 0,
      analysis: {
        analyzer: {
          folded_text: {
            tokenizer: "standard",
            filter: ["lowercase", "asciifolding"]
          }
        }
      }
    } do
      mappings dynamic: "false" do
        indexes :record_type, type: :keyword
        indexes :title, type: :text, analyzer: :folded_text
        indexes :body, type: :text, analyzer: :folded_text
        indexes :summary, type: :text, analyzer: :folded_text
        indexes :author_name, type: :text, analyzer: :folded_text
        indexes :category, type: :keyword
        indexes :tags, type: :keyword
        indexes :status, type: :keyword
        indexes :published_at, type: :date
      end
    end
  end

  class_methods do
    def search_index_name
      prefix = ELASTICSEARCH_CONFIG.fetch(:index_prefix)
      "#{prefix}-#{model_name.singular}"
    end
  end

  def index_name
    self.class.search_index_name
  end
end
