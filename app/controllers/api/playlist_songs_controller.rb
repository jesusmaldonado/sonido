module Api
  class PlaylistSongsController < ApiController

    def removePlaylistSong
      playlistSong = PlaylistSong.find_by(song_id: params[:song_id], playlist_id: params[:playlist_id])
      playlistSong.destroy
      render json: {}
    end

    def create
      playlistSong = PlaylistSong.new(song_id: params[:song_id], playlist_id: params[:playlist_id])
      if playlistSong.save
        render json: playlistSong
      else
        render json: playlistSong.errors.full_messages, status: :unprocessable_entity
      end
    end


  end
end
