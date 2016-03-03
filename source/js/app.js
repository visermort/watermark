(function() {
  'use strict';

	$('.axis__x-input').on('keyup', function(){
		
		var $this = $(this).val();

		console.log($this);
		
		$('.pos-div__x').css({'height': $this});

	});

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




    $('#image-upload').on('change', function() {
        console.log('poject file change is active');

        var $this = $(this),
            file_name = $this.val();

        console.log($this.val());

	    // if (!/(\.bmp|\.gif|\.jpg|\.jpeg|\.png)$/i.test(file_name)) {
	    //     alert('Вы пытаетесь загрузить файл который не является картинкой!');
	    //     document.getElementById('image_p').value = '';
	    //     return false;
	    // }

        $('.image-upload__txt').text($this.val());
    });

})();