class ExportBatchesController < ApplicationController
  def create
    batch = ExportBatch.create!(batch_params)
    BatchDispatcher.new.dispatch(batch)
  end

  private

  def batch_params
    params.require(:export_batch).permit(:name, :items_count)
  end
end
