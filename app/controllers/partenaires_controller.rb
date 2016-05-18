class PartenairesController < ApplicationController
  def index
    @title = "Les Partenaires"
    @partenaires = Partenaire.all()
  end


  def delete
    id = params[:id]
    Partenaire.destroy(id)
    render :nothing => true
  end

  def update
    name = params[:nom]
    description = params[:description]
    typePartenaire = params[:typePartenaire]
    adresse = params[:adresse]

    c = Partenaire.find(params[:id])
    c.nom = name
    c.description = description
    c.typePartenaire = typePartenaire
    c.adresse=adresse

    if (c.save())
      render :text => 1
    else
      render :text => 0
    end
  end

  def create
    name = params[:nom]
    description = params[:description]
    typePartenaire = params[:typePartenaire]
    adresse = params[:adresse]

    c = Partenaire.new()
    c.nom = name
    c.description = description
    c.typePartenaire = typePartenaire
    c.adresse=adresse

    if (c.save())
      render :text => 1
    else
      render :text => 0
    end
  end


end
