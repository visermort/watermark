var messageLang = function () {

    var messages = {
        message0: {ru: 'Ошибка! Загрузите картинку',en:'Please, upload image file' },
        message1: {ru: 'Ошибка! Файл слишком большой',en:'Sorry! File is too big' },
        message2: {ru: 'Ошибка! Файл не загружен',en:'Error! File have not uploaded' },
        message3: {ru: 'Файл успешно загружен',en:'File is uploaded sucessfully' },
        message4: {ru: 'Файл с водяным знаком передан на скачивание',en:'File with watermark sent for download' },
        message5: {ru: 'Ошибка при формировании водяного знака!',en:'Some error making image with watermakr!' },
        message6: {ru: 'Ошибка работы с удалённым сервером',en:'Error connecting to remote server' },
        message7: {ru: 'Ваше устройство не поддерживает скачивание файлов. Повторите это на компьютере.',en:'Your device does not support files downloading. Try again in desktop browser.' }
    };

    var getCurrentLanguage = function () {
        return $('.lang__active').attr('lang');//ru en
    };

    var getMess = function (idMessage){
        var langId=getCurrentLanguage();
            return messages[idMessage][langId];
    };


    return {

        getMessage: getMess,
        getLanguage: getCurrentLanguage

    };
}();
