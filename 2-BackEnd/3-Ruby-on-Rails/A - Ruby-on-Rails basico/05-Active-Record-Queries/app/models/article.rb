class Article < ApplicationRecord
  belongs_to :author
  validates :title, presence: true
  validates :views, numericality: { greater_than_or_equal_to: 0 }
end
