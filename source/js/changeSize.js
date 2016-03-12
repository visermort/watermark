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
    					'max-width': Math.floor(widthBig),
    					'max-height': Math.floor(heightBig)
    				});
    			};			 			
	    	}
    	}
    } 

    window.watermarkSize = module;
})();