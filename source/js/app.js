(function() {
	'use strict';

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