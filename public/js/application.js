function carouselLoader(){
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
};


function resetHeight(){
	$('body').removeClass('dimmable scrolling dimmed').css({'height': '100%'});
	$('#search-form').remove();
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
					onDeny : function(){
						resetHeight();
					}, 
					onHide : function(){
						resetHeight();
					}
				})
		})		
	})

	$('body').on("submit", '#movie-search-form', function(event){
		event.preventDefault();
		var $form = $(this);
		var formData = $(this).serialize();
		var url = this.action;
		var results = $('#search-results')
		$.ajax({
			method: "GET",
			url: url,
			data: formData
		}).done(function(response){
			results.replaceWith(response);
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
			$('#search-form').modal('hide');
			$(list).replaceWith(response);
			resetHeight();
			carouselLoader();
		})
	});


});


$(window).load(function(){
	carouselLoader();
});


