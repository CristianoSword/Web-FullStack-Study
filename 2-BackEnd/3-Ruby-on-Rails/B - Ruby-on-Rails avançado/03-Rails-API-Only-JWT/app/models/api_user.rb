class ApiUser < ApplicationRecord
  validates :email, presence: true
end
