
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
    redirect '/'
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
  user = User.find(params[:id])
  lists = List.where(user_id: user.id).order(created_at: :desc)
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


post '/users/:id/follow' do
  UserFollower.create(user_id: params[:id], follower_id: current_user.id)
  follower_count = User.find(params[:id]).followers.count
  {'followers': follower_count, 'url': "/users/#{params[:id]}/unfollow" }.to_json
end

post '/users/:id/unfollow' do
  UserFollower.find_by(user_id: params[:id], follower_id: current_user.id).destroy
  follower_count = User.find(params[:id]).followers.count
  {'followers': follower_count }.to_json
end


