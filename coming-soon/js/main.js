(function(){
	'use strict';

	//Make section height equal to window height
	function sectionHeight(){
		$('section').css('min-height', $(window).height());
	};
	sectionHeight();

	//Countdown Init
	$('.countdown-timer').downCount({
        date: '08/15/2015 12:00:00'
    });

    //Text rotator init
    $('.rotate').textrotator({
	    animation: "fade",
	    speed: 4000
  	});

	//Countdown split mask
	function splitMask(){
		var wWidth = $(window).width(),
			dHeight = $(document).height(),
			countdownSection = $('#countdown'),
			homeSection = $('#home');

		countdownSection.css({
	    	clip: 'rect(0 ' + wWidth + 'px ' + dHeight + 'px ' + (wWidth / 2) + 'px)'
		});

		countdownSection.on('click', function(){
			$(this).css({
	    		clip: 'rect(0 ' + wWidth + 'px ' + dHeight + 'px ' + (wWidth / 17) + 'px)'
			});
			countdownSection.addClass('active').removeClass('inactive');
			homeSection.addClass('inactive').removeClass('active');
		});

		homeSection.on('click', function(){
			countdownSection.css({
	    		clip: 'rect(0 ' + wWidth + 'px ' + dHeight + 'px ' + (wWidth - (wWidth / 17)) + 'px)'
			});
			countdownSection.addClass('inactive').removeClass('active');
			homeSection.addClass('active').removeClass('inactive');
		});
	};
	splitMask();

  	//Slideshow background init
	if ( $(document).find('.slideshow-background').length ) {
		$(".slideshow-background #home, .slideshow-background #countdown").backstretch([
			"img/bg1.jpg",
			"img/bg2.jpg"
		], {
			fade: 1000,
			duration: 4000
		});
	};

	//Subscribe and contact button
	var docElem = window.document.documentElement, didScroll, scrollPosition;
	function noScrollFn() {
		window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
	}
	function noScroll() {
		window.removeEventListener( 'scroll', scrollHandler );
		window.addEventListener( 'scroll', noScrollFn );
	}
	function scrollFn() {
		window.addEventListener( 'scroll', scrollHandler );
	}
	function canScroll() {
		window.removeEventListener( 'scroll', noScrollFn );
		scrollFn();
	}
	function scrollHandler() {
		if( !didScroll ) {
			didScroll = true;
			setTimeout( function() { scrollPage(); }, 60 );
		}
	};
	function scrollPage() {
		scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
		didScroll = false;
	};
	scrollFn();
	

	//Subscribe Form init
	function loading() {
		$('.result').css('visibility', 'visible').animate({opacity: 1}, 300).html('Submitting...');
	};
	function formResult(data) {
		$('.result').html(data);
		$('#subscribe-form input').val('');
	};
	function onSubmit() {
		$('#subscribe-form').submit(function() {
			var action = $(this).attr('action');
			loading();
			$.ajax({
				url: action,
				type: 'POST',
				data: {
				email: $('#subscribe-email').val()
			},
			success: function(data){
				formResult(data);
			},
			error: function(data) {
				formResult(data);
			}
		});
		return false;
	});
	}onSubmit();

	//Contact Form
	var messageDelay = 2000;
	$( init );
	function init() {
		$('#contact-form').submit( submitForm );
	};
	function submitForm() {
		var contactForm = $(this);
		if ( !$('#name').val() || !$('#email').val() || !$('#message').val() ) {
			$('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
		} else {
			$('#sendingMessage').fadeIn();
			$.ajax( {
				url: contactForm.attr( 'action' ) + "?ajax=true",
				type: contactForm.attr( 'method' ),
				data: contactForm.serialize(),
				success: submitFinished
			});
		};
		return false;
	};
	function submitFinished( response ) {
		response = $.trim( response );
		$('#sendingMessage').fadeOut();

		if ( response == "success" ) {
			$('#successMessage').fadeIn().delay(messageDelay).fadeOut();
			$('#name').val( "" );
			$('#email').val( "" );
			$('#message').val( "" );
		} else {
			$('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
		}
	};

	//Placeholder init

	
	//Functions need to run when window size is changed
	$(window).on('resize', function(){
		sectionHeight();
		splitMask();
		$('#home, #countdown').removeClass('active').addClass('inactive');
	});

	//Fade out preloader when the document is fully loaded
	$(window).on('load', function(){
		$('#preloader').fadeOut();
	});

})();