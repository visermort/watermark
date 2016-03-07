<?php





//отправка файла на скачивание
function getFileToDownload($fileName) {
    // Контент-тип означающий скачивание
    header("Content-Type: application/octet-stream");
    // Размер в байтах
    header("Accept-Ranges: bytes");
    // Размер файла
    header("Content-Length: ".filesize($fileName));
    // Расположение скачиваемого файла
    header("Content-Disposition: attachment; filename=".$fileName);
    // Прочитать файл
    readfile($fileName);
}

$url = $_POST['url'];

if (!$url){
    header("content-type: application/json");
    exit( json_encode(array(
        'status' => false ,
        'message' => 'Нет url файла для закачки!'
    )));
}
//из пути к файлу вырезать лишнюю часть
if ( stristr( $url , $settings['phpPath'] )) {
    $url = substr($url, strlen($settings['phpPath'])) ;
}

//getFileToDownload($url); //отправляем на закачку


header("content-type: application/json");
exit( json_encode(array(
    'status' => true ,
    'message' => 'Выдача файла на скачивание - ОК',
    'url' => $url
)));

//Сразу вопрос - Где должен быть показ картинки результата? В окне барузера на полный экран?  И не лучше ли вначале показать картинку, и потом уже (если она понравилась) пользователь жмёт на "сохранить", а не скачать, потом увидеть?