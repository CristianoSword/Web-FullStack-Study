ActiveRecord::Schema[7.1].define(version: 20_260_630_120_000) do
  create_table :author_profiles, force: :cascade do |table|
    table.string :name, null: false
    table.string :slug, null: false
    table.string :headline
    table.text :bio
    table.string :location
    table.string :expertise_area
    table.integer :followers_count, default: 0, null: false
    table.timestamps
  end

  add_index :author_profiles, :slug, unique: true
  add_index :author_profiles, :expertise_area

  create_table :article_documents, force: :cascade do |table|
    table.references :author_profile, null: false, foreign_key: true
    table.string :title, null: false
    table.string :slug, null: false
    table.string :status, null: false, default: "draft"
    table.string :category, null: false
    table.text :body, null: false
    table.text :summary
    table.integer :reading_time_minutes, default: 1, null: false
    table.integer :views_count, default: 0, null: false
    table.datetime :published_at
    table.timestamps
  end

  add_index :article_documents, :slug, unique: true
  add_index :article_documents, :status
  add_index :article_documents, :category

  create_table :topic_tags, force: :cascade do |table|
    table.string :name, null: false
    table.string :slug, null: false
    table.timestamps
  end

  add_index :topic_tags, :slug, unique: true

  create_table :article_tag_links, force: :cascade do |table|
    table.references :article_document, null: false, foreign_key: true
    table.references :topic_tag, null: false, foreign_key: true
    table.timestamps
  end

  add_index :article_tag_links, [:article_document_id, :topic_tag_id], unique: true, name: "index_article_tag_links_on_article_and_tag"

  create_table :search_queries, force: :cascade do |table|
    table.string :query, null: false
    table.string :scope, null: false, default: "all"
    table.integer :results_count, default: 0, null: false
    table.string :filters_digest
    table.datetime :searched_at, null: false
    table.timestamps
  end

  add_index :search_queries, :searched_at
  add_index :search_queries, :scope
end
