
# movie helpers ---------------------
def fix_title_spaces(title)
	title = title.strip
	title = title.gsub(/\s/, '%252520')
	return title
end

def search_for_movies(movie)
	url = "https://api-public.guidebox.com/v1.43/US/rKHydWl62j3jkxEJIrVzQsBv2hpdnQRT/search/movie/title/#{movie}/fuzzy"
	uri = URI(url)
	response = Net::HTTP.get(uri)
	titles_returned = JSON.parse(response)

	titles_returned
end

def get_movie_info(movie_id)
	url = "https://api-public.guidebox.com/v1.43/US/rKHydWl62j3jkxEJIrVzQsBv2hpdnQRT/movie/#{movie_id}"
	uri = URI(url)
	response = Net::HTTP.get(uri)
	movie_info = JSON.parse(response)
	searchNetflix(movie_info)
	movie_info
end

def get_providers(movie_info, movie_id)

	providers = movie_info["subscription_web_sources"]
	if providers.length > 0
		providers.each do |provider|
			provider = Provider.find_or_create_by(name: provider['source'], url: provider['link'], movie_id: movie_id)
			provider.save
		end
	end
end

def searchNetflix(movie_info)
	title = movie_info['title'].gsub(/[^\w\s]/,"").gsub(/\s/,'+')
	director = movie_info['directors'][0]['name'].gsub(/[^\w\s]/,"").gsub(/\s/,'+')
	#scrape this to pull netflix movies
	url =  "http://instantwatcher.com/search?content_type=1&source=1+2+3&q=#{title}+#{director}&year=#{movie_info['release_year']}"
	data = Nokogiri::HTML(open(url))
	binding.pry
end

def update_movie_info(movie_info)
	params = {title: movie_info["title"], year: movie_info["release_year"], overview: movie_info["overview"], img_url: movie_info["poster_400x570"], genre: ""}
	movie_info['genres'].each do |g|
		params[:genre] += g['title'] + " "
	end
	params
end















