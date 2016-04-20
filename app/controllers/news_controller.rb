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
  	if request.post?
		title = params[:title]
		text = params[:text]
		a = News.new()
		a.text = text
		a.title = title
		a.save()
		redirect_to "/admin"
  	else
  		@title = "Ajouter une actualité"
  	end
  end

  def delete
  	id = params[:id]
  	News.destroy(id)
  	redirect_to "/admin"
  end
end
