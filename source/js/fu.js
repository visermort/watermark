(function () {
    'use strict';

    var forms,
        fileList;

    init();
    attachEvents();

    function init() {
        forms = ['#image-upload__form', '#watermark__form'];
        fileUpload();
    }

    function attachEvents() {
    }



    function fileUpload () {

        $.each(forms, function(index, item) {

            var mainImg = $('.main-bar__main-img'),
                watermark = $('.watermark_img'),
                watermarkContent = $('.main-bar__watermark'),
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
                    if (!~data.files[0].type.indexOf('image')) {
                        console.log('Загрузите картинку');
                    } else if (data.files[0].size > 4000000) {
                        console.log('Файл слишком большой');
                    } else {
                        var $this = $(this);
                        data
                            .process(function () {
                            return $this.fileupload('process', data);
                        })
                            .done(function() {
                            data.submit();
                        });
                    }
                },

                beforeSend: function() {
                    $('.loading').show();
                },

                done: function (e, data) {
                    
                    $('.loading').hide();

                    var upload = data.result.files[0];
//                    console.log(e.target.id, upload.url);

                    if(current ==  mainImg){
                        current
                            .attr('src', upload.url)
                            .show();
                    } else {
                        watermark.show();
                        $(".watermark__img")[0].style.top = '0px';
                        $(".watermark__img")[0].style.left = '0px';
                        $(".watermark__img")[0].style.display = 'block';
                        watermarkContent.attr('src', upload.url);
                    }


                    current
                        .attr('src', upload.url)
                        .show();

                    current.get(0).onload = function() {
                        watermarkSize.change(mainImg, watermark);
                    }; 

                },
                fail: function (e,data) {
                    $('.loading').hide();
                    console.log(data);
                }
            });
        });
    }

})();

