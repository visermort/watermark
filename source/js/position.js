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
        $('.inputs__reset').on('click', _reset);
        $('.axis__link').off('click', _changeMarginOne);
        $('.axis__link').on('click', _changePositionOne);
        $('.axis__x-input').unbind("change keyup input click",_changeMarginInputLeft);
        $('.axis__y-input').unbind("change keyup input click",_changeMarginInputTop);
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
            e.preventDefault();

            function moveAt(e) {
                var mainPictureTop = Math.floor(mainPicture[0].getBoundingClientRect().top),
                    mainPictureLeft = Math.floor(mainPicture[0].getBoundingClientRect().left);
                if(e.target !== $('.ui-resizable-s')[0] && e.target !== $('.ui-resizable-e')[0] && e.target !== $('.ui-resizable-se')[0] && e.target && e.target !== $('.watermark__img.ui-resizable')[0] && e.target){
                    if(Math.floor(e.pageX - mainPictureLeft -shiftX) <= 0){
                        miniPicture.style.left = '0px';
                        miniPicture.style.top = Math.floor(e.pageY - mainPictureTop - shiftY) + 'px';
                        _showPosition();
                        if(Math.floor(e.pageY - mainPictureTop - shiftY) <= 0){
                            miniPicture.style.top = '0px';
                            _showPosition();}
                        if(Math.floor(e.pageY - mainPictureTop - shiftY) >= heightMainPicture - heightMiniPicture){
                            miniPicture.style.top = heightMainPicture - heightMiniPicture + 'px';
                            _showPosition();}
                    } else if(Math.floor(e.pageY - mainPictureTop - shiftY) <= 0){
                        miniPicture.style.top = '0px';
                        miniPicture.style.left = Math.floor(e.pageX - mainPictureLeft -shiftX) + 'px';
                        _showPosition();
                        if(Math.floor(e.pageX - mainPictureLeft -shiftX) >= widthMainPicture - widthMiniPicture){
                            miniPicture.style.left = widthMainPicture-widthMiniPicture + 'px';
                            _showPosition();}
                    } else if(Math.floor(e.pageX - mainPictureLeft -shiftX) >= widthMainPicture - widthMiniPicture){
                        miniPicture.style.left = widthMainPicture-widthMiniPicture + 'px';
                        miniPicture.style.top = Math.floor(e.pageY - mainPictureTop - shiftY) + 'px';
                        _showPosition();
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
            }

            document.onmousemove = function (e) {
                moveAt(e);
            };
            document.onmouseup = function () {
                document.onmousemove = self.onmouseup = null;
            }
        };
        mini.ondragstart = function () {
            return false;
        };
        var resize = $(".watermark__img" );
        resize.resizable({
            aspectRatio: false,
            containment: ".main-bar__main-img",
            minHeight: 50,
            minWidth: 50,
            resize: function (event,ui) {
                event.preventDefault();
                $('.main-bar__watermark').height(Math.round(ui.size.height));
                $('.main-bar__watermark').width(Math.round(ui.size.width));
            }
        });
        resize.on( "resizestart", function( e, ui ) {
                    document.onmousemove = mini.onmouseup = null;
        } );
        _showPosition();
    };

    var _setDownListeners = function () {
        $('.inputs__reset').on('click', _reset);
        $('.axis__link').off('click', _changePositionOne);
        $('.axis__link').on('click', _changeMarginOne);
        $('.axis__x-input').unbind("change keyup input click",_changePositionInputLeft);
        $('.axis__y-input').unbind("change keyup input click",_changePositionInputTop);
        $('.axis__x-input').bind("change keyup input click",_changeMarginInputLeft);
        $('.axis__y-input').bind("change keyup input click",_changeMarginInputTop);
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

            if(e.target == e.currentTarget){
                var shiftX = e.offsetX - 30,
                    shiftY = e.offsetY - 30;
            } else {

                var shiftX = Math.floor((e.pageX - containerLeft - 30)/(widthMiniPicture + marginRight))*(widthMiniPicture + marginRight) + e.offsetX,
                    shiftY = Math.floor((e.pageY - containerTop - 30)/(heightMiniPicture + marginBottom))*(heightMiniPicture + marginBottom) + e.offsetY;
            }

            this.style.position = 'absolute';
            $('.main-bar__img-main')[0].appendChild(miniPicture);
            miniPicture.style.zIndex = 1000;

            moveAt(e);
            function moveAt(e) {
                e.preventDefault();
                if (Math.floor(e.pageX - mainPictureLeft -shiftX) >= 30) {
                    miniPicture.style.top = Math.floor(e.pageY - mainPictureTop - shiftY) - 30 + 'px';
                    miniPicture.style.left = '0px';
                    if (Math.floor(e.pageY - mainPictureTop - shiftY) >= 30) {
                        miniPicture.style.top = '0px';
                    }
                    if (Math.floor(e.pageY - mainPictureTop - shiftY) <= heightMainPicture - heightContainer - 60) {
                        miniPicture.style.top = heightMainPicture - heightContainer - 60 + 'px';
                    }
                } else if (Math.floor(e.pageY - mainPictureTop - shiftY) >= 30) {
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
                if($('.axis__y-input')[0].value > 100){
                    miniPicture.css('margin-right', '+=' + 5);
                    widthLine[0].style.width = '100px';
                    _changeCont();
                } else if(widthLine.width() < 99){
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
                if($('.axis__y-input')[0].value > 100) {
                    miniPicture.css('margin-right', '-=' + 5);
                    widthLine[0].style.width = '100px';
                    _changeCont();
                }else if(widthLine.width() > 5){
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
                if($('.axis__x-input')[0].value > 100){
                    miniPicture.css('margin-bottom', '+=' + 5);
                    heightLine[0].style.height = '100px';
                    _changeCont();
                } else if(heightLine.height() < 99){
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
                if($('.axis__x-input')[0].value > 100){
                    miniPicture.css('margin-bottom', '-=' + 5);
                    heightLine[0].style.height = '100px';
                    _changeCont();
                } else if(heightLine.height() > 5){
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
    var _changeMarginInputLeft = function () {

        var miniPic = $('.main-bar__watermark'),
            widthLine = $('.pos-div__y'),
            heightLine = $('.pos-div__x'),
            miniPicture = $('.watermark__img'),
            mainPicture = $('.main-bar__main-img'),
            heightMainPicture = mainPicture.height(),
            heightMiniPicture = miniPicture.find('img').height(),
            marginBottom = $('.axis__x-input')[0].value;

        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }

        widthLine[0].style.width = widthLine.width() + 'px';
        heightLine[0].style.height = heightLine.height() + 'px';

        if(marginBottom >= heightMainPicture-heightMiniPicture){
            $('.axis__x-input')[0].value = heightMainPicture-heightMiniPicture;
            miniPic.css({'margin-bottom': heightMainPicture-heightMiniPicture});
            _changeCont();
            heightLine[0].style.height = '100px';
        } else if(marginBottom == 0) {
            miniPic.css({'margin-bottom': 0});
            _changeCont();
            heightLine[0].style.height ='1px';
        } else if(marginBottom <= 100) {
            heightLine[0].style.height = marginBottom + 'px';
            miniPic.css({'margin-bottom': parseInt(heightLine[0].style.height)});
            _changeCont();
        } else {
            miniPic.css({'margin-bottom': parseInt(marginBottom)});
            heightLine[0].style.height = '100px';
            _changeCont();
        }
    };
    var _changeMarginInputTop = function () {

        var miniPic = $('.main-bar__watermark'),
            widthLine = $('.pos-div__y'),
            heightLine = $('.pos-div__x'),
            miniPicture = $('.watermark__img'),
            mainPicture = $('.main-bar__main-img'),
            widthMainPicture = mainPicture.width(),
            widthMiniPicture = miniPicture.find('img').width(),
            marginRight = $('.axis__y-input')[0].value;

        widthLine[0].style.width = widthLine.width() + 'px';
        heightLine[0].style.height = heightLine.height() + 'px';

        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }

        if(marginRight > widthMainPicture-widthMiniPicture){
            $('.axis__y-input')[0].value = widthMainPicture-widthMiniPicture;
            miniPic.css({'margin-right': widthMainPicture-widthMiniPicture});
            _changeCont();
            widthLine[0].style.width = '100px';
        } else if(marginRight == 0) {
            miniPic.css({'margin-right': 0});
            _changeCont();
            widthLine[0].style.width = '1px';
        } else if(marginRight <= 100) {
            _changeCont();
            widthLine[0].style.width = marginRight + 'px';
            miniPic.css({'margin-right': parseInt(widthLine[0].style.width)});
        } else {
            miniPic.css({'margin-right': parseInt(marginRight)});
            widthLine[0].style.width = '100px';

            _changeCont();
        }
    };

    var _reset = function () {
        var positionBottom = $('.position__bottom');
        _clearActive();
        var miniCont = $('.main-bar__watermark'),
            widthLine = $('.pos-div__y'),
            heightLine = $('.pos-div__x'),
            naturalWidth = miniCont.prop('naturalWidth'),
            naturalHeight = miniCont.prop('naturalHeight'),
            miniPicture = $('.watermark__img')[0];
        widthLine[0].style.width = widthLine.width() + 'px';
        heightLine[0].style.height = heightLine.height() + 'px';

        miniCont.css('margin-right', 0);
        miniCont.css('margin-bottom', 0);
        if(naturalWidth > 0 && naturalHeight > 0){
            miniCont.css('width', naturalWidth);
            miniCont.css('height', naturalHeight);
        }
        widthLine[0].style.width = '1px';
        heightLine[0].style.height = '1px';
        miniCont.css('opacity', 1);
        $('img.copy').remove();
        miniPicture.style.padding = '0px';
        miniPicture.style.top = '0px';
        miniPicture.style.left = '0px';
        $('.ui-slider-range-max').css('width', '100%');
        $('.ui-slider-handle').css('left', '0%');
        $('.ui-resizable').css({'width': naturalWidth, 'height': naturalHeight});
        if($('.view-1').hasClass('active-random')){
            positionBottom.removeClass('view__custom');
            $('.view-1').removeClass('active-random');
            positionBottom.addClass('view__random');
            $('.view-2').addClass('active-custom');
            module.init();
            //$('.ui-resizable').css({'width': naturalWidth, 'height': naturalHeight});
        }
        _showPosition();
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
        rem : rem,
        reset : _reset
    };

}) ();
module.init();



