module Api
  class PlaylistsController < ApiController
    before_action :require_signed_in

    def create
      playlist = current_user.playlists.new(playlist_params)
      if playlist.save
        render json: playlist
      else
        render json: playlist.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      playlist = Playlist.find(params[:id]);
      playlist.destroy
      render json: {}
    end

    private
    def playlist_params
      params.require(:playlist).permit(:title, :status)
    end
  end
end
