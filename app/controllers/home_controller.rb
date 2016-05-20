class HomeController < ApplicationController
	def index
		@title = "Accueil"
		@president = Member.where(job: 'Présidente')
		@vicepres = Member.where(job: 'Vice-Président')
		@secretaire = Member.where(job: 'Secrétaire')
		@tresorier = Member.where(job: 'Trésorière')
		@vicetresorier = Member.where(job: 'Vice-Trésorier')
		@other_members = Member.where.not(job: ['Présidente', 'Vice-Président', 'Secrétaire', 'Trésorière', ""])
	end
end
