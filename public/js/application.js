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
            nav:false
        },
        1000:{
            items:5,
            nav:true,
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
            nav:false
        },
        1000:{
            items:5,
            nav:true,
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


});


$(window).load(function(){
	carouselLoader();
});


