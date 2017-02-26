
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
	movie_info
end

def update_movie_info(movie_info)
	params = {title: movie_info["title"], year: movie_info["release_year"], overview: movie_info["overview"], img_url: movie_info["poster_400x570"], genre: ""}
	
	url = "https://api.themoviedb.org/3/find/#{movie_info['imdb']}?api_key=f5cb893b797de0d40de812636384ca68&language=en-US&external_source=imdb_id&append_to_response=images"
	uri = URI(url)
	response = Net::HTTP.get(uri)
	tmdb = JSON.parse(response)

	movie_info['genres'].each do |g|
		params[:genre] += g['title'] + " "
	end
	params
end

def get_providers(movie_info, movie_id)
	old_links = Provider.where(movie_id: movie_id)
	old_links.each {|p| p.destroy}

	providers = movie_info["subscription_web_sources"]
	if providers.length > 0
		providers.each do |p|
			provider = Provider.find_or_initialize_by(name: p['source'], movie_id: movie_id)
			provider.update_attributes(url: p['link'])
			provider.save
		end
	end
	search_netflix(movie_info, movie_id)
end

def search_netflix(movie_info, movie_id)
	netflix_stream = scrape_instant_watcher(movie_info)
	if netflix_stream
		provider = Provider.create(name: "netflix", movie_id: movie_id, url: netflix_stream)
	end
end

def scrape_instant_watcher(movie_info)
	title = movie_info['title'].gsub(/\s/,'+')
	url =  "http://instantwatcher.com/search?content_type=1&source=1+2+3&q=#{title}&year=#{movie_info['release_year']}"
	data = Nokogiri::HTML(open(url))
	netflix_title = data.at_css('.netflix-title')
	if !netflix_title.nil? && verify_title(movie_info, netflix_title)
		netflix_stream = netflix_title.at_css('.webpage').attributes['href'].value
		netflix_stream
	end
end

def verify_title(movie_info, netflix_title)
	if movie_info['directors'][0]['name'] == netflix_title.at_css('.directors').text[5..-1] || (movie_info['duration']/60 - netflix_title.at_css('.runtime').text[0..2].to_i).abs < 2 
		return true
	end
	return false
end






