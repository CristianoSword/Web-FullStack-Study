ActiveRecord::Schema.define do
  create_table :api_users, force: :cascade do |table|
    table.string :email
    table.string :password_digest
  end
end
