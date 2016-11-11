get '/movies/new' do
  title = fix_title_spaces(params["movie-search"])
  movies_found = search_for_movies(title)

  erb :'_search', locals: {movies_found: movies_found}
end