(function () {
	var module;

	init(); 
	publicInterface();
    

    function init() {
    	
    }

    function publicInterface() {
    	module = {

    		change: function (img, watermark) {
    			var 
	    			bigImg = $(img),
    				water = $(watermark),
    				widthBig = bigImg.width(),
    				heightBig = bigImg.height(),
    				widthWater = water.width(),
    				heightWater = water.height();

    			if (bigImg.attr('src') !== '') {
    				water.css({
    					'max-width': widthBig,
    					'max-height': heightBig
    				});
    			};			 			
	    	}
    	}
    } 

    window.watermarkSize = module;
})();

$('.watermark__input').on('click', function () {
	var img = $('.main-bar__main-img'),
		watermark = $('.main-bar__watermark');

	watermarkSize.change(img, watermark);
});