class ArticleDocument < ApplicationRecord
  include SearchableDocument

  belongs_to :author_profile
  has_many :article_tag_links, dependent: :destroy
  has_many :topic_tags, through: :article_tag_links

  enum :status, {
    draft: "draft",
    review: "review",
    published: "published",
    archived: "archived"
  }, validate: true

  validates :title, :slug, :body, :category, presence: true
  validates :slug, uniqueness: true
  validates :reading_time_minutes, numericality: { greater_than: 0 }
  validates :views_count, numericality: { greater_than_or_equal_to: 0 }

  scope :published_only, -> { where(status: :published) }
  scope :recent_first, -> { order(published_at: :desc, created_at: :desc) }

  def as_indexed_json(_options = {})
    {
      record_type: "article",
      title: title,
      body: body,
      summary: summary,
      author_name: author_profile.name,
      category: category,
      tags: topic_tags.pluck(:slug),
      status: status,
      published_at: published_at
    }
  end
end
