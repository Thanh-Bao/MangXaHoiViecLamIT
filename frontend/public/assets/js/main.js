jQuery(function ($) {
    'use strict';
	
	// Header Sticky
	$(window).on('scroll',function() {
		if ($(this).scrollTop() > 150){  
			$('.navbar-area').addClass("is-sticky");
		}
		else{
			$('.navbar-area').removeClass("is-sticky");
		}
	});

	// Mean Menu
	jQuery('.mean-menu').meanmenu({
		meanScreenWidth: "1199"
	});

	// Language Switcher
	$(".language-option").each(function() {
        var each = $(this)
        each.find(".lang-name").html(each.find(".language-dropdown-menu a:nth-child(1)").text());
        var allOptions = $(".language-dropdown-menu").children('a');
        each.find(".language-dropdown-menu").on("click", "a", function() {
            allOptions.removeClass('selected');
            $(this).addClass('selected');
            $(this).closest(".language-option").find(".lang-name").html($(this).text());
        });
    })

	// Metis Menu JS
	$(function () {
		$('#sidemenu-nav').metisMenu();
	});

	// Burger Menu JS
	$('.burger-menu').on('click', function() {
		$(this).toggleClass('active');
		$('.main-content').toggleClass('hide-sidemenu-area');
		$('.sidemenu-area').toggleClass('toggle-sidemenu-area');
		$('.top-navbar').toggleClass('toggle-navbar-area');
	});
	$('.responsive-burger-menu').on('click', function() {
		$('.responsive-burger-menu').toggleClass('active');
		$('.sidemenu-area').toggleClass('active-sidemenu-area');
	});

	// Favorite JS
	$('.chat-list-header .header-right .favorite').on('click', function() {
		$(this).toggleClass('active');
	});

	// TweenMax JS
	$('.main-banner-area').mousemove(function(e){
		var wx = $(window).width();
		var wy = $(window).height();
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		var newx = x - wx/2;
		var newy = y - wy/2;
		$('.main-banner-content').each(function(){
			var speed = $(this).attr('data-speed');
			if($(this).attr('data-revert')) speed *= -.4;
			TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
		});
	});
	$('.main-banner-area-with-bg-image').mousemove(function(e){
		var wx = $(window).width();
		var wy = $(window).height();
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		var newx = x - wx/2;
		var newy = y - wy/2;
		$('.main-banner-content-with-search').each(function(){
			var speed = $(this).attr('data-speed');
			if($(this).attr('data-revert')) speed *= -.4;
			TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
		});
	});
	$('.main-banner-area-wrap').mousemove(function(e){
		var wx = $(window).width();
		var wy = $(window).height();
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		var newx = x - wx/2;
		var newy = y - wy/2;
		$('.main-banner-content-wrap, .main-banner-wrap-image').each(function(){
			var speed = $(this).attr('data-speed');
			if($(this).attr('data-revert')) speed *= -.4;
			TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
		});
	});

	// Top Category Slides
	$('.top-category-slides').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		autoHeight: true,
		smartSpeed: 500,
		margin: 30,
		autoplayHoverPause: true,
		autoplay: true,
		
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 3
			},
			1200: {
				items: 6
			}
		}
	});

	// Review Slides
	$('.review-slides').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		autoHeight: true,
		smartSpeed: 500,
		margin: 25,
		autoplayHoverPause: true,
		autoplay: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			1200: {
				items: 2
			}
		}
	});

	// Blog Slides
	$('.blog-slides').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		autoHeight: true,
		smartSpeed: 500,
		margin: 25,
		autoplayHoverPause: true,
		autoplay: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 1
			},
			1200: {
				items: 2
			}
		}
	});

	// Partner Slides
	$('.partner-slides').owlCarousel({
		loop: true,
		nav: false,
		dots: false,
		autoHeight: true,
		smartSpeed: 500,
		margin: 25,
		autoplayHoverPause: true,
		autoplay: true,
		
		responsive: {
			0: {
				items: 2
			},
			768: {
				items: 3
			},
			1200: {
				items: 6
			}
		}
	});

	// Popup Video
	$('.popup-youtube').magnificPopup({
		disableOn: 320,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	// Subscribe form
	$(".newsletter-form").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			formErrorSub();
			submitMSGSub(false, "Please enter your email correctly.");
		} 
		else {
			event.preventDefault();
		}
	});
	function callbackFunction (resp) {
		if (resp.result === "success") {
			formSuccessSub();
		}
		else {
			formErrorSub();
		}
	}
	function formSuccessSub(){
		$(".newsletter-form")[0].reset();
		submitMSGSub(true, "Thank you for subscribing!");
		setTimeout(function() {
			$("#validator-newsletter").addClass('hide');
		}, 4000)
	}
	function formErrorSub(){
		$(".newsletter-form").addClass("animated shake");
		setTimeout(function() {
			$(".newsletter-form").removeClass("animated shake");
		}, 1000)
	}
	function submitMSGSub(valid, msg){
		if(valid){
			var msgClasses = "validation-success";
		} 
		else {
			var msgClasses = "validation-danger";
		}
		$("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
	}
	// AJAX MailChimp
	$(".newsletter-form").ajaxChimp({
		url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
		callback: callbackFunction
	});

	// Count Time 
	function makeTimer() {
		var endTime = new Date("September 20, 2025 17:00:00 PDT");			
		var endTime = (Date.parse(endTime)) / 1000;
		var now = new Date();
		var now = (Date.parse(now) / 1000);
		var timeLeft = endTime - now;
		var days = Math.floor(timeLeft / 86400); 
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }
		$("#days").html(days + "<span>Days</span>");
		$("#hours").html(hours + "<span>Hours</span>");
		$("#minutes").html(minutes + "<span>Minutes</span>");
		$("#seconds").html(seconds + "<span>Seconds</span>");
	}
	setInterval(function() { makeTimer(); }, 0);

	// Input Plus & Minus Number JS
	$('.input-counter').each(function() {
		var spinner = jQuery(this),
		input = spinner.find('input[type="text"]'),
		btnUp = spinner.find('.plus-btn'),
		btnDown = spinner.find('.minus-btn'),
		min = input.attr('min'),
		max = input.attr('max');
		
		btnUp.on('click', function() {
			var oldValue = parseFloat(input.val());
			if (oldValue >= max) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue + 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
		btnDown.on('click', function() {
			var oldValue = parseFloat(input.val());
			if (oldValue <= min) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue - 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
	});

	// Blog More Item
	$(".blog-more-item").slice(0, 6).show();
		$("#loadmore").on('click', function (e) {
		e.preventDefault();
		$(".blog-more-item:hidden").slice(0, 3).slideDown();
	});
	$(".blog-more-item-two").slice(0, 8).show();
		$("#loadmore").on('click', function (e) {
		e.preventDefault();
		$(".blog-more-item-two:hidden").slice(0, 3).slideDown();
	});

	// Job More Item
	$(".job-more-item").slice(0, 8).show();
		$("#loadmore").on('click', function (e) {
		e.preventDefault();
		$(".job-more-item:hidden").slice(0, 3).slideDown();
	});
	
	// Candidates More Item
	$(".candidates-more-item").slice(0, 6).show();
		$("#loadmore").on('click', function (e) {
		e.preventDefault();
		$(".candidates-more-item:hidden").slice(0, 3).slideDown();
	});

	// Featured Candidates More Item
	$(".featured-candidates-more-item").slice(0, 6).show();
		$("#loadmore").on('click', function (e) {
		e.preventDefault();
		$(".featured-candidates-more-item:hidden").slice(0, 1).slideDown();
	});

	// Employer More Item
	$(".employer-more-item").slice(0, 9).show();
		$("#loadmore").on('click', function (e) {
		e.preventDefault();
		$(".employer-more-item:hidden").slice(0, 3).slideDown();
	});

	// Job List Map Sticky
	$('.job-list-map-sticky').stickySidebar({
		topSpacing: 100,
		bottomSpacing: 100
	});

	// Featured Candidates Map Sticky
	$('.featured-candidates-map-sticky').stickySidebar({
		topSpacing: 100,
		bottomSpacing: 100
	});

	// Job Details Sticky
	$('.job-details-sticky').stickySidebar({
		topSpacing: 90,
		bottomSpacing: 90
	});

	// Candidates Details Sticky
	$('.candidates-details-sticky').stickySidebar({
		topSpacing: 90,
		bottomSpacing: 90
	});

	// Employers Details Sticky
	$('.employers-details-sticky').stickySidebar({
		topSpacing: 90,
		bottomSpacing: 90
	});

	// tooltip
	$(function () {
		$('[data-bs-toggle="tooltip"]').tooltip()
	});

	// AOS JS
	AOS.init();

	// Selectize Filter
    $(".selectize-filter").selectize({
        create: true,
        sortField: 'text'
    });
	$(".sorting-filter").selectize({
        create: true,
        sortField: 'text'
    });

	// WOW Animation JS
	if($('.wow').length){
		var wow = new WOW({
			mobile: false
		});
		wow.init();
	}

	// Odometer JS
	$('.odometer').appear(function(e) {
		var odo = $(".odometer");
		odo.each(function() {
			var countNumber = $(this).attr("data-count");
			$(this).html(countNumber);
		});
	});

	// Go to Top
	$(window).on('scroll', function(){
		var scrolled = $(window).scrollTop();
		if (scrolled > 600) $('.go-top').addClass('active');
		if (scrolled < 600) $('.go-top').removeClass('active');
	});  
	$('.go-top').on('click', function() {
		$("html, body").animate({ scrollTop: "0" },  500);
	});
	
	// Preloader
	$(window).on('load', function() {
		$('.preloader-area').fadeOut();
	});

}(jQuery));