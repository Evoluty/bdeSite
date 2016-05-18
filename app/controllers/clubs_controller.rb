class ClubsController < ApplicationController
  def index
    @title = "Les CLubs"
  	@clubs = Club.all()

  end

  def create
  end

  def delete
    id = params[:id]
  	Club.destroy(id)
    render :nothing => true
  end

  def update
    name = params[:name]
    description = params[:description]
    president = params[:president]
    photo = params[:photo]
    c = Club.find(params[:id])
    c.nom = name
    c.description = description
    c.president = president
    c.image=photo
    if (c.save())
      render :text => 1
    else
      render :text => 0
    end
  end

  def add

  end
end
