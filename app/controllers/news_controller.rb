class NewsController < ApplicationController
  def index
  	@title = "News"
  	@page = 1
  	page = params[:page]
  	if !page.nil?
  		@page = page.to_i
  	end
    nb_news_per_page = 2 
  	@news=News.paginate(:page => @page, :per_page => nb_news_per_page)
  end

  def create
  	@title = "Ajouter une actualité"
  end

  def add
    title = params[:title]
    text = params[:text]
    a = News.new()
    a.text = text
    a.title = title
    if (a.save())
      redirect_to "/admin", notice: "L'actualité a bien été ajoutée !"
    else
      redirect_to "/news/create", alert: "Tous les champs doivent être remplis !"
    end
  end

  def delete
  	id = params[:id]
  	News.destroy(id)
  	redirect_to "/admin", notice: "L'actualité a bien été supprimée !"
  end
end
