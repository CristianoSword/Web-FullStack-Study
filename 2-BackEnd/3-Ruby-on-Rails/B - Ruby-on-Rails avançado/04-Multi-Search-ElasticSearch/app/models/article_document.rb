class ArticleDocument < ApplicationRecord
  validates :title, presence: true
end
