class DashboardController < ApplicationController
 #before_action :authenticate_user!

  def index
  	@title = "Administration - Tableau de bord"
  	@news = News.all()
  end
end