module StudyEngine
  class WidgetsController < ActionController::Base
    def index
      @widgets = WidgetRegistry.new.list
    rescue StandardError
      @widgets = []
    end
  end
end
