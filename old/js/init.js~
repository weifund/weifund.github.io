$(window).load(function () {
	"use strict";
	$('#status').fadeOut();
	$('#preloader').delay(350).fadeOut('slow');
	$('body').delay(350).css({
		'overflow': 'visible'
	});
});
$(function () {
	"use strict";

	/* ---------------------------------------------------------
	 * Background (Video)
	 */
	
	 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent) ) {
		$.backstretch([
			"img/background/1.jpg"
		]);
	}
	else {
		$('#home').tubular({
			videoId: 'y-ZeBO0ro8Q'
		}); // where videoId is the YouTube ID.
	}
	
	/* ---------------------------------------------------------
	 * WOW
	 */
	
	new WOW({
		 mobile: false,
	}).init();
	
	
	/* ---------------------------------------------------------
	 * Team carousel
	 */
	
	$("#teamCarousel").owlCarousel({
		items: 4,
		itemsTablet: [768,3],
		itemsTabletSmall: [690,2],
		itemsMobile : [480,1]
	});
	
	/* ---------------------------------------------------------
	 * Scroll arrow
	 */
	
	$("#scroll").click(function () {
	 	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	 		var target = $(this.hash);
	 		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	 		if (target.length) {
	 			$('html,body').animate({
	 				scrollTop: target.offset().top
	 			}, 1200);
	 			return false;
	 		}
	 	}
	 });

	/* ---------------------------------------------------------
	 * Countdown
	 */

	var description = {
		weeks: "weeks",
		days: "days",
		hours: "hours",
		minutes: "minutes",
		seconds: "seconds"
	};
	
	// year/month/day
	$('#countdown').countdown('2015/6/12', function (event) {
		$(this).html(event.strftime(
			'<div class="countdown-section"><b>%w</b> <span>' + description.weeks + '</span> </div>' +
			'<div class="countdown-section"><b>%d</b> <span>' + description.days + '</span> </div>' +
			'<div class="countdown-section"><b>%H</b> <span>' + description.hours + '</span> </div>' +
			'<div class="countdown-section"><b>%M</b> <span>' + description.minutes + '</span> </div>' +
			'<div class="countdown-section"><b>%S</b> <span>' + description.seconds + '</span> </div>'
		));
	});


	/* ---------------------------------------------------------
	 * Form validation
	 */

	/* Signup form */

	$('#signupForm').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh'
		},
		submitHandler: function (validator, form, submitButton) {
			var l = Ladda.create(submitButton[0]),
				btnText = submitButton.children(".ladda-label");
			
			l.start();
			btnText.html("Signing up...");
			
			$.get(form.attr('action'), form.serialize(), function(result) { 
				btnText.html(result.message);							
			}, 'json')
			.always(function() { 
				l.stop(); 
				validator.disableSubmitButtons(true);
			});
		},
		fields: {
			email: {
				validators: {
					notEmpty: {
						message: 'Email cannot be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			}
		}
	});

	/* Contact form */

	$('#contactForm').bootstrapValidator({
		fields: {
			name: {
				validators: {
					notEmpty: {
						message: 'Name cannot be empty'
					},
					stringLength: {
						min: 6,
						max: 30,
						message: 'Name must be more than 6 and less than 30 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z\s]+$/,
						message: 'Name can only consist alphabetical characters'
					}
				}
			},
			contactEmail: {
				validators: {
					notEmpty: {
						message: 'Email cannot be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			},
			message: {
				validators: {
					notEmpty: {
						message: 'Message cannot be empty'
					}
				}
			}
		},
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh'
		},
		submitHandler: function (validator, form, submitButton) {
			var l = Ladda.create(submitButton[0]),
				btnText = submitButton.children(".ladda-label");
			
			l.start();
			btnText.html("Sending...");
			
			$.post(form.attr('action'), form.serialize(), function(result) {
				if(result.sent){
					btnText.html("Sent!");
				}
				else{
					btnText.html("Error!");
				}
				
				// Reset form after 5s
				setTimeout(function() {
					btnText.html("Submit");
					$(form[0])[0].reset();
					validator.resetForm();
				}, 5000);
				
			}, 'json')
			.always(function() { 
				l.stop(); 
				validator.disableSubmitButtons(true);
			});
		},
	});
});