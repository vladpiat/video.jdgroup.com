$(document).ready(function() {
	//placeholder
	$('[placeholder]').focus(function() {
		var input = $(this);
		if(input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		}
	}).blur(function() {
		var input = $(this);
		if(input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}).blur();
	$('[placeholder]').parents('form').submit(function() {
		$(this).find('[placeholder]').each(function() {
			var input = $(this);
			if(input.val() == input.attr('placeholder')) {
				input.val('');
			}
		})
	});
	//
	var ww = document.body.clientWidth;
	var wh = document.body.clientHeight;
	$(document).ready(function() {
		adjustMenu();
	});
	$(window).bind('resize orientationchange', function() {
		ww = document.body.clientWidth;
		wh = $('body').height();
		adjustMenu();
	});
	var adjustMenu = function() {
		if(ww < 1024) {}
		else if(ww >= 1024) {
			$('.mobile-button').removeClass('open');
			$('.nav').removeClass('open');
			$('body').removeClass('hid');
		}
	}
	//toggle nav
	$('.mobile-button').click(function() {
		$(this).toggleClass('open');
		$('.nav').toggleClass('open');
		$('body').toggleClass('hid');
		return false;
	});
	//fancybox
	$('.fancy').fancybox();
	//top slider
	$('.top-slider').slick({
		dots: false,
		speed: 600,
		autoplay: true,
		autoplaySpeed: 4000,
		slidesToShow: 1,
		fade: true,
		slidesToScroll: 1
	});
	//go to section
	$('.nav a').click(function() {
		var target = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 1000);
		$('.mobile-button').removeClass('open');
		$('.nav').removeClass('open');
		$('body').removeClass('hid');
		return false;
	});
	//custom select
	$('select').styler();

	$('.mask').mask('+38 (099) 999-9999');

	$('.btn-big2').click(function() {
		$('.feedback-tel').slideDown(300);
		return false;
	});
	$(".feedback-tel .close").on('click', function(e) {
	    $('.feedback-tel').slideUp(300);
		return false;
	});





	//submit form
	$('.sform').submit(function(e) {
		e.preventDefault();
		var f = $(this);
		$('.ierror', f).removeClass('ierror');
		var name = $('input[name=name]', f).val();
		var phone = $('input[name=phone]', f).val();
		var email = '';
		var address = '';
		var text = '';
		var object = '';
		var subject = $('input[name=subject]', f).val();
		var error = false;
		if(name == '') {
			$('input[name=name]', f).addClass('ierror');
			error = true;
		}
		if(phone == '') {
			$('input[name=phone]', f).addClass('ierror');
			error = true;
		}
		if($('input[name=email]', f).length) {
			var email = $('input[name=email]', f).val();
			if(!is_email(email)) {
				$('input[name=email]', f).addClass('ierror');
				error = true;
			}
		}
		if($('input[name=address]', f).length) {
			var address = $('input[name=address]', f).val();
			if(address == '') {
				$('input[name=address]', f).addClass('ierror');
				error = true;
			}
		}
		if($('textarea[name=text]', f).length) {
			var text = $('textarea[name=text]', f).val();
			if(text == '') {
				$('textarea[name=text]', f).addClass('ierror');
				error = true;
			}
		}
		if($('select[name=object]', f).length) {
			var object = $('select[name=object]', f).val();
			if(object == '0') {
				$('select[name=object]', f).closest('.jq-selectbox').find('.jq-selectbox__select').addClass('ierror');
				error = true;
			}
		}
		if(error) {
			return false;
		}
		var query = 'act=sender';
		query += '&name=' + encodeURIComponent(name);
		query += '&phone=' + encodeURIComponent(phone);
		query += '&email=' + encodeURIComponent(email);
		query += '&address=' + encodeURIComponent(address);
		query += '&text=' + encodeURIComponent(text);
		query += '&object=' + encodeURIComponent(object);
		query += '&subject=' + encodeURIComponent(subject);
		$.ajax({
			type: "POST",
			data: query,
			url: "./sender.php",
			dataType: "json",
			success: function(data) {
				if(data.result == 'ok') {
					$('input[type=text], textarea', f).val('');
					//echo
					$.fancybox('#modal-success');
				}
				else {
					alert('Ошибка! Повторите позже.');
				}
			}
		});
		return false;
	});
});

function trim(str) {
	var newstr = str.replace(/^\s*(.+?)\s*$/, "$1");
	if(newstr == " ") {
		return "";
	}
	return newstr;
}

function drop_spaces(str) {
	var newstr = trim(str);
	return newstr.replace(/(\s)+/g, "");
}

function is_email(email) {
	var template = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
	email = drop_spaces(email);
	if(template.test(email)) {
		return true;
	}
	return false;
}

