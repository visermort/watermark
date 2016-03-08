
$(document).ready(function (){

    $('.inputs__download').on('click',function(e){
        e.preventDefault();
        console.log('Команда серверу на создание Watermark');
        var watermarkImgDiv = $('.watermark__img'),
            watermarkImg = $('.main-bar__watermark'),
            positionBottom = $('.position__bottom'),
            mainImage = $('.main-bar__main-img'),
            tiled = (positionBottom.hasClass('view__custom')? 1 : 0);
        var jsonData = {//данные для создания watermark - прозрачность, размеры, отступы, и т.д.
            top: parseInt(watermarkImgDiv.css('top'))+parseInt(watermarkImgDiv.css('padding-top')),
            left: parseInt(watermarkImgDiv.css('left'))+parseInt(watermarkImgDiv.css('padding-left')),
            opacity: watermarkImg.css('opacity'),
            watemarkWidth: watermarkImgDiv[0].width,
            imgWidth: mainImage[0].width,
            watermarkPath: watermarkImg.attr('src'),
            imgPath: mainImage.attr('src'),
            intervalVert : $('.axis__y-input')[0].value ,
            intervalHor : $('.axis__x-input')[0].value,
            tiled: tiled
        };
        console.log(jsonData);
        $.ajax({
            url : 'assets/php/filedownload.php',
            type:"POST",
            dataType: "json",
            data: jsonData,
            beforeSend: function() {
                $('.loading').show();
            }
        }).done( function(response) {
                $('.loading').hide();
                console.log(response);
                var url = response['url'];
                    //,fullUrl = response['fullUrl']
                console.log(url);//путь к картинке
                window.downloadFile(url);

                //в этом месте нужно выводить

            } )
            .fail ( function(response) {
                $('.loading').hide();
                console.log(response); //вывести в popup сообщение  - ошибка работы с удалённым сервером
            } );
    });

    $('.inputs__reset').on('click',function(e){
        e.preventDefault();
        // нужно ввести команду на начальную позицию второго фото

    });
});

window.downloadFile = function (sUrl) {

    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
        alert('Your device does not support files downloading. Please try again in desktop browser.');
        return false;
    }

    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }

        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }

    window.open(sUrl, '_self');
    return true;
};

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
