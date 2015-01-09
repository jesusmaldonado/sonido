class PlaylistsController < ApplicationController
    def new
      @playlist = Playlist.new()
    end

    def show
      @playlist = Playlist.find(params[:id])
      unless current_user.id == @playlist.id || playlist.status == "public"
        redirect_to :back
      else
        render :show
      end
    end

    def create
      @playlist = Playlist.new(playlist_params)
      @playlist.user_id = current_user.id
      if @playlist.save
        redirect_to playlists_url
      else
        flash.now[:errors] = @playlist.errors.full_messages
        render :new
      end
    end

    def edit
      @playlist = Playlist.find(params[:id])
    end

    def update
      @playlist = Playlist.find(params[:id])
    end

    def index
      @private_playlists = current_user.private_playlists
      @public_playlists = current_user.public_playlists
    end

    private
    def playlist_params
      params.require(:playlist).permit(:title, :status)
    end
end
