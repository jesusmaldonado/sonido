module Api
  class RecordingsController < ApiController
    before_action :require_signed_in

    def create
      recording = current_user.recordings.new(recording_params);
      if recording.save
        render json: recording
      else
        render json: recording.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @recordings = Recording.all
    end

    def show
      @recording = Recording.find(params[:id])
    end

    private
    def recording_params
      params.require(:recording).permit(:artist_id, :recording_type, :title, :description, :image)
    end


  end
end
