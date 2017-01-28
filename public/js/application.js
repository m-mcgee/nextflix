$(document).ready(function() {

	$('body').on('mouseenter mouseleave', '.special.cards .image', function(){
			$(this).dimmer('toggle');
		});

	$('#movie-search-form').on("submit", function(event){
		event.preventDefault();
		var $form = $(this);
		var formData = $(this).serialize();
		var url = this.action;
		$.ajax({
			method: "GET",
			url: url,
			data: formData
		}).done(function(response){
			$('#searched-titles').remove();
			$form.after(response);
		})
	});

	$('body').on('submit', '#add-movie-form', function(event){
		event.preventDefault();
		var url = this.action;
		var formData = $(this).serialize();
		var $form = $(this)
		var movieGrid = this.closest('#searched-titles')
		$.ajax({
			method: "POST",
			url: url,
			data: formData
		}).done(function(response){
			$(movieGrid).slideUp("slow");
			$('#list-view').replaceWith(response);
		})
	});


	$('body').on('click', '.new-list', function(event){
		event.preventDefault();
		var url = $(this).attr('href');
		$.ajax({
			method: "GET",
			url: url
		}).done(function(response){
			$('.list-container').before(response);
		})
	});



});

$(window).load(function(){

	$('.owl-carousel').owlCarousel({
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


});


