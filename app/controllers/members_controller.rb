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
      	params.require(:member).permit(:firstname, :name, :email, :password, :password_confirmation)
    end

    def update
    	id = params[:id]
	    name = params[:name]
	    firstname = params[:firstname]
	    email = params[:email]
	    role = params[:role]
	   	job = params[:job]
	    photo = params[:photo]

	    m = Member.find(id)
	    m.name = name
	    m.firstname = firstname
	    m.email = email
	    m.role = role
	    m.job = job
	    if (!photo.nil?)
	      m.photo = photo
	    end

	    if (m.save())
	      render :json => {image: m.photo.url(:thumb), id: m.id}
	    else
	      render :json => {errors: m.errors.full_messages}
	    end
    end

    def delete
    	id = params[:id]
    	Member.destroy(id)
    	render :nothing => true
    end
end
