module Api
  class SongsController < ApiController
    before_action :require_signed_in

  

    def recent
      @songs = Song.all.includes(:recording, :artist).order("created_at DESC").limit(10)
    end

  end
end
