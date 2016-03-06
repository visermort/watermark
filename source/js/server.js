
$(document).ready(function (){

    $('.inputs__download').on('click',function(e){
        e.preventDefault();
        console.log('Команда серверу на склейку');
        var jsonData = {//сюда ещё данные - прозрачность, пропорции, и всё такое
            top: $('.axis__y-input')[0].value ,
            left: $('.axis__x-input')[0].value,
            opacity: $('.main-bar__watermark').css('opacity'),
            watemarkWidth: $('.main-bar__watermark')[0].width,
            imgWidth: $('.main-bar__main-img')[0].width
        };
        console.log(jsonData);
        $.ajax({
            url : 'assets/php/filedownload.php',
            type:"POST",
            dataType: "json",
            data: jsonData,
            beforeSend: function() {
                $('.loading').show();
            };
        }).done( function(response) {
                console.log(response);
                var url = response['url'],
                    fullUrl = response['fullUrl'];
                console.log(url);//путь к картинке - нужно вывести её на показ в слой
                window.downloadFile(url);
                //в этом месте нужно выводить


            } )
            .fail ( function(response) {
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
