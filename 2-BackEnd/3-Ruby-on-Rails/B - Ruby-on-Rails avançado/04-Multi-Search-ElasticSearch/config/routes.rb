Rails.application.routes.draw do
  defaults format: :json do
    get "/health", to: proc { [200, {}, [{ status: "ok" }.to_json]] }
    get "/search", to: "search#index"

    namespace :admin do
      post "/search/reindex", to: "search_indexes#create"
      post "/search/rebuild", to: "search_indexes#rebuild"
    end
  end
end
