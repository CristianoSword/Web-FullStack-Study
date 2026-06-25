module StudyEngine
  class WidgetsController < ActionController::Base
    def index
      @widgets = WidgetRegistry.new.list
    end
  end
end
