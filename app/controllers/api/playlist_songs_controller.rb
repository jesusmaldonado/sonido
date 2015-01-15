module Api
  class PlaylistSongsController < ApiController

    def removePlaylistSong
      playlistSong = PlaylistSong.find_by(song_id: params[:song_id], playlist_id: params[:playlist_id])
      playlistSong.destroy
      render json: {}
    end

  end
end
