get '/movies/search' do
  erb :'/lists/_search', layout: false
end

get '/movies/new' do
  title = fix_title_spaces(params["movie_search"])
  movies_found = search_for_movies(title)
  list = List.find(params[:list_id])
  erb :'/lists/_movies_found', locals: {movies_found: movies_found, list: list}, layout: false
end

post '/movies' do
  movie_info = get_movie_info(params[:id])
  movie = Movie.find_or_initialize_by( guidebox_id: movie_info["id"], title: movie_info["title"], year: movie_info["release_year"], genre: movie_info["genres"][0]["title"], overview: movie_info["overview"], img_url: movie_info["poster_400x570"] )
  list = List.find(params[:list_id])

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


get '/movies/:id' do

end
