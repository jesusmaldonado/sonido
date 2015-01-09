class SongsController < ApplicationController
  before_action :require_artist

  def new
    @song = Song.new()
  end

  def show
  end

  def create
    @song = Song.new(song_params)
    if @song.save
      redirect_to recordings_url
    else
      flash.now[:errors] = @song.errors.full_messages
      render :new
    end
  end

  def update

  end

  def destroy
  end

  def edit
  end

  def song_params
    params.require(:song).permit(:title, :recording_id, :lyrics)
  end

end
