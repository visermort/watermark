(function() {
	'use strict';

$('.social').hover(function(){

	var el = $(this).css('margin-left');
//	console.log(el);
	if($(this).css('margin-left') == '-43px') {
		$(this).css({'margin-left':'0'});
//		console.log("margin-left is -43px");
//		console.log($(this).css('margin-left'));
	} else {
		$(this).css({'margin-left':'-43px'});
	}
});
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
	function setCookie(value, name, day) {
	    name = name || "lang";
	    day = day || 30;
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
		$('.lang__active').removeClass('.lang__active');
		$('.lang__' + langFromCookie).addClass('lang__active')

	} else {
		$('.lang__active').removeClass('lang__active');
		$('.lang__ru').addClass('lang__active');
	}

//	console.log(langFromCookie);


	$('.lang__link').on('click', function(event){
		
		event.preventDefault();

		var $this = $(this),
			lang_attr = $this.attr('lang');

			$('.lang__active').removeClass('lang__active');
			$('.lang__' + lang_attr).addClass('lang__active');
			
			setLang(lang_attr);
			setCookie(lang_attr);
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
//----- переключатель режима позиционирование по осям x & y
//------------------------------------------------------------------------------------
	$('.view__link').on('click', function(event){
		event.preventDefault();

		var $this = $(this),
			attr = $this.attr('attr'),
			positionBottom = $('.position__bottom');

		var	miniPicture = $('.watermark__img'),
			mainPicture = $('.main-bar__main-img'),
			heightMainPicture = mainPicture.height(),
			widthMainPicture = mainPicture.width(),
			heightMiniPicture = miniPicture.find('img').height(),
			widthMiniPicture = miniPicture.find('img').width(),
			waterImg = miniPicture.find('img')[0],
			srcImg = waterImg.src,
			opacity = $('.main-bar__watermark')[0].style.opacity,
			maxHeight = waterImg.style.maxHeight,
			maxWidth = waterImg.style.maxWidth,
			marginBottom = (waterImg.style.marginBottom == '') ? 0 : waterImg.style.marginBottom,
			marginRight = (waterImg.style.marginRight == '') ? 0 : waterImg.style.marginRight,
			maxCount = Math.ceil(heightMainPicture/heightMiniPicture + 1)*Math.ceil(widthMainPicture/widthMiniPicture + 1) - 1;
		//Функция, создающая режим замощение
		var _tiling = function() {
			positionBottom.removeClass('view__random');
			$('.view__link').removeClass('active-custom');
			positionBottom.addClass('view__custom');
			$($this).addClass('active-random');
			module.rem();
			miniPicture[0].style.top = '-30px';
			miniPicture[0].style.left = '-30px';
			miniPicture[0].style.padding = '30px';
			miniPicture.css({'width': Math.ceil(widthMainPicture/widthMiniPicture + 1)*(widthMiniPicture+parseInt(marginRight))+60, 'height': Math.ceil(heightMainPicture/heightMiniPicture + 1)*(heightMiniPicture+parseInt(marginBottom))+60});
			//Создание остальных картинок
			for (var i =0; i<maxCount; i++){
				var img = document.createElement('img');
				img.src = srcImg;
				img.style.marginBottom = marginBottom;
				img.style.maxWidth = maxWidth;
				img.style.maxHeight = maxHeight;
				img.style.height = heightMiniPicture + 'px';
				img.style.width = widthMiniPicture + 'px';
				img.style.opacity = opacity;
				img.style.marginRight = marginRight;
				img.className = 'main-bar__watermark copy';
				miniPicture[0].appendChild(img);

			};
		};
		//Функция, создающая режим одного watermark
		var _oneMode = function() {
			var	miniPic = $('.watermark__img')[0];
			$('img.copy').remove();
			miniPic.style.padding = '0px';
			miniPic.style.top = '0px';
			miniPic.style.left = '0px';
			module.init();
			positionBottom.removeClass('view__custom');
			$('.view__link').removeClass('active-random');
			positionBottom.addClass('view__random');
			$($this).addClass('active-custom');
			miniPicture.css({'width': widthMiniPicture, 'height': heightMiniPicture});
			$('.ui-resizable').css({'width': widthMiniPicture, 'height': heightMiniPicture});
		};

		if(attr == 'random'){
			_tiling();
		} else {
			_oneMode();
		};



	});

})();