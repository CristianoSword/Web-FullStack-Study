ActiveRecord::Schema.define do
  create_table :study_engine_widgets, force: :cascade do |table|
    table.string :name
    table.string :kind
  end
end
