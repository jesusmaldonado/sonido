class PlaylistSongsController < ApplicationController

  def create
    @playlist_song = PlaylistSong.new(playlistsong_params)
    if @playlist_song.save
      redirect_to :back
    else
      flash[:errors] = @playlist_song.errors.full_messages
      redirect_to :back
    end
  end

  def destroy
    @playlist_song = PlaylistSong.find(params[:id])
    if @playlist_song.save
    else
      flash[:errors] = @playlist_song.errors.full_messages
    end
    redirect_to :back
  end

  def playlistsong_params
    params.require(:playlist_song).permit(:playlist_id, :song_id)
  end
end
