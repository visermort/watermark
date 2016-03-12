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

        $.each(forms, function(index, form) {

            var 
                $form = $(form),
                mainImg = $('.main-bar__main-img'), // основная картинка
                watermark = $('.watermark_img'),    //слой со второй картинкой
                watermarkContent = $('.main-bar__watermark'), //вторая картинка
                current;

            if (form == '#image-upload__form') {
                current = mainImg;
            } else if (form == '#watermark__form') {
                current = watermark;
            }

            $form.fileupload({

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
                        inputFile.valid = false;
                        popup.show('error', messageLang.getMessage('message0'));//загружите картинку
                    } else if (data.files[0].size > 4000000) {
                        inputFile.valid = false;
                        popup.show('error', messageLang.getMessage('message1'));//файл слишком большой
                    } else {
                        inputFile.valid = true;
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
                    $('.preloader').show();
                },

                done: function (e, data) {
                    
                    var upload = data.result.files[0];

                    $('.preloader').hide();
                    popup.show('success', messageLang.getMessage('message3'));//файл успешно загружен

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

                        $(".watermark__img")[0].style.display = 'block';
                        watermarkContent.attr('src', upload.url);
                        watermarkContent.get(0).onload = function() {
                            watermarkSize.change(mainImg, watermarkContent); //watermark);
                        };

                        $('.side-bar__transparency-disabled').removeClass('side-bar__transparency-disabled');
                        $('.side-bar__position-disabled').removeClass('side-bar__position-disabled');
                        $('.inputs__download').removeAttr('disabled');
                        $('.inputs__reset').removeAttr('disabled');
                        module.reset();
                    }
                },

                fail: function (e,data) {
                    $('.preloader').hide();
                    progressBar.css('width', 0);
                    popup.show('error', messageLang.getMessage('message2'));//ошибка, файл не загружен
                },

                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);

                    function set() {
                        progressBar.css('width', progress + '%');
                    }
                    
                    setTimeout(set, 500);
                    hideProgress();
                }
            });
        });
    }

    function hideProgress() {

        function hide() {
            progressBar.css('width', 0 + '%');
        }

        setTimeout(hide, 3400);

    }

})();

