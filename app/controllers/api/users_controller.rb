module Api
  class UsersController < ApiController

      def create
        user = User.new(user_params)

        if user.save
          log_in!(user)
          redirect_to root_url
        else
          render json: user.errors.full_messages, status: :unprocessable_entity
        end
      end


      private
      def user_params
        params.require(:user).permit(:username, :email, :password, :session_token, :account_type)
      end
  end
end
