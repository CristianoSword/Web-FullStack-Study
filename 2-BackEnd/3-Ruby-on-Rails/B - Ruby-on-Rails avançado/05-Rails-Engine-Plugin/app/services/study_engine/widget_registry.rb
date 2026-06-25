module StudyEngine
  class WidgetRegistry
    def list
      Widget.all
    end

    def register(attributes)
      Widget.create!(attributes)
    end
  end
end
