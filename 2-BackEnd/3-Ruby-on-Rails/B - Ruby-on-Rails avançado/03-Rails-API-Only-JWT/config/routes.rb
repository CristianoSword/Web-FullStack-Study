Rails.application.routes.draw do
  post "/session", to: "sessions#create"
  get "/profile", to: "profile#show"
end
