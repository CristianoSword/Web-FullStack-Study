class BatchDispatcher
  def dispatch(batch)
    ExportBatchJob.perform_later(batch.id)
  end
end
