(function () {
	
	'use strict';

	var module,
		popup;
	
	init();
	publicInterface();

    function init() {
    	popup = $('#popup');
    }

    function _initPopup() {

    	popup.stop(true, true).fadeIn(900);

    	function out() {
    		popup.stop(true, true).fadeOut(900);
    	}

    	setTimeout(out, 3000);
    }

    function publicInterface() {
    	module = {

    		show: function (status, text) {

    			if (status == 'error') {
    				text = text || 'Ошибка!';
    			} else if (status == 'success') {
    				text = text || 'Успех!';
    			}

    			popup.text(text);
    			_initPopup();
    		}
    	}
    } 

    window.popup = module;

})();