Rails.application.routes.draw do
  resources :users
  resources :recordings
  resources :songs
  resources :song_likes
  resources :playlists
  resources :playlist_songs
  resource :session, only: [:create, :destroy, :new]
  root to: "static_pages#root"



  namespace :api, defaults: { format: :json } do
      resource :session, only: [:show, :create, :destroy]
      resources :users, only: [:index, :show, :create] do
        collection do
          get :current
        end
      end
      resources :recordings
      resources :songs do
        collection do
          get :recent
        end
      end


      resources :song_likes do
        collection do
          delete :removeSongLike
        end
      end
      resources :playlists
      resources :playlist_songs do
        collection do
          delete :removePlaylistSong
        end
      end
  end
end
