class IndexSynchronizer
  INDEXED_MODELS = [ArticleDocument, AuthorProfile].freeze

  def rebuild_all!
    INDEXED_MODELS.each do |model|
      recreate_index!(model)
      import_records!(model)
    end
  end

  def import_records!(model)
    payload = model.find_in_batches(batch_size: 100).flat_map do |batch|
      batch.map do |record|
        {
          index: {
            _index: model.search_index_name,
            _id: record.id,
            data: record.as_indexed_json
          }
        }
      end
    end

    return { imported: 0, index: model.search_index_name } if payload.empty?

    Elasticsearch::Model.client.bulk(body: payload)
    { imported: payload.size, index: model.search_index_name }
  end

  def recreate_index!(model)
    client = Elasticsearch::Model.client
    index = model.search_index_name
    client.indices.delete(index: index) if client.indices.exists?(index: index)
    model.__elasticsearch__.create_index!
  end
end
