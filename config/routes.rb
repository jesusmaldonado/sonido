Rails.application.routes.draw do
  resources :users
  resources :recordings
  resources :songs
  resources :song_likes
  resources :playlists
  resources :playlist_songs
  resource :session, only: [:create, :destroy, :new]
  root to: "users#new"

  namespace :api, defaults: { format: :json } do
      resources :recordings
      resources :songs
      resources :song_likes
      resources :playlists
      resources :playlist_songs
  end
end
