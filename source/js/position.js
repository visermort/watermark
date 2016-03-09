/**
 * Created by Leisan on 03.03.2016.
 */
var module = (function () {

    var init = function () {
        _setUpListeners();
    };
    var rem = function () {
        _setDownListeners();
    };

    var _setUpListeners = function () {
        $('.position__link').on('click', _changePosition);
        $('.axis__link').off('click', _changeMarginOne);
        $('.axis__link').on('click', _changePositionOne);
        $('.axis__x-input').bind("change keyup input click",_changePositionInputLeft);
        $('.axis__y-input').bind("change keyup input click",_changePositionInputTop);
        var mini = $('.watermark__img')[0];
        mini.onmousedown = function(e) {
            _clearActive();
            var miniPic = $('.watermark__img'),
                miniPicture = miniPic[0],
                heightMiniPicture = miniPic.find('img').height(),
                widthMiniPicture = miniPic.find('img').width(),
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
        _showPosition();
    };

    var _setDownListeners = function () {
        $('.axis__link').off('click', _changePositionOne);
        $('.axis__link').on('click', _changeMarginOne);
        $('.axis__x-input').unbind("change keyup input click",_changePositionInputLeft);
        $('.axis__y-input').unbind("change keyup input click",_changePositionInputTop);

        var mini = $('.watermark__img')[0];

        mini.onmousedown = function(e) {
            _clearActive();
            var miniPic = $('.watermark__img'),
                miniPicture = miniPic[0],
                heightMiniPicture = miniPic.find('img').height(),
                widthMiniPicture = miniPic.find('img').width(),
                heightContainer = miniPic.height(),
                widthContainer = miniPic.width(),
                mainPicture = $('.main-bar__main-img'),
                heightMainPicture = mainPicture.height(),
                widthMainPicture = mainPicture.width(),
                self = this,
                waterImg = miniPic.find('img')[0],
                marginBottom =  (waterImg.style.marginBottom == '') ? 0 : Number(waterImg.style.marginBottom.replace(/px/g, '')),
                marginRight =  (waterImg.style.marginRight == '') ? 0 : Number(waterImg.style.marginRight.replace(/px/g, '')),
                mainPictureTop = Math.floor(mainPicture[0].getBoundingClientRect().top),
                mainPictureLeft = Math.floor(mainPicture[0].getBoundingClientRect().left),
                containerTop = Math.floor(miniPicture.getBoundingClientRect().top),
                containerLeft = Math.floor(miniPicture.getBoundingClientRect().left);


            var shiftX = Math.floor((e.pageX - containerLeft - 30)/(widthMiniPicture + marginRight))*(widthMiniPicture + marginRight) + e.offsetX,
                shiftY = Math.floor((e.pageY - containerTop - 30)/(heightMiniPicture + marginBottom))*(heightMiniPicture + marginBottom) + e.offsetY;
            this.style.position = 'absolute';
            $('.main-bar__img-main')[0].appendChild(miniPicture);
            miniPicture.style.zIndex = 1000;

            moveAt(e);
            function moveAt(e) {
            console.log(Math.floor(e.pageX - mainPictureLeft -shiftX), Math.floor(e.pageY - mainPictureTop - shiftY),  heightMainPicture - heightContainer - 60, widthMainPicture - widthContainer - 60)
                if (Math.floor(e.pageX - mainPictureLeft -shiftX) >= 0) {
                    miniPicture.style.top = Math.floor(e.pageY - mainPictureTop - shiftY) - 30 + 'px';
                    miniPicture.style.left = '0px';
                    if (Math.floor(e.pageY - mainPictureTop - shiftY) >= 0) {
                        miniPicture.style.top = '0px';
                    }
                    if (Math.floor(e.pageY - mainPictureTop - shiftY) <= heightMainPicture - heightContainer - 60) {
                        miniPicture.style.top = heightMainPicture - heightContainer - 60 + 'px';
                    }
                } else if (Math.floor(e.pageY - mainPictureTop - shiftY) >= 0) {
                    miniPicture.style.top = '0px';
                    miniPicture.style.left = Math.floor(e.pageX - mainPictureLeft - shiftX) - 30 + 'px';
                    if (Math.floor(e.pageX - mainPictureLeft - shiftX) <= widthMainPicture -  widthContainer - 60) {
                        miniPicture.style.left = widthMainPicture - widthContainer - 60 + 'px';
                    }
                } else if (Math.floor(e.pageX - mainPictureLeft - shiftX) <= widthMainPicture - widthContainer - 30) {
                    miniPicture.style.left = widthMainPicture - widthContainer - 60 + 'px';
                    miniPicture.style.top = Math.floor(e.pageY - mainPictureTop - shiftY) - 30 + 'px';
                    if (Math.floor(e.pageY - mainPictureTop - shiftY) <= heightMainPicture - heightContainer - 30) {
                        miniPicture.style.top = heightMainPicture - heightContainer - 60 + 'px';
                    }
                } else if (Math.floor(e.pageY - mainPictureTop - shiftY) <= heightMainPicture - heightContainer - 60) {
                    miniPicture.style.top = heightMainPicture - heightContainer - 60 + 'px';
                    miniPicture.style.left = Math.floor(e.pageX - mainPictureLeft - shiftX) - 30 + 'px';
                } else {
                    miniPicture.style.left = Math.floor(e.pageX - mainPictureLeft - shiftX) - 30 + 'px';
                    miniPicture.style.top = Math.floor(e.pageY - mainPictureTop - shiftY) - 30 + 'px';
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
        _showMargin();
    };
    var _clearActive = function() {
        $('.position__link').removeClass('position__link-active');
    };
    var _changePosition = function (e) {
        e.preventDefault();

        var $this = $(this),
            item = $this.attr("class"),
            miniPicture = $('.watermark__img'),
            mainPicture = $('.main-bar__main-img'),
            position = item.replace(/position__link/g, '').trim(),
            heightMainPicture = mainPicture.height(),
            widthMainPicture = mainPicture.width(),
            heightMiniPicture = miniPicture.find('img').height(),
            widthMiniPicture = miniPicture.find('img').width();

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
            miniPicture = $('.watermark__img'),
            mainPicture = $('.main-bar__main-img'),
            heightMainPicture = mainPicture.height(),
            widthMainPicture = mainPicture.width(),
            heightMiniPicture = miniPicture.find('img').height(),
            widthMiniPicture = miniPicture.find('img').width(),
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
    var _changeMarginOne = function (e) {

        e.preventDefault();
        var $this = $(this),
            item = $this.attr("class"),
            miniPicture = $('.main-bar__watermark'),
            widthLine = $('.pos-div__y'),
            heightLine = $('.pos-div__x'),
            position = item.replace(/axis__link/g, '').trim();
            widthLine[0].style.width = widthLine.width() + 'px';
            heightLine[0].style.height = heightLine.height() + 'px';

            switch (position) {
                case 'arrow__y-up':
                    if(widthLine.width() < 99){
                        miniPicture.css('margin-right', '+=' + 5);
                        widthLine[0].style.width = parseInt(widthLine[0].style.width) + 5 + 'px';
                        _changeCont();
                    } else {
                        miniPicture.css({'margin-right': 100})
                        widthLine[0].style.width = '100px';
                        _changeCont();
                    }
                    break;
                case 'arrow__y-down':
                    if(widthLine.width() > 5){
                        miniPicture.css('margin-right', '-=' + 5);
                        widthLine[0].style.width = parseInt(widthLine[0].style.width) - 5 + 'px';
                        _changeCont();
                    } else {
                        miniPicture.css({'margin-right': 0});
                        widthLine[0].style.width = '1px';
                        _changeCont();
                    }
                    break;
                case 'arrow__x-up':
                    if(heightLine.height() < 99){
                        miniPicture.css('margin-bottom', '+=' + 5);
                        heightLine[0].style.height = parseInt(heightLine[0].style.height) + 5 + 'px';
                        _changeCont();
                    } else {
                        miniPicture.css({'margin-bottom': 100});
                        heightLine[0].style.height = '100px';
                        _changeCont();
                    }
                    break;
                case 'arrow__x-down':
                    if(heightLine.height() > 5){
                        miniPicture.css('margin-bottom', '-=' + 5);
                        heightLine[0].style.height = parseInt(heightLine[0].style.height) - 5 + 'px';
                        _changeCont();
                    } else {
                        miniPicture.css({'margin-bottom': 0});
                        heightLine[0].style.height ='1px';
                        _changeCont();
                    }
                    break;
                default:
                    miniPicture.css({'top': 0, 'left': 0});
            }
        _showMargin();
    };
    var _changeCont = function () {
        var contPicture = $('.watermark__img'),
            mainPicture = $('.main-bar__main-img'),
            heightMainPicture = mainPicture.height(),
            widthMainPicture = mainPicture.width(),
            heightMiniPicture = contPicture.find('img').height(),
            widthMiniPicture = contPicture.find('img').width(),
            waterImg = contPicture.find('img')[0],
            marginBottom =  (waterImg.style.marginBottom == '') ? 0 : Number(waterImg.style.marginBottom.replace(/px/g, '')),
            marginRight =  (waterImg.style.marginRight == '') ? 0 : Number(waterImg.style.marginRight.replace(/px/g, ''));

        contPicture.css({'width': (Math.ceil(widthMainPicture/widthMiniPicture) + 1)*(widthMiniPicture+marginRight)+60, 'height': Math.ceil(heightMainPicture/heightMiniPicture + 1)*(heightMiniPicture+marginBottom)+60});

    }
    var _changePositionInputTop = function () {
        _clearActive();
        var miniPicture = $('.watermark__img'),
            self = miniPicture[0],
            mainPicture = $('.main-bar__main-img'),
            heightMainPicture = mainPicture.height(),
            heightMiniPicture = miniPicture.find('img').height(),
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

        var miniPicture = $('.watermark__img'),
            self = miniPicture[0],
            mainPicture = $('.main-bar__main-img'),
            widthMainPicture = mainPicture.width(),
            widthMiniPicture = miniPicture.find('img').width(),
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

        var miniPicture = $('.watermark__img');

        $('.axis__x-input')[0].value = (miniPicture[0].style.left == '') ? 0 : miniPicture[0].style.left.replace(/px/g, '');
        $('.axis__y-input')[0].value = (miniPicture[0].style.top == '') ? 0 : miniPicture[0].style.top.replace(/px/g, '');
    };
    var _showMargin = function() {

        var miniPicture = $('.main-bar__watermark');

        $('.axis__y-input')[0].value = (miniPicture[0].style.marginRight == '') ? 0 : miniPicture[0].style.marginRight.replace(/px/g, '');
        $('.axis__x-input')[0].value = (miniPicture[0].style.marginBottom == '') ? 0 : miniPicture[0].style.marginBottom.replace(/px/g, '');

    };



    return {
        init : init,
        rem : rem
    };

}) ();
module.init();



