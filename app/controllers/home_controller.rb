class HomeController < ApplicationController
	def index
		@title = "Accueil"
		@president = Member.where(poste: 'Présidente')
		@vicepres = Member.where(poste: 'Vice-Président')
		@secretaire = Member.where(poste: 'Secrétaire')
		@tresorier = Member.where(poste: 'Trésorière')
		@other_members = Member.where.not(poste: ['Présidente', 'Vice-Président', 'Secrétaire', 'Trésorière'])
	end
end
