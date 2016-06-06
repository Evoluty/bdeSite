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
    @roles = Role.all()
    @jobs = Job.all().order(:M)
    @members = Member.includes(:role, :job)
    @clubs = Club.all()
    @partenaires = Partenaire.all()
    @user_role = Member.find(session[:user]).role_id
  end

  def logout
    session[:user] = nil
    redirect_to root_path
  end

end
