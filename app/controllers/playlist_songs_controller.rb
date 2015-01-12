class PlaylistSongsController < ApplicationController

  def new
  end

  def create
    @playlistsong = PlaylistSong.new(playlistsong_params)
  end

  def destroy
    @playlistsong = PlaylistSong.find(params[:id])
  end

  def playlistsong_params
    params.require(:playlist_song).permit(:artist_id, :song_id)
  end
end
