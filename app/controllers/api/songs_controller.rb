module Api
  class SongsController < ApiController
    before_action :require_signed_in

    def index
      @songs = Song.all
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

  end
end
