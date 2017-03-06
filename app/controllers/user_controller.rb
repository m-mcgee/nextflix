
get '/users/new' do
  erb :'/users/new'
end

post '/users' do
  user = User.new(params[:user])

  if user.save
    @user = user
    session[:user] = user.id
    redirect '/'
  elsif user.errors
    @errors = user.errors
    erb :'/users/new'
  end
end

get '/login' do
  session['oauth'] = Koala::Facebook::OAuth.new(ENV['FB_APP_ID'], ENV['FB_APP_SECRET'], "#{request.base_url}/call_back")
  redirect session['oauth'].url_for_oauth_code({scope: 'email, user_friends'})
  # erb :'login'
end

get '/call_back' do 
  begin
    session['access_token'] = session['oauth'].get_access_token(params[:code])
    @graph ||= Koala::Facebook::API.new(session['access_token'])
    user_info = @graph.get_object('me', { fields: 'id,name,email' })
    photo = @graph.get_picture('me', options = {'type': 'large'})
    friends = @graph.get_connections("me", "friends", api_version:'v2.0')
    user = User.find_or_create_by(fb_id: user_info['id'])
    user.update_attributes(username: user_info['name'], email: user_info['email'], img: photo )
    if user.save
      session[:user] = user.id
      redirect "/users/#{session[:user]}" 
    end
  rescue
    redirect '/?error=user_denied'
  end
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

get '/users/:id/followers' do
  erb :'/users/_followers', locals: {user: User.find(params[:id])}, layout: false
end

get '/users/:id/following' do
  erb :'/users/_following', locals: {user: User.find(params[:id])}, layout: false
end
