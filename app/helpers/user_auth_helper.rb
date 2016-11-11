def current_user
	if session[:user]
  	User.find(session[:user])
  end
end

def current_username
  current_user.username
end


