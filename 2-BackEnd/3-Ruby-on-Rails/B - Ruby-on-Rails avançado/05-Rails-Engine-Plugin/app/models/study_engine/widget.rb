module StudyEngine
  class Widget < ApplicationRecord
    validates :name, :kind, presence: true
  end
end
