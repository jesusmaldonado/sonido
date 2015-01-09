Rails.application.routes.draw do
  resources :users
  resources :recordings
  resources :songs
  resources :playlists
  resource :session, only: [:create, :destroy, :new]
  root to: "users#new"
end
