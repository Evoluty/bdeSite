class HomeController < ApplicationController
	def index
		@title = "Accueil"
		@bde = Member.all
	end
end
