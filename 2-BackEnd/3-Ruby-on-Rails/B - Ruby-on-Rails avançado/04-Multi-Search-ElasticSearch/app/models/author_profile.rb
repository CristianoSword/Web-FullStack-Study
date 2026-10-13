class AuthorProfile < ApplicationRecord
  include SearchableDocument

  has_many :article_documents, dependent: :destroy

  validates :name, :slug, presence: true
  validates :slug, uniqueness: true
  validates :followers_count, numericality: { greater_than_or_equal_to: 0 }

  def as_indexed_json(_options = {})
    {
      record_type: "author",
      title: name,
      body: bio,
      summary: headline,
      author_name: name,
      category: expertise_area,
      tags: article_documents.limit(8).joins(:topic_tags).pluck("topic_tags.slug").uniq,
      status: "active",
      published_at: created_at
    }
  end
end
