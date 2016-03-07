(function() {
	'use strict';
//------------------------------------------------------------------------------------
// ----- социальные сети
//------------------------------------------------------------------------------------	
	// --------------------
	// ----- COOKIE -------
	// --------------------
	function getCookie(name) {
		var cName = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
	return cName = (cName) ? cName[2] : "";
	}
	function setCookie(value, name = "lang", day = 30) {
	    var d = new Date();
	    d.setTime( d.getTime() + (day*24*60*60*1000) );
	    var expires = "expires=" + d.toUTCString();
	    document.cookie = name + "=" + value + "; " + expires;
	}

	function setLang(lang_attr) {
		var arr = ['main-bar__title','side-bar__title','image-upload__label','watermark__label','image-upload__txt','watermark__txt','position__label','transparency__header','inputs__reset','inputs__download','copyright'],	
			arr_ru = ['Генератор водяных знаков','Настройки','Исходное изображение','Водяной знак','Выберите изображение','Выберите водяной знак','Положение','Прозрачность','Сброс','Скачать','© 2016, Это мой сайт, пожалуйста, не копируйте и не воруйте его'],
			arr_en = ['Watermarks generator','Settings','Original image','Watermark','Select a image','Select a watermark','Place','Transparency','Reset','Download','© 2016 This is my site, do not even think to steal it'],
			lang = (lang_attr == 'ru') ? arr_ru : arr_en;

		$.each(arr, function(index,value) {
			$("." + value).text( lang[index]);
			$("title").text(lang[0]);
		});
	}

	var langFromCookie = getCookie("lang");

	if (langFromCookie) { 

		setLang(langFromCookie);

		$('.lang__' + langFromCookie).addClass('lang__active').removeClass('.lang__' + langFromCookie);


	} else {

	}

	console.log(langFromCookie);


	$('.lang__link').on('click', function(event){
		
		event.preventDefault();


		if(langFromCookie == 'ru') {

			$('.lang__en').removeClass('lang__active').addClass('lang__en');

		} else {
			
			$('.lang__ru').removeClass('lang__active').addClass('lang__ru');

		}

		var $this = $(this),
			lang_attr = $this.attr('lang');
			
			$('.lang__' + lang_attr).addClass('lang__active');

			setLang(lang_attr);
			setCookie(lang_attr);

			// /$('.lang__' + lang_attr).removeClass
	});

//------------------------------------------------------------------------------------
// ----- социальные сети
//------------------------------------------------------------------------------------
	$('.social__link').on('click', function(event) {
		event.preventDefault();
		
		var $this = $(this),
			url = $this.attr('href');

		var newWin = window.open(url, "hello", "width=836,height=445");

		console.log(url);
	});
//------------------------------------------------------------------------------------
//----- переключатель режима позицианирование по осям x & y
//------------------------------------------------------------------------------------
	$('.view__link').on('click', function(event){

		event.preventDefault();
		var $this = $(this),
			attr = $this.attr('attr'),
			positionBottom = $('.position__bottom');

		console.log(attr);

		if(attr == 'random'){
			positionBottom.removeClass('view__random');
			$('.view__link').removeClass('active-custom');
			positionBottom.addClass('view__custom');
			$($this).addClass('active-random');
			module.rem();
			var	miniPicture = $('.watermark__img'),
				mainPicture = $('.main-bar__main-img'),
				heightMainPicture = mainPicture.height(),
				widthMainPicture = mainPicture.width(),
				heightMiniPicture = miniPicture.find('img').height(),
				widthMiniPicture = miniPicture.find('img').width(),
				waterImg = miniPicture.find('img')[0],
				srcImg = waterImg.src,
				opacity = $('.main-bar__watermark')[0].style.opacity,
				marginBottom = (waterImg.style.marginBottom == '') ? 0 : waterImg.style.marginBottom,
				marginRight = (waterImg.style.marginRight == '') ? 0 : waterImg.style.marginRight,
				maxCount = Math.ceil(heightMainPicture/heightMiniPicture + 1)*Math.ceil(widthMainPicture/widthMiniPicture + 1) - 1;
			miniPicture[0].style.top = '-30px';
			miniPicture[0].style.left = '-30px';
			miniPicture[0].style.padding = '30px';
			miniPicture.css({'width': Math.ceil(widthMainPicture/widthMiniPicture + 1)*(widthMiniPicture+marginRight)+60, 'height': Math.ceil(heightMainPicture/heightMiniPicture + 1)*(heightMiniPicture+marginBottom)+60});

			for (var i =0; i<maxCount; i++){
				var img = document.createElement('img');
				img.src = srcImg;
				img.style.marginBottom = marginBottom;
				img.style.opacity = opacity;
				img.style.marginRight = marginRight;
				img.className = 'main-bar__watermark copy';
				miniPicture[0].appendChild(img);
			}

		} else {
			var	miniPicture = $('.watermark__img')[0];
			$('img.copy').remove();
			miniPicture.style.padding = '0px';
			miniPicture.style.top = '0px';
			miniPicture.style.left = '0px';
			module.init();
			positionBottom.removeClass('view__custom');
			$('.view__link').removeClass('active-random');
			positionBottom.addClass('view__random');
			$($this).addClass('active-custom');
		}
	});

})();