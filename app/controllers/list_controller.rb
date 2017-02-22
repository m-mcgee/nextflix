get '/lists/new' do
	if request.xhr?
		erb :'/lists/_new', layout: false
	else
		erb :'/lists/new'
	end
end

post '/lists' do
	list = List.new(params[:list])
	if list.save
		if request.xhr?
			erb :"/lists/_show", locals: {list: list, movies_found: false}, layout: false
		else
			erb :"/lists/show", locals: {list: list, movies_found: false}
		end
	else
		@errors = list.errors
		erb :'/lists/new'
	end
end

get '/lists/:id' do
	list = List.find(params[:id])
	list_movies = list.list_movies
	if request.xhr?
		erb :'/lists/_show', locals: {list: list, list_movies: list_movies}, layout: false
	else
		erb :'/lists/show', locals: {list: list, list_movies: list_movies}
	end
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

delete '/list_movies/:id' do
  list_movie = ListMovie.find(params[:id])
  list = list_movie.list
  list_movie.destroy

  erb :"/lists/_show", locals: {list: list}, layout: false
end


