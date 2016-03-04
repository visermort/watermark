(function () {
	'use strict';

    init();
    attachEvents();

    function init() {
    	var arr = [
	    		['#image-upload','.image-upload__txt'],
	    		['#watermark','.watermark__txt']
    		];

    	$.each(arr, function(index, item) {
    		pasteValue(item[0], item[1])
    	});
    }

    function attachEvents() {
    }

    function pasteValue(from, to) {
    	$(from).on('change', function() {

    		var input = $(this),
		    	value = input.val(),
		    	fake = $(to),
		    	lastIndex = value.lastIndexOf('\\') + 1;

		    if (lastIndex !== -1) {
			    value = value.substr(lastIndex);
	   		}

	   		fake.text(value);
    	});
    }
})();