class RecordingsController < ApplicationController
  before_action :require_artist

  def new
    @recording = Recording.new()
  end

  def create
    @recording = Recording.new(recording_params)
    @recording.artist_id = current_user.id
    if @recording.save
      redirect_to recordings_url
    else
      flash.now[:errors] = @recording.errors.full_messages
      render :new
    end
  end

  def edit
    @recording = Recording.find(params[:id])
  end

  def update
    @recording = Recording.find(params[:id])
    if @recording.update(recording_params)
      redirect_to recordings_url
    else
      flash.now[:errors] = @recording.errors.full_messages
      render :new
    end
  end

  def show
  end

  def index
  end

  

  private
  def recording_params
    params.require(:recording).permit(:artist_id, :recording_type, :title, :description)
  end

end
