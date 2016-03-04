
$(document).ready(function (){

    $('.inputs__download').on('click',function(e){
        e.preventDefault();
        console.log('Команда серверу на склейку');
        var jsonData = {//сюда ещё данные - прозрачность, пропорции, и всё такое
            watemarkTop: 0 ,
            watemarkLeft: 0
        };
        console.log(jsonData);
        $.ajax({
            url : 'assets/php/filedownload.php',
            type:"POST",
            dataType: "json",
            data: jsonData
        }).done( function(response) {
                console.log(response);
                var url = response['url'];
                console.log(url);//путь к картинке - нужно вывести её на показ в слой
                //Снова запрос на сервер - выдать файл на скачивание
                var jsonData = {
                    url: url
                };
                console.log(jsonData);
                $.ajax({
                    url : 'assets/php/utils.php',
                    type:"POST",
                    dataType: "json",
                    data: jsonData
                }).done( function(response) {
                        console.log(response);
                        if(response['status']){
                            //всё прошло хорощо, файл отдан на скачивание

                        }else{
                            //что-то пошло не так с отдачей на скачивание - нужно вывести
                            console.log(response['message']);
                        }
                    } )
                    .fail ( function(response) {
                        console.log(response); //вывести в popup сообщение  - ошибка работы с удалённым сервером
                    } );
            } )
            .fail ( function(response) {
                console.log(response); //вывести в popup сообщение  - ошибка работы с удалённым сервером
            } );
    });

    $('.inputs__reset').on('click',function(e){
        e.preventDefault();
        // нужно ввести команду на очистку полей с фото
        // и далее команда серверу на очистку данных сессии
        var jsonData = {
            clearCach: 1
        };
        console.log(jsonData);
        $.ajax({
            url : 'assets/php/utils.php',
            type:"POST",
            dataType: "json",
            data: jsonData
        }).done( function(response) {
                console.log(response);//делать ничего не нужно, только контроль
            } )
            .fail ( function(response) {
                console.log(response); //вывести в popup сообщение  - ошибка работы с удалённым сервером
            } );

    });
});

