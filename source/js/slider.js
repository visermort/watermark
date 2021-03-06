(function () {
	var module;

	publicInterface();
    init(); 

    function init() {
    }

    function publicInterface() {
    	module = {

    		sliderInit: function (slider, target, min, max, step, value) {
	    		var 
	    			$slider = $(slider),
			    	min = min || $slider.data('min'),
			    	max = max || $slider.data('max'),
			    	step = step || .01,
			    	value = value || -1,
			    	opacity;

			    $slider.slider({
			    	min: min,
			    	max: max,
			    	range: 'max',
			    	value: value,
			      	step: step,

			    	slide: function( event, ui ) {
			      		opacity = -ui.value;
			        	$('.main-bar__watermark').css('opacity', opacity);
			      	}
			    });
	    	}
    	}
    } 

    window.sliderModule = module;
})();

sliderModule.sliderInit('.slider', '.main-bar__watermark');


