class SongsController < ApplicationController
  before_action :require_artist

  def new
    @song = Song.new()
  end

  def show
  end

  def create

  end

  def update

  end

  def destroy
  end

  def edit
  end

end
