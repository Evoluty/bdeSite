class ClubsController < ApplicationController
  def index
  	@clubs = Club.all
  end

  def update
  	id_club = params[:id]
  	club = Club.find(id_club)
  	club.nom = params[:nom]
  	club.description = params[:description]
  	club.image_club = params[:image_club]
  	club.save()
  end
end
