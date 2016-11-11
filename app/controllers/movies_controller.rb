get '/movies/new' do
  title = fix_title_spaces(params["movie_search"])
  movies_found = search_for_movies(title)

  erb :'/lists/_movies_found', locals: {movies_found: movies_found}, layout: false
end

post '/movies' do
  movie_info = get_movie_info(params[:id])

  binding.pry
end
