class V1::UsersController < ApplicationController

  before_action :authenticate_user!, except: [:create, :reset_password]
  before_action :authorize_user!, except: [:create, :reset_password]

  def index
    render json: User.order(:id)
  end

  def new
    user = User.new user_params
  end

  # def create
  #   question = Question.new question_params
  #   question.user = current_user
  #   question.save!
  #   render json: {id: question.id}
  # end

  def create
   user = User.new user_params
    user.save!
     render json: {
       jwt: encode_token({
           id: user.id,
           is_admin: user.is_admin,
           first_name: user.first_name,
           last_name: user.last_name,
           full_name: user.full_name
       })
     }
   # else
   #    errors = errors.record.errors.map do |field, message|
   #      {
   #        type: errors.class.to_s,
   #        record_type: errors.record.class.to_s,
   #        field: field,
   #        message: message
   #      }
   #    end
   #    render(
   #      json: { errors: errors }, status: :unprocessable_entity
   #    )
   # end
  end

  def reset_password
    user = User.find(params[:id])

    UserMailer
        .notify_user(user)
        .deliver_now
      render(
        json: { message: 'Email Sent' }, status: :sucess
      )
  end

  private
  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def authorize_user!
    unless can?(:crud, @question)
      flash[:alert] = 'Access Denied!'
      render(
        json: { errors: [{type: "Unauthorized"}] }, status: :unauthorized
      )
    end
  end
end
