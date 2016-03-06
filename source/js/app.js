(function() {
	'use strict';
	
	function getCookie(name) {
		var r = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
		if (r) return r[2];
		else return "";
	}
	function setCookie(cvalue) {
	    var d = new Date();
	    d.setTime(d.getTime() + (30*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = "lang" + "=" + cvalue + "; " + expires;
	}

	function setLang(lang_attr) {
		var arr = ['main-bar__title','side-bar__title','image-upload__label','watermark__label','image-upload__txt','watermark__txt','position__label','transparency__header','inputs__reset','inputs__download','copyright'],	
			arr_ru = ['Генератор водяных знаков','Настройки','Исходное изображение','Водяной знак','Выберите изображение','Выберите водяной знак','Положение','Прозрачность','Сброс','Скачать','© 2016, Это мой сайт, пожалуйста, не копируйте и не воруйте его'],
			arr_en = ['Watermarks generator','Settings','Original image','Watermark','Select a image','Select a watermark','Place','Transparency','Reset','Download','© 2016 This is my site, do not even think to steal it'],
			lang = (lang_attr == 'ru') ? arr_ru : arr_en;

		jQuery.each( arr, function( index, value  ) {
			$( "." + value ).text( lang[index]);
			$( "title" ).text( lang[0]);
		});
	}

	var langFromCookie = getCookie("lang");

	if (langFromCookie){ setLang(langFromCookie) }

	console.log(langFromCookie);


	$('.lang__link').on('click', function(event){
		
		event.preventDefault();

		var $this = $(this),
			lang_attr = $this.attr('lang');

		// if( lang_attr != langFromCookie ) {
			setLang(lang_attr);
			setCookie(lang_attr);
		// }

	});


	//----- социальные сети
	$('.social__link').on('click', function(event) {
		event.preventDefault();
		
		var $this = $(this),
			url = $this.attr('href');

		var newWin = window.open(url, "hello", "width=836,height=445");

		console.log(url);
	});

	//----- переключатель режима позицианирование по осям x & y
	$('.view__link').on('click', function(event){

		event.preventDefault();
		var $this = $(this),
			attr = $this.attr('attr'),
			rmView,
			addView,
			rmActive,
			addActive;
		
		console.log(attr);

		rmView = (attr == 'custom') ? 'view__custom' : 'view__random';
		rmActive = (attr == 'custom') ? 'active-random' : 'active-custom';
		addView = (attr == 'custom') ? 'view__random' : 'view__custom';
		addActive = (attr == 'custom') ? 'active-custom' : 'active-random';
		$('.position__bottom').removeClass(rmView);
		$('.view__link').removeClass(rmActive);
		$('.position__bottom').addClass(addView);
		$($this).addClass(addActive);
		
		console.log(rmActive);
	});

})();