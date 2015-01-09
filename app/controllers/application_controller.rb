class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def log_in!(user)
    session[:token] = user.reset_session_token!
    @current_user = user
    redirect_to user_url(user)
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def signed_in?
    !!current_user
  end

  def log_out!(user)
    user.reset_session_token!
    session[:token] = nil
    redirect_to new_session_url
  end

  def require_signed_in
    redirect_to new_session_url unless signed_in?
  end

  def require_artist
    redirect_to :back unless current_user.account_type == "artist"
  end
end
