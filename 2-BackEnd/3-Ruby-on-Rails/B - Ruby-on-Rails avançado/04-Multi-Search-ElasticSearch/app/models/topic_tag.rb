class TopicTag < ApplicationRecord
  has_many :article_tag_links, dependent: :destroy
  has_many :article_documents, through: :article_tag_links

  validates :name, :slug, presence: true
  validates :slug, uniqueness: true
end
