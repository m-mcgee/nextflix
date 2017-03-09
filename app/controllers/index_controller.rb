get '/' do
	if current_user 
		redirect "/users/#{current_user.id}"
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