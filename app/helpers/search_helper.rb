def search_response(people, lists)
  peoplearray = []
  listarray = []

  people.each do |p|
  	peoplearray << {"title":"#{p.username}", "url":"/users/#{p.id}", "description":"#{p.lists.count} lists", "image":"#{p.img}"}
  end

  lists.each do |l|
  	listarray << {"title":"#{l.name}", "url":"/lists/#{l.id}", "description":"#{l.user.username}"}
  end

  grouped = {
    "results": {
      "category1": {
        "name": "Users",
        "results": peoplearray
      },
      "category2": {
        "name": "Lists",
        "results": listarray
      }
    }
    # "action": {
    #   "url": "/path/to/results",
    #   "text": "View all 202 results"
    # }
  }
  return grouped
end