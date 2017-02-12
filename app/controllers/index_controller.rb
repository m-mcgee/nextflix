get '/' do
	if current_user 
  	erb :'index'
	else
		erb :'index', :layout => :nouser_layout
	end
end

get '/global_search' do
	binding.pry
end