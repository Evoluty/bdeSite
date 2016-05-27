class PartenairesController < ApplicationController
  def index
    @title = "Les Partenaires"
    @parrains = Partenaire.where(typePartenaire: 'Parrain');
    @partenaires = Partenaire.where(typePartenaire: 'Partenaire');
    @avantages = Partenaire.where(typePartenaire: 'Avantage');
  end

  def delete
    id = params[:id]
    Partenaire.destroy(id)
    render :nothing => true
  end

  def update
    id = params[:id]
    name = params[:nom]
    description = params[:description]
    typePartenaire = params[:typePartenaire]
    adresse = params[:adresse]
    logo = params[:logo]

    if (Partenaire.exists?(id))
        p = Partenaire.find(id)
    else
        p = Partenaire.new
    end
    p.nom = name
    p.description = description
    p.typePartenaire = typePartenaire
    p.adresse = adresse
    if (!logo.nil?)
      p.logo = logo
    end

    if (p.save())
      render :json => {image: p.logo.url(:thumb), id: p.id}
    else
      render :json => {errors: p.errors.full_messages}
    end
  end
end
