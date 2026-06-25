class Notification < ApplicationRecord
  validates :title, :body, presence: true
end
