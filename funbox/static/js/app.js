(function($, document, window){

	$(document).ready(function(){

		$(".mCustomScrollbar").mCustomScrollbar({axis:"x"});
		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle
		$(".toggle-menu").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		$(".home-slider").flexslider({
			controlNav: true,
			directionNav: false,
			width: 100
		});

		$(".login-button").on("click",function(){
			$(".overlay").fadeIn();
			$(".auth-popup").toggleClass("active");
		});

		$(".close, .overlay").on("click",function(){
			$(".overlay").fadeOut();
			$(".popup").toggleClass("active");
		});

		initLightbox({
	    	selector : '.product-images a',
	    	overlay: true,
	    	closeButton: true,
	    	arrow: true
	    });


		$(document).keyup(function(e) {
			if( $(".popup").hasClass("active")){
		  		if (e.keyCode === 27) {
		  			$(".overlay").fadeOut();
					$(".popup").toggleClass("active");
		  		}
			}
		});

		// $('#myCarousel').carousel();

		$('.sideImg').height(($('#myCarousel').height()/2));
		$(window).resize(function() {
			$('.sideImg').height(($('#myCarousel').height()/2));
		});
	});

	$(window).load(function(){

	});

})(jQuery, document, window
