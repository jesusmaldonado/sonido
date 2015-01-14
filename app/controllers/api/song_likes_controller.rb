module Api
  class SongLikesController < ApiController

    def create
      song_like = current_user.song_likes.new(song_params)
    end


    def song_params
      params.require(:song_like).permit(:song_id)
    end

  end
end
