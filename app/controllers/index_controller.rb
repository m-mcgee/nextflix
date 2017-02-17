get '/' do
	if current_user 
		new_lists = List.joins("JOIN user_followers ON lists.user_id = user_followers.user_id WHERE user_followers.follower_id = #{current_user.id}").distinct.order(:created_at).reverse_order
		new_movies = ListMovie.joins("JOIN lists ON lists.id = list_movies.list_id JOIN user_followers on lists.user_id = user_followers.user_id WHERE user_followers.follower_id = #{current_user.id}").distinct.includes(:movie)
		#NEED TO ADD TIME STAMPS COLUMN TO ALL MIGRATIONS
  	new_follows = UserFollower.joins("JOIN")

  	erb :'index', locals: {new_lists: new_lists, new_movies: new_movies }
	else
		erb :'index', :layout => :nouser_layout
	end
end

get '/global_search' do
	search = params["q"]
	people = User.where('LOWER(email) LIKE LOWER(?)', "%#{search}%")
	lists = List.where('LOWER(name) LIKE LOWER(?)', "%#{search}%" )
	response = search_response(people, lists)

  return response.to_json
end