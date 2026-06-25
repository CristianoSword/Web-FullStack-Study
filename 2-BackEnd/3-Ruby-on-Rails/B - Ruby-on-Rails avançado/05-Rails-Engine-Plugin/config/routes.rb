StudyEngine::Engine.routes.draw do
  resources :widgets, only: [:index]
end
