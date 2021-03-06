function carouselLoader(){
	$('.standard').owlCarousel({
    margin:10,
    responsiveClass:true,
    lazyLoad: true,
    slideBy: 1,
    loop: true,
    stagePadding: 50,
    nav: true,
    navText: ['<i class="chevron left icon"></i>', '<i class="chevron right icon"></i>'],
    dots: false,
    responsive:{
	    0:{
	        items:1,
	        nav:true
	    },
	    680:{
	        items:3,
	        nav:true
	    },
	    1138:{
	        items:5,
	        nav:true
	    },
	    1500:{
	    	items: 6,
	    	nav:true
	    }
    }
	});

$('.standard').on('change.owl.carousel', function(e) {
	var list = $(this).closest('.list-view');
	var backdrop = $(list).find('.backdrop');
	var backdropTitle = $(list).find('.backdrop.title');
	setTimeout(function() {
		var first_item = $(list).find('.active')[0];
		var backdrop_url = $(first_item).children().data('backdrop'); 
		var title = $(first_item).children().data('title');
		$(backdropTitle).text(title);
		$(backdrop).attr('src', backdrop_url)
	}, 100);
});


	$('.small').owlCarousel({
    margin:10,
    responsiveClass:true,
    center: true,
    lazyLoad: true,
    slideBy: 1,
    nav: true,
    navText: ['<i class="chevron left icon"></i>', '<i class="chevron right icon"></i>'],
    dots: false,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        680:{
            items:3,
            nav:true
        },
        1138:{
            items:5,
            nav:true
        },
        1500:{
        	items: 6,
        	nav:true
        }
    }
	});

	$('.small').on('change.owl.carousel', function(e) {
		var list = $(this).closest('.list-view');
		var backdrop = $(list).find('.backdrop');
		var backdropTitle = $(list).find('.backdrop.title');
		setTimeout(function() {
			var first_item = $(list).find('.center')[0];
			var backdrop_url = $(first_item).children().data('backdrop'); 
			var title = $(first_item).children().data('title');
			$(backdropTitle).text(title);
			$(backdrop).attr('src', backdrop_url)
		}, 100);
	});


	var updates = $('.update-list').owlCarousel({
		center: true,
		margin: 0,
    responsiveClass:true,
    lazyLoad: true,
    slideBy: 1,
    nav: true,
    navText: ['<i class="chevron left icon"></i>', '<i class="chevron right icon"></i>'],
    dots: false,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:4,
            nav:true
        }
    }
	});
	updates.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY<0) {
        updates.trigger('next.owl');
    } else {
        updates.trigger('prev.owl');
    }
    e.preventDefault();
	});

};


function resetSize(){
	$('body').removeClass('scrolling').css({'height': '100%'});
};


