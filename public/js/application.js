function carouselLoader(){
	$('.standard').owlCarousel({
    margin:10,
    responsiveClass:true,
    lazyLoad: true,
    slideBy: 3,
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
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true
        },
        1500:{
        	items: 7,
        	nav:true
        }
    }
	});
		$('.small').owlCarousel({
    margin:10,
    responsiveClass:true,
    lazyLoad: true,
    slideBy: 3,
    nav: true,
    navText: ['<i class="chevron left icon"></i>', '<i class="chevron right icon"></i>'],
    dots: false,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true
        },
        1500:{
        	items: 7,
        	nav:true
        }
    }
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
						$('.list-container').before(response);
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
		var results = $('.search-results')
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

	$('body').on('click', '.movie-img', function(e){
		e.preventDefault();
		var movie = $(this);
		var url = this.href;
		$.ajax({
			method: "GET", 
			url: url
		}).done(function(response){
			$(movie).append(response);
			$('#movie-show').modal('show');
			$('.ui.dropdown').dropdown()
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
		var list = $(this).closest('.list');
		$.ajax({
			method: "DELETE", 
			url: url
		}).done(function(response){
			$(list).replaceWith(response);
			carouselLoader();
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
	            url         : item.html_url
	          });
	        });
	        return response;
	      },
	      url: '/global_search?q={query}'
	    }
	  })
	;



});


$(window).load(function(){
	carouselLoader();
});


