module Api
  class SongsController < ApiController
    # before_action :require_signed_in

    def index
      @songs = Song.all
    end

    def create
      song = Song.new(song_params)
      if song.save
        render json: song
      else
        render json: song.errors.full_messages, status: :unprocessable_entity
      end
    end


    def show
      @song = Song.find(params[:id])
    end

    def destroy
      @song = Song.find(params[:id])
      @song.destroy!
      render json: {}
    end

    def recent
      @songs = Song.all.includes(:recording, :artist).order("created_at DESC").limit(10)
    end


    private
    def song_params
      params.require(:song).permit(:audio_song, :title, :recording_id, :lyrics)
    end

  end
end