$(document).ready(function() {

	$('#new-list').click(function(e){
		e.preventDefault();
		$('#new-form').modal('show')
			.modal({
				onApprove : function(){
					$.ajax({
						method: "POST", 
						url: $('#create-form')[0].action,
						data: $('#create-form').serialize()
					}).done(function(response){
						if ($('.list-container.my-lists').children('.list').length < 1){
							$('.no-lists').replaceWith(response);
						} else {
							$('.list-container.my-lists').prepend(response);
						}
					})
				}
		});
	});


	$('body').on('click', '#new-movie', function(e){
		e.preventDefault();
		var description = $(this).parent().next();
		var url = this.href;
		$.ajax({
			method: "GET", 
			url: url
		}).done(function(response){
			description.append(response);
			$('#search-form').modal('show')
				.modal({
					onHide : function(){
						resetSize();
					}
				})
		})		
	});

	$('body').on("submit", '.movie-search-form', function(event){
		event.preventDefault();
		$('.search-button').addClass('loading');
		var $form = $(this);
		var formData = $(this).serialize();
		var url = this.action;
		var results = $('.search-results');
		$.ajax({
			method: "GET",
			url: url,
			data: formData
		}).done(function(response){
			$('.search-button').removeClass('loading');
			$('.search-results').replaceWith(response);
		})
	});


	$('body').on('mouseenter mouseleave', '.special.cards .image', function(){
		$(this).dimmer('toggle');
	});


	$('body').on('submit', '#add-to-list', function(event){
		event.preventDefault();
		var url = this.action;
		var formData = $(this).serialize();
		var list = "#list-" + this.children[1].value;
		$.ajax({
			method: "POST",
			url: url,
			data: formData
		}).done(function(response){
			$('.search-form').modal('hide');
			$(list).replaceWith(response);
			carouselLoader();
		})
	});

	$('body').on('submit', '.delete-list', function(e){
		e.preventDefault();
		var list = $(this).closest('.list');
		var url = this.action;
		var data = $(this).serialize();
		$('.confirm-delete').modal('show')
			.modal({
				onApprove: function(){
					$.ajax({
						method: "POST",
						url: url,
						data: data
					}).done(function(){
						list.remove();
					})
				}
			})
	});

  // $('body').on('click', '.owl-item', function(){
  //   n = $(this).index();
  //   $(this).closest('.owl-carousel').trigger('to.owl.carousel', n);
  // });

	$('body').on('click', '.movie-img', function(e){
		e.preventDefault();
		var movie = $(this);
		var url = this.href;
		$('#movie-show').remove();
		$.ajax({
			method: "GET", 
			url: url
		}).done(function(response){
			$('body').append(response);
			$('.ui.dropdown').dropdown();
			$('#movie-show').modal('show');
		})
	});

	$('body').on('click', '.dropdown-item', function(e){
		e.preventDefault();
		var form = this.children[0];
		var data = $(form).serialize();
		var url = form.action;
		var listName = form.dataset.listName;
		var list = "#list-" + form.children[1].value;
		$.ajax({
			method: "POST",
			url: url,
			data: data
		}).done(function(response){
			console.log(response);
			$('#movie-show').modal('hide');
			$(list).replaceWith(response);
			carouselLoader();
		})
	});

	$('body').on('click', '.remove-movie', function(e){
		e.preventDefault();
		var url = $(this).data('url');
		var list = $(this).closest('.owl-carousel');
		list.trigger('next.owl.carousel');
		$(this).closest('.owl-item').remove();
		$.ajax({
			method: "DELETE", 
			url: url
		}).done(function(response){
			// $(list).replaceWith(response);
			// carouselLoader();
		})
	})


	$('body').on('click', '#follow-user', function(e){
		e.preventDefault();
		var button = this;
		var user = $(this).data('user-id')
		var url = "/users/" + user + "/follow"
		$.ajax({
			method: "POST", 
			url: url
		}).done(function(response){
			$('.follower-count').text(JSON.parse(response).followers.toString() + ' Followers')
			$(button).removeClass('blue').addClass('basic').text('Following');
			$(button).attr('id', 'unfollow-user');
		})
	});

	$('body').on('click', '#unfollow-user', function(e){
		e.preventDefault();
		var button = this;
		var user = $(this).data('user-id')
		var url = "/users/" + user + "/unfollow"
		$.ajax({
			method: "POST", 
			url: url
		}).done(function(response){
			$('.follower-count').text(JSON.parse(response).followers.toString() + ' Followers')
			$(button).removeClass('basic').addClass('blue').text('Follow');
			$(button).attr('id', 'follow-user');
		})
	});


	$('.ui.search')
	  .search({
	    type          : 'category',
	    minCharacters : 3,
	    apiSettings   : {
	      onResponse: function(searchResponse) {
	        var
	          response = {
	            results : {}
	          }
	        ;
	        // translate response to work with search
	        $.each(searchResponse.items, function(index, item) {
	          var
	            name   = item.name || 'Unknown',
	            maxResults = 8
	          ;
	          if(index >= maxResults) {
	            return false;
	          }
	          // create new item type category
	          if(response.results[name] === undefined) {
	            response.results[name] = {
	              name    : name,
	              results : []
	            };
	          }
	          // add result to category
	          response.results[name].results.push({
	            title       : item.name,
	            description : item.description,
	            url         : item.html_url, 
	            image       : item.img,
	          });
	        });
	        return response;
	      },
	      url: '/global_search?q={query}'
	    }
	  })
	;

	$('.update-content').hide();

	$('body').on('click', '.update', function(e){
		e.preventDefault();
		url = $(this).children()[0].href;
		$.ajax({
			url: url,
			method: 'GET'
		}).done(function(response) {
			console.log(response)
			$('.update-content').show();
			$('.update-content > .list').replaceWith(response);
			carouselLoader();
			$('html, body').animate({scrollTop: $(".update-content").offset().top }, 1000);
		})
	});

	$('body').on('click', '.update-content > i', function(e){
		e.preventDefault();
		$(this).parent().hide();
		$("html, body").animate({ scrollTop: 0 }, "slow");
	})

	$('body').on('click', '.list-follow-buttons > .button > .button', function(e){
		e.preventDefault();
		var button = this.closest('.list-follow-buttons');
		var url = this.dataset.url
		$.ajax({
			url: url,
			method: 'POST'
		}).done(function(response){
			$(button).replaceWith(response);
		})
	})

	$('body').on('click', '.followed-lists .list-follow-buttons .button .button', function(){
		$(this).closest('.list').hide();
	})

	$('.list-stats').click(function() {
    $('html, body').animate({
        scrollTop: $(".list-container").offset().top
    }, 1000);
	});

	$('.follow-stats').click(function(){
		var url = this.dataset.url
		$.ajax({
			url: url,
			method: 'GET'
		}).done(function(response){
			$('.follow-stats-view').replaceWith(response);
			$('.follow-stats-view').modal('show')
		})
	});

	$('body').on('click', '.user-following', function() {
		var button = this;
		var url = this.dataset.url;
		var user = this.dataset.user;
		$.ajax({
			url: url,
			method: 'POST'
		}).done(function(response){
			$(button).removeClass('user-following inverted').addClass('user-follow');
			$(button.children[0]).text('Follow');
			$(button).attr('data-url', '/users/' + user + '/follow')
		})
	});

	$('body').on('click', '.user-follow', function() {
		var button = this;
		var url = this.dataset.url;
		var user = this.dataset.user;
		$.ajax({
			url: url,
			method: 'POST'
		}).done(function(response){
			$(button).removeClass('user-follow').addClass('user-following inverted');
			$(button.children[0]).text('Following');
			$(button).attr('data-url', '/users/' + user + '/unfollow');
		})
	});

	$("time.timeago").timeago();

	setInterval(function() {
	  $.ajax({
	    type: 'POST',
	    url: '/movies/pulse'
	  });
	}, 15000);
	

	var userNav = new jBox('Tooltip', {
		position: {
			x: 'left', 
			y: 'bottom'
		},
		target: '.secondary.menu' ,
		maxWidth: 400,
		title: 'Navigation', 
		pointer: 'left:10',
		content: "Use the navigation tabs to switch between lists you've created, lists you've favorited, and your newsfeed."
	})

	var globalSearch = new jBox('Tooltip', {
		position: {
			x: 'left', 
			y: 'bottom'
		},
		fixed: 'true',
		target: '.search' ,
		maxWidth: 400,
		title: 'Search', 
		pointer: 'left:10',
		content: "Use the search to find users or lists you may want to follow."
	})

	if ($('.new-user').length > 0) {
		setTimeout(function(){
			userNav.open();
		}, 1000)
		setTimeout(function(){
			userNav.close();
			globalSearch.open();
		}, 7000)
		setTimeout(function(){
			globalSearch.close();
		}, 14000)
	}




});


$(window).load(function(){
	carouselLoader();
	$('.pointing.menu .item').tab();
});


