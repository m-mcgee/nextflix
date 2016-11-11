$(document).ready(function() {

	// $('.special.cards .image').dimmer({
	//   on: 'hover'
	// });

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

	$('.addlist').on('click', function(e){
		e.preventDefault();
		var movie_id = this.parentElement.dataset.id
		var route = this.parentElement.dataset.url
		// debugger;

	   $.ajax({
	      method: "POST",
	      url: route,
	      data: movie_id
	    })

	   // .done(function(monkey){
	   //    $('#post-list > li').prepend(monkey)

	   //  });

	});

});
