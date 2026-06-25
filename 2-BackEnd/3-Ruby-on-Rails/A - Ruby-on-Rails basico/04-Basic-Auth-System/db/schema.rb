ActiveRecord::Schema.define do
  create_table :users, force: :cascade do |table|
    table.string :email
    table.string :password_digest
    table.timestamps
  end
end
