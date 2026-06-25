ActiveRecord::Schema.define do
  create_table :tasks, force: :cascade do |table|
    table.string :title
    table.boolean :done, default: false
    table.timestamps
  end
end
