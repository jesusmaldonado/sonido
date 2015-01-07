Rails.application.routes.draw do
  resources :users
  resources :albums
  resource :session, only: [:create, :destroy, :new]
  root to: "users#new"
end
