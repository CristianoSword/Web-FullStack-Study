ActiveRecord::Schema.define do
  create_table :article_documents, force: :cascade do |table|
    table.string :title
    table.text :body
  end

  create_table :author_profiles, force: :cascade do |table|
    table.string :name
    table.text :bio
  end
end
