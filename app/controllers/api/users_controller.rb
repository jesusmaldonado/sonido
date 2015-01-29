module Api
  class UsersController < ApiController

      def index
        @users = User.all
      end


      def create
        user = User.new(user_params)

        if user.save
          render json: user
        else
          render json: user.errors.full_messages, status: :unprocessable_entity
        end
      end

      def show
        @user = User.includes(:recordings, :playlists).find(params[:id])
      end

      private
      def user_params
        params.require(:user).permit(:username, :email, :password, :session_token, :account_type, :id, :avatar)
      end
  end
end
