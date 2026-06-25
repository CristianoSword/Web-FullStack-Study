ActiveRecord::Schema.define do
  create_table :export_batches, force: :cascade do |table|
    table.string :name
    table.string :status, default: "queued"
    table.integer :items_count, default: 0
  end
end
