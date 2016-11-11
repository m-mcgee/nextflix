
get '/users/new' do
  erb :'/users/new'
end

post '/users' do
  user = User.new(params[:user])

  if user.save
    @user = user
    session[:user] = user.id
    erb :'index'
  elsif user.errors
    @errors = user.errors
    erb :'/users/new'
  end
end

get '/login' do
  erb :'login'
end

post '/login' do
  user = User.find_by_email(params[:email])
  if user && user.auth(params[:password])
    session[:user] = user.id
    erb :'index'
  else
    @errors = "Invalid Username/Password Combination"
    erb :'login'
  end
end

get '/logout' do
  session.clear
  redirect '/'
end

get '/users/:id' do
  user = User.find(current_user.id)
  lists = List.where(user_id: current_user.id)

  erb :'/users/show', locals: {user: user, lists: lists, movies_found: false}
end


post '/users/:id' do

  if request.xhr?
    movie_id = params.keys[0]
    movie_info = get_movie_info(movie_id)


  else
    puts "nope<<<<<<<<<<<"
  end
end

post '/list/:list_id/movies' do
  title = fix_title_spaces(params["movie-search"])
  movies_found = search_for_movies(title)

  erb :'/users/show', locals: {user: current_user, movies_found: movies_found}
end
