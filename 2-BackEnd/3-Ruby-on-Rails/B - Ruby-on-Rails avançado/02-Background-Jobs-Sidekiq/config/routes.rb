Rails.application.routes.draw do
  resources :export_batches, only: [:create]
end
