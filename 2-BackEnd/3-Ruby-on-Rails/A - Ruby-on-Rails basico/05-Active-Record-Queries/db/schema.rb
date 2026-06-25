ActiveRecord::Schema.define do
  create_table :authors, force: :cascade do |table|
    table.string :name
  end

  create_table :articles, force: :cascade do |table|
    table.string :title
    table.integer :author_id
    table.integer :views, default: 0
  end
end
