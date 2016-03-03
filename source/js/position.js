/**
 * Created by Leisan on 03.03.2016.
 */
var module= (function () {

    var init = function () {
        _setUpListeners();
    };

    var _setUpListeners = function () {
        $('.position__link').on('click', _changePosition);
        $('.axis__link').on('click', _changePositionOne);
        $('.axis__x-input').bind("change keyup input click",_changePositionInput);
        $('.axis__y-input').bind("change keyup input click",_changePositionInput);
    };

    var _changePosition = function (e) {
        e.preventDefault();

        var $this = $(this),
            item = $this.attr("class"),
            miniPicture = $('.main-bar__watermark'),
            mainPicture = $('.main-bar__main-img'),
            position = item.replace(/position__link/g, '').trim(),
            heightMainPicture = mainPicture.height(),
            widthMainPicture = mainPicture.width(),
            heightMiniPicture = miniPicture.height(),
            widthMiniPicture = miniPicture.width();

        switch (position){
            case 'top-left':
                miniPicture.css({'top': 0, 'left': 0});
                break;
            case 'top':
                miniPicture.css({'top': 0, 'left': (widthMainPicture-widthMiniPicture)/2});
                break;
            case 'top-right':
                miniPicture.css({'top': 0, 'left': widthMainPicture-widthMiniPicture});
                break;
            case 'center-left':
                miniPicture.css({'top': (heightMainPicture-heightMiniPicture)/2, 'left': 0});
                break;
            case 'center':
                miniPicture.css({'top': (heightMainPicture-heightMiniPicture)/2, 'left': (widthMainPicture-widthMiniPicture)/2});
                break;
            case 'center-right':
                miniPicture.css({'top': (heightMainPicture-heightMiniPicture)/2, 'left': widthMainPicture-widthMiniPicture});
                break;
            case 'bottom-left':
                miniPicture.css({'top': heightMainPicture-heightMiniPicture, 'left': 0});
                break;
            case 'bottom':
                miniPicture.css({'top': heightMainPicture-heightMiniPicture, 'left': (widthMainPicture-widthMiniPicture)/2});
                break;
            case 'bottom-right':
                miniPicture.css({'top': heightMainPicture-heightMiniPicture, 'left': widthMainPicture-widthMiniPicture});
                break;
            default: miniPicture.css({'top': 0, 'left': 0});
        }

        _showPosition();
    };

    var _changePositionOne = function (e) {

        e.preventDefault();

        var $this = $(this),
            item = $this.attr("class"),
            miniPicture = $('.main-bar__watermark'),

            self = miniPicture[0],
            leftPosition = miniPicture.position().left,
            topPosition = miniPicture.position().top,
            position = item.replace(/axis__link/g, '').trim();

        self.style.top = miniPicture.position().top;
        self.style.left = miniPicture.position().left;


        switch (position){
            case 'arrow__x-up':
                self.style.top = topPosition - 1 + 'px';
                break;
            case 'arrow__x-down':
                self.style.top = topPosition + 1 + 'px';
                break;
            case 'arrow__y-up':
                self.style.left = leftPosition + 1 + 'px';
                break;
            case 'arrow__y-down':
                self.style.left = leftPosition - 1 + 'px';
                break;
            default: miniPicture.css({'top': 0, 'left': 0});
        }

        _showPosition();
    };
    var _changePositionInput = function () {

        var miniPicture = $('.main-bar__watermark'),
            self = miniPicture[0],
            leftPosition = $('.axis__x-input')[0].value,
            topPosition = $('.axis__y-input')[0].value;

        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }

        self.style.top = topPosition + 'px';
        self.style.left = leftPosition + 'px';
    };

    var _showPosition = function() {

        var miniPicture = $('.main-bar__watermark');

        $('.axis__x-input')[0].value = miniPicture[0].style.left.replace(/px/g, '');
        $('.axis__y-input')[0].value = miniPicture[0].style.top.replace(/px/g, '');
    };


    var mini = $('.main-bar__watermark')[0];

    mini.onmousedown = function(e) {

        var miniPic = $('.main-bar__watermark'),
            miniPicture = miniPic[0],
            heightMiniPicture = miniPic.height(),
            widthMiniPicture = miniPic.width(),
            mainPicture = $('.main-bar__main-img'),
            heightMainPicture = mainPicture.height(),
            widthMainPicture = mainPicture.width(),
            self = this;

            this.style.position = 'absolute';
            moveAt(e);

            function moveAt(e) {
                miniPicture.style.left = e.pageX -497 -325 + widthMainPicture/2 - widthMiniPicture / 2 + 'px';
                miniPicture.style.top = e.pageY - 133 -267.5 + heightMainPicture/2 - heightMiniPicture / 2 + 'px';
                _showPosition();
            }

            function fixEvent(e) {
                e = e || window.event;
                if (!e.relatedTarget) {
                    if (e.type == 'mouseover') e.relatedTarget = e.fromElement;
                    if (e.type == 'mouseout') e.relatedTarget = e.toElement;
                }
                return e;
            }

            document.onmousemove = function (e) {
                e = fixEvent(e);
                moveAt(e);
            };

            miniPicture.onmouseup = function () {
                document.onmousemove = self.onmouseup = null;
            }
        };

    mini.ondragstart = function () {
        return false;
    };

    return {
        init : init
    };

}) ();

module.init();



