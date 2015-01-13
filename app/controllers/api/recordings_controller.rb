module Api
  class RecordingsController < ApiController



    private
    def recording_params
      params.require(:recording).permit(:artist_id, :recording_type, :title, :description)
    end


  end
end
