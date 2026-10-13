class SearchQuery < ApplicationRecord
  validates :query, :scope, :searched_at, presence: true
  validates :results_count, numericality: { greater_than_or_equal_to: 0 }
end
