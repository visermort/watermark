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
        $('.axis__x-input').bind("change keyup input click",_changePositionInputLeft);
        $('.axis__y-input').bind("change keyup input click",_changePositionInputTop);
    };
    var _clearActive = function() {
        $('.position__link').removeClass('position__link-active');
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

        //miniPicture.css({'top': 0, 'left': 0});

        switch (position){
            case 'top-left':
                miniPicture.css({'top': 0, 'left': 0});
                _clearActive();
                $this.addClass('position__link-active');
                break;
            case 'top':
                miniPicture.css({'top': 0, 'left': (widthMainPicture-widthMiniPicture)/2});
                _clearActive();
                $this.addClass('position__link-active');
                break;
            case 'top-right':
                miniPicture.css({'top': 0, 'left': widthMainPicture-widthMiniPicture});
                _clearActive();
                $this.addClass('position__link-active');
                break;
            case 'center-left':
                miniPicture.css({'top': (heightMainPicture-heightMiniPicture)/2, 'left': 0});
                _clearActive();
                $this.addClass('position__link-active');
                break;
            case 'center':
                miniPicture.css({'top': (heightMainPicture-heightMiniPicture)/2, 'left': (widthMainPicture-widthMiniPicture)/2});
                _clearActive();
                $this.addClass('position__link-active');
                break;
            case 'center-right':
                miniPicture.css({'top': (heightMainPicture-heightMiniPicture)/2, 'left': widthMainPicture-widthMiniPicture});
                _clearActive();
                $this.addClass('position__link-active');
                break;
            case 'bottom-left':
                miniPicture.css({'top': heightMainPicture-heightMiniPicture, 'left': 0});
                _clearActive();
                $this.addClass('position__link-active');
                break;
            case 'bottom':
                miniPicture.css({'top': heightMainPicture-heightMiniPicture, 'left': (widthMainPicture-widthMiniPicture)/2});
                _clearActive();
                $this.addClass('position__link-active');
                break;
            case 'bottom-right':
                miniPicture.css({'top': heightMainPicture-heightMiniPicture, 'left': widthMainPicture-widthMiniPicture});
                _clearActive();
                $this.addClass('position__link-active');
                break;
            default: miniPicture.css({'top': miniPicture.position().top, 'left': miniPicture.position().left});
        }

        _showPosition();
    };

    var _changePositionOne = function (e) {

        e.preventDefault();
        _clearActive();
        var $this = $(this),
            item = $this.attr("class"),
            miniPicture = $('.main-bar__watermark'),
            mainPicture = $('.main-bar__main-img'),
            heightMainPicture = mainPicture.height(),
            widthMainPicture = mainPicture.width(),
            heightMiniPicture = miniPicture.height(),
            widthMiniPicture = miniPicture.width(),
            self = miniPicture[0],
            leftPosition = Math.floor(miniPicture.position().left),
            topPosition = Math.floor(miniPicture.position().top),
            position = item.replace(/axis__link/g, '').trim();

            switch (position) {
                case 'arrow__y-up':
                    self.style.top = (topPosition > 0) ? topPosition - 1 + 'px' : '0px';
                    break;
                case 'arrow__y-down':
                    self.style.top = (topPosition < heightMainPicture - heightMiniPicture - 1) ?  2 + topPosition + 'px' : heightMainPicture - heightMiniPicture + 'px';
                    break;
                case 'arrow__x-up':
                    self.style.left = (leftPosition < widthMainPicture - widthMiniPicture - 1) ? 2 + leftPosition + 'px':  widthMainPicture - widthMiniPicture + 'px';
                    break;
                case 'arrow__x-down':
                    self.style.left = (leftPosition > 0)? leftPosition - 1 + 'px' :'0px';
                    break;
                default:
                    miniPicture.css({'top': 0, 'left': 0});
            }
        _showPosition();
    };
    var _changePositionInputTop = function () {
        _clearActive();
        var miniPicture = $('.main-bar__watermark'),
            self = miniPicture[0],
            mainPicture = $('.main-bar__main-img'),
            heightMainPicture = mainPicture.height(),
            heightMiniPicture = miniPicture.height(),
            topPosition = $('.axis__y-input')[0].value;
        self.style.top = topPosition + 'px';
        if(topPosition > heightMainPicture-heightMiniPicture){
            $('.axis__y-input')[0].value = heightMainPicture-heightMiniPicture;
            self.style.top = heightMainPicture-heightMiniPicture + 'px';
        } else {
            self.style.top = topPosition + 'px';
        }
        if(this.value.length > 4){
            this.value = this.value.slice(0,4);
        }
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
            }
    };
    var _changePositionInputLeft = function () {
        _clearActive();

        var miniPicture = $('.main-bar__watermark'),
            self = miniPicture[0],
            mainPicture = $('.main-bar__main-img'),
            widthMainPicture = mainPicture.width(),
            widthMiniPicture = miniPicture.width(),
            leftPosition = $('.axis__x-input')[0].value;
        if(leftPosition > widthMainPicture-widthMiniPicture){
            $('.axis__x-input')[0].value = widthMainPicture-widthMiniPicture;
            self.style.left = widthMainPicture-widthMiniPicture + 'px';
        } else {
            self.style.left = leftPosition + 'px';
        }
        if(this.value.length > 4){
            this.value = this.value.slice(0,4);
        }

        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }

    };

    var _showPosition = function() {

        var miniPicture = $('.main-bar__watermark');

        $('.axis__x-input')[0].value = miniPicture[0].style.left.replace(/px/g, '');
        $('.axis__y-input')[0].value = miniPicture[0].style.top.replace(/px/g, '');
    };

    var mini = $('.main-bar__watermark')[0];

    mini.onmousedown = function(e) {
        _clearActive();
        var miniPic = $('.main-bar__watermark'),
            miniPicture = miniPic[0],
            heightMiniPicture = miniPic.height(),
            widthMiniPicture = miniPic.width(),
            mainPicture = $('.main-bar__main-img'),
            heightMainPicture = mainPicture.height(),
            widthMainPicture = mainPicture.width(),
            self = this;

        var shiftX = e.offsetX,
            shiftY = e.offsetY;
        this.style.position = 'absolute';
        $('.main-bar__img-main')[0].appendChild(miniPicture);
        miniPicture.style.zIndex = 1000;

        moveAt(e);

            function moveAt(e) {
                var mainPictureTop = Math.floor(mainPicture[0].getBoundingClientRect().top),
                    mainPictureLeft = Math.floor(mainPicture[0].getBoundingClientRect().left);

                if(Math.floor(e.pageX - mainPictureLeft -shiftX) <= 0){
                    miniPicture.style.left = '0px';
                    miniPicture.style.top = Math.floor(e.pageY - mainPictureTop - shiftY) + 'px';
                    _showPosition()
                    if(Math.floor(e.pageY - mainPictureTop - shiftY) <= 0){
                        miniPicture.style.top = '0px';
                        _showPosition();}
                    if(Math.floor(e.pageY - mainPictureTop - shiftY) >= heightMainPicture - heightMiniPicture){
                        miniPicture.style.top = heightMainPicture - heightMiniPicture + 'px';
                        _showPosition();}
                } else if(Math.floor(e.pageY - mainPictureTop - shiftY) <= 0){
                    miniPicture.style.top = '0px';
                    miniPicture.style.left = Math.floor(e.pageX - mainPictureLeft -shiftX) + 'px';
                    _showPosition()
                    if(Math.floor(e.pageX - mainPictureLeft -shiftX) >= widthMainPicture - widthMiniPicture){
                        miniPicture.style.left = widthMainPicture-widthMiniPicture + 'px';
                        _showPosition();}
                } else if(Math.floor(e.pageX - mainPictureLeft -shiftX) >= widthMainPicture - widthMiniPicture){
                    miniPicture.style.left = widthMainPicture-widthMiniPicture + 'px';
                    miniPicture.style.top = Math.floor(e.pageY - mainPictureTop - shiftY) + 'px';
                    _showPosition()
                    if(Math.floor(e.pageY - mainPictureTop - shiftY) >= heightMainPicture - heightMiniPicture){
                        miniPicture.style.top = heightMainPicture - heightMiniPicture + 'px';
                        _showPosition();}
                } else if(Math.floor(e.pageY - mainPictureTop - shiftY) >= heightMainPicture - heightMiniPicture){
                    miniPicture.style.top = heightMainPicture - heightMiniPicture + 'px';
                    miniPicture.style.left = Math.floor(e.pageX - mainPictureLeft -shiftX) + 'px';
                    _showPosition();
                } else {
                miniPicture.style.left = Math.floor(e.pageX - mainPictureLeft -shiftX) + 'px';
                miniPicture.style.top = Math.floor(e.pageY - mainPictureTop - shiftY) + 'px';
                _showPosition();
                }

            }

            document.onmousemove = function (e) {
               moveAt(e);

        }
            document.onmouseup = function () {
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



