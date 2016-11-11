
# movie helpers ---------------------
def fix_title_spaces(title)
	title = title.strip

	if title.include? " "
		movie_split = title.split(' ')
		title = ""

		movie_split[0...-1].each do |word|
			title += word + "%252520" 
		end
		return title + movie_split[-1]
	end
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
