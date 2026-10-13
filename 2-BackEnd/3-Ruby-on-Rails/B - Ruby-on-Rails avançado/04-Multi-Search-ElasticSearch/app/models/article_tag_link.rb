class ArticleTagLink < ApplicationRecord
  belongs_to :article_document
  belongs_to :topic_tag

  validates :topic_tag_id, uniqueness: { scope: :article_document_id }
end
