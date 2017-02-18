def current_user
	if session[:user]
  	User.find(session[:user])
  end
end

def current_username
  current_user.username
end

def get_updates
	new_lists = List.joins("JOIN user_followers ON lists.user_id = user_followers.user_id WHERE user_followers.follower_id = #{current_user.id}").distinct.order(:created_at).reverse_order
	new_movies = ListMovie.joins("JOIN lists ON lists.id = list_movies.list_id JOIN user_followers on lists.user_id = user_followers.user_id WHERE user_followers.follower_id = #{current_user.id}").distinct.includes(:movie).order(:created_at).reverse_order
	# new_follows = UserFollower.joins("JOIN")

	updates = []
	new_lists.each { |list| updates << list}
	new_movies.each { |lm| lm.created_at - lm.list.created_at > 15 ? updates << lm : next }
	updates = updates.sort_by {|u| u.created_at}.reverse
end