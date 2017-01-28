get '/lists/new' do
	binding.pry
	erb :'/lists/new'
end

post '/lists' do
	list = List.new(params[:list])
	if list.save
		erb :"/lists/show", locals: {list: list, movies_found: false}
	else
		@errors = list.errors
		erb :'/lists/new'
	end
end

get '/lists/:id' do
	list = List.find(params[:id])
	erb :'/lists/show', locals: {list: list}
end

get '/lists/:id/edit' do
	list = List.find(params[:id])
	erb :'/lists/edit', locals: {list: list}
end

put '/lists/:id' do
	list = List.find(params[:id])
	list.update(params[:list])
	if list.save
		redirect "/users/#{list.user_id}"
	else
		@errors = list.errors
		erb erb :'/lists/edit'
	end
end

delete '/lists/:id' do
	list = List.find(params[:id])
	user = list.user
	list.destroy
	redirect "/users/#{user.id}"
end

post '/list/:list_id/movies' do
  title = fix_title_spaces(params["movie_search"])
  movies_found = search_for_movies(title)

  erb :'/users/show', locals: {user: current_user, movies_found: movies_found}
end



