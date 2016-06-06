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
	    sexe = params[:sexe]
	    email = params[:email]
	    role = params[:role]
	   	job_id = params[:job]
	   	if (job_id.to_i == 0)
	   		other_job = params[:other_job].split.map(&:capitalize).join(' ').titleize
	   		j = Job.new
	 		j.M = other_job
	 		j.F = other_job
	 		if (!j.save())
	 			render :json => {errors: j.errors.full_messages} and return
	 		end
	 		job_id = j.id
	 	end
	    photo = params[:photo]

	    m = Member.find(id)
	    m.name = name
	    m.firstname = firstname
	    m.sexe = sexe
	    m.email = email
	    m.role_id = role
	    m.job_id = job_id
	    if (!photo.nil?)
	      m.photo = photo
	    end

	    if (m.save())
	      render :json => {image: m.photo.url(:thumb), id: m.id, job: other_job, job_id: job_id.to_i}
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
