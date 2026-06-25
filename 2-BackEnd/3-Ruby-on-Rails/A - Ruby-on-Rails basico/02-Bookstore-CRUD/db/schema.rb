ActiveRecord::Schema.define do
  create_table :books, force: :cascade do |table|
    table.string :title
    table.string :author
    table.decimal :price
    table.timestamps
  end
end
