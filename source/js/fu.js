(function () {
    'use strict';

    var forms,
        fileList;

    init();
    attachEvents();

    function init() {
        forms = ['#img-upload', '#watermark-upload'];
        fileUpload();
    }

    function attachEvents() {
    }

    function fileUpload () {

        $.each(forms, function(index, item) {

            var image = $(item).find('.test-img');

            $(item).fileupload({

                url: 'assets/php/index.php',
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

                done: function (e, data) {
                    var upload = data.result.files[0];

                    image
                        .attr('src', upload.url)
                        .show();
                }
            });
        });
    }

})();
