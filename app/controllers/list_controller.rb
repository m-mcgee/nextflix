get '/lists/new' do
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