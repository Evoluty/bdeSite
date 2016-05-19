class ClubsController < ApplicationController
  def index
    @title = "Les Clubs"
  	@clubs = Club.all()
  end

  def delete
    id = params[:id]
  	Club.destroy(id)
    render :nothing => true
  end

  def update
    id = params[:id]
    name_s = "name_" + id;
    description_s = "description_" + id
    president_s = "president_" + id
    photo_s = "image_club_" + id
    name = params[name_s]
    description = params[description_s]
    president = params[president_s]
    photo = params[photo_s]
    if (Club.exists?(id))
        c = Club.find(id)
    else
        c = Club.new
    end
    c.nom = name
    c.description = description
    c.president = president
    if (!photo.nil?)
      c.image_club = photo
    end
    if (c.save())
        render :text => c.image_club.url(:thumb)
    else
        render :text => 0
    end
  end
end
