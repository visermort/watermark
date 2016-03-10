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
        var time = 900;

    	popup.stop(true, true).fadeIn(time);

    	function out() {
    		popup.stop(true, true).fadeOut(time);
    	}

    	setTimeout(out, 3000);
    }

    function _toggleClass(target, add, remove) {
        target
            .removeClass(remove)
            .addClass(add);
    }

    function publicInterface() {
    	module = {

    		show: function (status, text) {

    			if (status == 'error') {
    				text = text || 'Ошибка!';
                    _toggleClass(popup, 'popup_error', 'popup_success');
    			} else if (status == 'success') {
    				text = text || 'Успех!';
                    _toggleClass(popup, 'popup_success', 'popup_error');
    			}

    			popup.text(text);
    			_initPopup();
    		}
    	}
    } 

    window.popup = module;

})();