class SessionsController < ApplicationController
  before_action :require_signed_in, except: [:new, :create]

  def new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      log_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Sorry, incorrect username, password or email :["]
      render :new
    end
  end

  def destroy
    @user = User.find_by(session_token: session[:token])
    log_out!(@user)
  end
  

end
