(function () {
    'use strict';

    var forms,
        fileList,
        progressBar;

    init();

    function init() {
        forms = ['#image-upload__form', '#watermark__form'];
        progressBar = $('#progress .progress-bar');
        fileUpload();
    }

    function fileUpload () {

        $.each(forms, function(index, item) {

            var 
                mainImg = $('.main-bar__main-img'), // основная картинка
                watermark = $('.watermark_img'),    //слой со второй картинкой
                watermarkContent = $('.main-bar__watermark'), //вторая картинка
                current;

            if (item == '#image-upload__form') {
                current = mainImg;
            } else if (item == '#watermark__form') {
                current = watermark;
            }

            $(item).fileupload({

                url: 'assets/php/fileupload.php',
                disableImageResize: false,
                process:[
                    {
                        action: 'load',
                        fileTypes: /^image\/(gif|jpeg|png)$/,
                        maxFileSize: 4000000 
                    },
                    {
                        action: 'resize',
                        maxWidth: 650,
                        minWidth: 50,
                        minHeight: 50
                    },
                    {
                        action: 'save'
                    }
                ],

                add: function(e, data) {

                    var $this = $(this);

                    progressBar.css('width', 0);

                    if (!~data.files[0].type.indexOf('image')) {
                        popup.show('error', 'Ошибка! Загрузите картинку');
                    } else if (data.files[0].size > 4000000) {
                        popup.show('error', 'Ошибка! Файл слишком большой');
                    } else {

                        data
                            .process (function () {
                                return $this.fileupload('process', data);
                            })
                            .done (function() {
                                data.submit();
                            });
                    }
                },

                beforeSend: function() {
                    $('.loading').show();
                },

                done: function (e, data) {
                    
                    var upload = data.result.files[0];

                    $('.loading').hide();
                    popup.show('success', 'Файл успешно загружен');
                    
                    if (current ==  mainImg) {
                        current
                            .attr('src', upload.url)
                            .show();

                        current.get(0).onload = function() {
                            watermarkSize.change(mainImg, watermarkContent); //watermark);
                        };

                        $('.watermark__form-disabled').removeClass('watermark__form-disabled');
                    } else {
                        watermark.show();
                        $(".watermark__img")[0].style.top = '0px';
                        $(".watermark__img")[0].style.left = '0px';
                        $(".watermark__img")[0].style.display = 'block';
                        watermarkContent.attr('src', upload.url);
                        watermarkContent.get(0).onload = function() {
                            watermarkSize.change(mainImg, watermarkContent); //watermark);
                        };
                        
                        $('.side-bar__transparency-disabled').removeClass('side-bar__transparency-disabled');
                        $('.side-bar__position-disabled').removeClass('side-bar__position-disabled');
                        $('.inputs__download').removeAttr('disabled');
                        $('.inputs__reset').removeAttr('disabled');

                    }
                },

                fail: function (e,data) {
                    $('.loading').hide();
                    progressBar.css('width', 0);
                    popup.show('error', 'Ошибка! Файл не загружен');
                },

                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);

                    function set() {
                        progressBar.css('width', progress + '%');
                    }
                    
                    setTimeout(set, 500);
                }
            });
        });
    }

})();

