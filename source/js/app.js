(function() {
	'use strict';

	// $('#image-upload').on('change', function(){
	// 	var $this = $(this),
	// 		imgPath = $this.val(),
	// 		input = $('.image-upload__ico').parent($this);
		
	// 	// console.log($this);
	// 	// console.log(imgPath);
	// 	// console.log(input);
		
	// 	$('.image-upload__txt').text(imgPath);
	// });

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