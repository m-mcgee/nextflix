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




});

$(window).load(function(){

	$('.owl-carousel').owlCarousel({
	    margin:10,
	    responsiveClass:true,
	    lazyLoad: true,
	    loop:true,
	    stagePadding: 50,
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


