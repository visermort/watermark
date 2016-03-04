(function () {
	var module;

	publicInterface();
    init(); 

    function init() {
    }

    function publicInterface() {
    	module = {

    		sliderInit: function (slider, target, min, max, step, value) {

    		var $slider = $(slider),
	    		$target = $(target),
		    	min = min || $slider.data('min'),
		    	max = max || $slider.data('max'),
		    	step = step || .01,
		    	value = value || 1;

		    	$slider.slider({
		    		min: min,
		    		max: max,
		    		range: 'max',
		    		value: value,
		      		step: step,

		      		slide: function( event, ui ) {
		        		$target.css('opacity', ui.value);
		      		}
		    	});
	    	}
    	}
    } 

    window.sliderModule = module;
})();

sliderModule.sliderInit('.slider', '.main-bar__watermark');