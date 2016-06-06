class HomeController < ApplicationController
	def index
		@title = "Accueil"
		@members = Member.includes(:job).where.not(job: nil).order(:job_id)
	end
end
