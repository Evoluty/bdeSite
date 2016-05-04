class DashboardController < ApplicationController
<<<<<<< HEAD
 	#before_action :authenticate_user!

	def index
  	end
=======
  def index
  	@title = "Administration - Tableau de bord"
  	@news = News.all()
  end
>>>>>>> c0177704951e3dc308927fd4f2285b545c4cb51d
end
