class MembersController < ApplicationController
	def new
    	@member = Member.new 
  	end

	def create
		@member = Member.new(member_params)
		if @member.save
		  flash[:notice] = "Inscription validée"
		else
		  flash[:alert] = "Champs invalide"
		end
		redirect_to "/admin"
	end

	def sign_in
		unless !session[:user]
			redirect_to "/admin"
		end
	end

	def login
		currentUser = Member.find_by(email: params[:email])
		if currentUser && currentUser.authenticate(params[:password])
			session[:user] = currentUser.id
		end
		redirect_to "/admin"
	end

	def member_params
      params.require(:member).permit(:firstname, :email, :password, :password_confirmation)
    end
end
