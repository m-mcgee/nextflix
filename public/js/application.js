$(document).ready(function() {

	$('.special.cards .image').dimmer({
	  on: 'hover'
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
