ActiveRecord::Schema.define do
  create_table :notifications, force: :cascade do |table|
    table.string :title
    table.text :body
    table.boolean :read, default: false
  end
end
