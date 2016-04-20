class DashboardController < ApplicationController
  def index
  	@title = "Administration - Tableau de bord"
  	@news = News.all()
  end
end
