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
                watermark = $('.main-bar__watermark'),
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
                        $(".main-bar__watermark")[0].style.top = '0px';
                        $(".main-bar__watermark")[0].style.left = '0px';
                        data
                            .process(function () {
                            return $this.fileupload('process', data);
                        })
                            .done(function() {
                            data.submit();
                        });
                    }
                },

                done: function (e, data) {
                    var upload = data.result.files[0];
                    console.log(e.target.id, upload.url);
                    current
                        .attr('src', upload.url)
                        .show();
                    var jsonData = { 'formId': e.target.id , 'fileUlr' : upload.url };
                    $.ajax({ //данные о загруженном файле снова отправляем на сервер
                        url : 'assets/php/writesession.php',
                        type:"POST",
                        dataType: "json",
                        data: jsonData
                    }).done( function(response) {
                            console.log(response);
                        } )
                        .fail ( function(response) {
                            console.log(response);
                        } );

                }
            });
        });
    }

})();



$(document).ready(function (){
    $('.inputs__download').on('click',function(e){
            e.preventDefault();
            console.log('Команда серверу на склейку');
            var jsonData = { watemarkTop: 0 , watemarkLeft: 0 }; //сюда ещё данные - прозрачность и всё такое
            console.log(jsonData);
            $.ajax({ //данные о загруженном файле снова отправляем на сервер
                url : 'assets/php/filedownload.php',
                type:"POST",
                dataType: "json",
                data: jsonData
            }).done( function(response) {
                    console.log(response);
                } )
                .fail ( function(response) {
                    console.log(response);
                } );
    });
});
