Rails.application.routes.draw do
  resources :users
  resources :recordings
  resources :songs
  resource :session, only: [:create, :destroy, :new]
  root to: "users#new"
end
