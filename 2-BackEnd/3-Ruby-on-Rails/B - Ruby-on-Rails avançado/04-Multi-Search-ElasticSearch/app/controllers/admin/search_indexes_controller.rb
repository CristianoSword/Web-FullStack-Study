module Admin
  class SearchIndexesController < ApplicationController
    def create
      synchronizer = IndexSynchronizer.new

      render json: {
        reindexed: IndexSynchronizer::INDEXED_MODELS.map do |model|
          {
            model: model.name,
            result: synchronizer.import_records!(model)
          }
        end
      }, status: :accepted
    end

    def rebuild
      synchronizer = IndexSynchronizer.new
      synchronizer.rebuild_all!

      render json: {
        status: "rebuilt",
        indexes: IndexSynchronizer::INDEXED_MODELS.map(&:search_index_name)
      }, status: :accepted
    end
  end
end
