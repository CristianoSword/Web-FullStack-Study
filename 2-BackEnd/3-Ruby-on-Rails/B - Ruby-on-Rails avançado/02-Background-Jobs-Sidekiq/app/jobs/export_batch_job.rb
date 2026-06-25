class ExportBatchJob < ApplicationJob
  queue_as :default

  def perform(batch_id)
    batch = ExportBatch.find(batch_id)
    batch.update!(status: "processing")
  rescue ActiveRecord::RecordNotFound
    nil
  end
end
