class PlaylistSongsController < ApplicationController
  before_action :require_original_creator, only: [:destroy]

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
    @playlist_song.destroy
    flash[:errors] = [@playlist_song.song.title.to_s + " was deleted"]
    redirect_to :back
  end

  def playlistsong_params
    params.require(:playlist_song).permit(:playlist_id, :song_id)
  end

  private
  def require_original_creator
    # redirect_to :back unless @playlist_song.playlist_creator.id == current_user.id
  end
end
