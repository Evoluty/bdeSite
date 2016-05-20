class ClubsController < ApplicationController
  def index
    @title = "Les Clubs"
  	@clubs = Club.all().order("nom")
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
        render :json => {"image": c.image_club.url(:thumb), "id": c.id}
    else
        render :json => {"errors": c.errors.full_messages}
    end
  end
end
