module Api
  class SongLikesController < ApiController

    def create
      song_like = current_user.song_likes.new(song_params)

      if song_like.save
        render json: song_like
      else
        render json: song_like.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      SongLike.find(params[:id]).destroy
      render json: {}
    end

    def song_params
      params.require(:song_like).permit(:song_id)
    end

  end
end
