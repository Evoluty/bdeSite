class DashboardController < ApplicationController
  before_action :authorize

  def current_user
    @current_user ||= Member.find(session[:user]) if session[:user]
  end
  helper_method :current_user

  def authorize
    redirect_to '/login' unless current_user
  end

  def index
  	@title = "Administration - Tableau de bord"
  	@news = News.all()
    @members = Member.all()
    @clubs = Club.all()
    @partenaires = Partenaire.all()
    @user_role = Member.find(session[:user]).role
  end

  def loggout
    session[:user] = nil
    redirect_to root_path
  end

end
