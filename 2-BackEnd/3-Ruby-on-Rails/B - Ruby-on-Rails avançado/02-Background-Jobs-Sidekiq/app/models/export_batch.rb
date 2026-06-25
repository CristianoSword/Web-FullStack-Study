class ExportBatch < ApplicationRecord
  validates :name, presence: true
  validates :items_count, numericality: { greater_than_or_equal_to: 0 }
end
