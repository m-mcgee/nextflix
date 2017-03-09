get '/lists/:id/movies/search' do
  erb :'/movies/_search', layout: false, locals: {list: List.find(params[:id]), movies_found: false}
end

get '/movies/new' do
  title = fix_title_spaces(params["movie_search"])
  movies_found = search_for_movies(title)
  list = List.find(params[:list_id])
  erb :'/movies/_movies_found', locals: {movies_found: movies_found, list: list}, layout: false
end

post '/movies' do
  list = List.find(params[:list_id])
  movie_info = get_movie_info(params[:id])
  movie = Movie.find_or_initialize_by(guidebox_id: movie_info["id"])  
  attrs = update_movie_info(movie_info)
  movie.update_attributes(attrs)
  if movie.save
    get_providers(movie_info, movie.id)
    lm = ListMovie.find_or_create_by(list_id: list.id, movie_id: movie.id)
    if request.xhr?
      erb :'/lists/_show', locals: {list: list}, layout: false
    else
      erb :'/lists/show', locals: {list: list}
    end
  else
    puts "ERROR"
  end

end


post '/movies/pulse' do
  refresh_rate = Date.today - 5
  oldest_movies = Movie.order(updated_at: 'asc').where("updated_at < ?", refresh_rate).limit(2)
  oldest_movies.each do |movie| 
    movie_info = get_movie_info(movie.guidebox_id)
    attrs = update_movie_info(movie_info)
    movie.update_attributes(attrs)
    if movie.save
      check = get_providers(movie_info, movie.id)
    end
  end
  return true
end

get '/movies/:id' do
  movie = Movie.find(params[:id])
  erb :'/movies/_show', locals: {movie: movie}, layout: false
end



