
$(document).ready(function (){

    sendFileToDownload = function () {
        $('body').append('<iframe src="assets/php/filetodownload.php" frameborder="0" class="filetodownload-hide-frame"></iframe>');
    };

    clearTmp = function() { //после загрузки страницы команда серверу на очистку от старых файлов
        $.ajax({
            url : 'assets/php/utils.php',
            type:"POST",
            dataType: "json",
            data: {
                clear: 1,
                lang: messageLang.getLanguage()  //текущий язык в бек
                }
        }).done( function(response) {
            if (!response['status']) {
                console.log(response['message']);
            }
            })
        .fail ( function(response) {
            console.log(response);
        });
    }();

    $('.inputs__download').on('click',function(e){
        e.preventDefault();
        var watermarkImgDiv = $('.watermark__img'),
            watermarkImg = $('.main-bar__watermark'),//main-bar__watermark
            positionBottom = $('.position__bottom'),
            mainImage = $('.main-bar__main-img'),
            tiled = (positionBottom.hasClass('view__custom')? 1 : 0),
            jsonData = {//данные для создания watermark - прозрачность, размеры, отступы, и т.д.
                top: parseInt(watermarkImgDiv.css('top'))+parseInt(watermarkImgDiv.css('padding-top')),
                left: parseInt(watermarkImgDiv.css('left'))+parseInt(watermarkImgDiv.css('padding-left')),
                opacity: watermarkImg.css('opacity'),
                watemarkWidth:  watermarkImg[0].width,
                imgWidth: mainImage[0].width,
                watermarkPath: watermarkImg.attr('src'),
                imgPath: mainImage.attr('src'),
                intervalHor : $('.axis__y-input')[0].value ,
                intervalVert : $('.axis__x-input')[0].value,
                tiled: tiled,
                lang: messageLang.getLanguage()  //текущий язык в бек
    };
//        console.log(watermarkImg);
//        console.log(jsonData);
        $.ajax({
            url : 'assets/php/filedownload.php',
            type:"POST",
            dataType: "json",
            data: jsonData,
            beforeSend: function() {
                $('.preloader').show();
            }
        }).done( function(response) {
                $('.preloader').hide();
                if (response['status']) {
                    sendFileToDownload();
//                    console.log(response);
                    popup.show('success', messageLang.getMessage('message4'));//файл передан на скачивание
                } else {
                    console.log(response['message']);
                    popup.show('error', messageLang.getMessage('message5'));//ошибка при формировании файла
                }
            } )
            .fail ( function(response) {
                $('.preloader').hide();
                console.log(response); //вывести в popup сообщение  - ошибка работы с удалённым сервером
                popup.show('error', messageLang.getMessage('message6'));//ошибка работы с удалённым сервером
            } );
    });

});

