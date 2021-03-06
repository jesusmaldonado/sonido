class SongLikesController < ApplicationController

  def create
    @song_like = current_user.song_likes.new(song_like_params)

    if @song_like.save
    else
      flash[:errors] = @song_like.errors.full_messages
    end
    redirect_to :back
  end

  def destroy
    @song_like = SongLike.find(params[:id])
    if @song_like.destroy
      flash[:errors] = ["Unliked " + @song_like.song.title]
    else
      flash[:errors] = ["Could not unlike " + @song_like.song.title.to_s]
    end
    redirect_to :back
  end

  def song_like_params
    params.require(:song_like).permit(:song_id)
  end

end
