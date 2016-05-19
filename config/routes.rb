Rails.application.routes.draw do

  # Members bde
  get '/login' => 'members#sign_in'
  post '/members/login'
  post '/members/create'

  # Admin
  get '/admin' => 'dashboard#index'

  # Clubs
  get '/clubs' => 'clubs#index'
  get '/clubs/create' => 'clubs#create'
  get '/clubs/delete/:id' => 'clubs#delete'
  post '/clubs/update' => 'clubs#update'
  post '/clubs/add' => 'clubs#add'

  # News
  get '/news' => 'news#index'
  get '/news/create' => 'news#create'
  post '/news/add' => 'news#add'
  get '/news/delete/:id' => 'news#delete'
  get '/news/update/:id' => 'news#update'

  # Partenaires
  get '/partenaires' => 'partenaires#index'
  get '/partenaires/create' => 'partenaires#create'
  post '/partenaires/add' => 'partenaires#add'
  get '/partenaires/delete/:id' => 'partenaires#delete'
  get '/partenaires/update/:id' => 'partenaires#update'

  # Contact
  get '/contact' => 'contact#index'
  post '/contact/send' => 'contact#sendMail'

  # get 'home/index'
  root 'home#index'  

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
