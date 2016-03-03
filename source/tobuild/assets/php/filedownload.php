<?php

header("content-type: application/json");

include ('lib/abeautifulsite/SimpleImage.php');
include ('settings.php');


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

session_start(); //обращение к сессии

if (!$_SESSION or !$_SESSION['imageFile'] or !$_SESSION['watermarkFile']) {
    exit( json_encode(array(
        'status' => false ,
        'message' => 'Не загружены одна или оба изображения',
        'sessionimagefile' => $_SESSION['imageFile'] ,
        'sessinonmarkapfile '  => $_SESSION['watermarkFile']
    )));
}

$mainImage = new abeautifulsite\SimpleImage($settings['imageShortPath'] . $_SESSION['imageFile']);
$watermarkImage = new abeautifulsite\SimpleImage($settings['imageShortPath'] . $_SESSION['watermarkFile']);

$opacity = 0.5;
$left = 0;
$top = 0;
//получить данные из пост

//далее  $watermarkImage нужно ресайзить в соответсвии с тем, что получили из POST



//сформировать новое имя файла
$newFileName = $settings['imageShortPath'].substr(md5(rand(1,10000)),0,16).'.jpg';

$mainImage -> overlay($watermarkImage, 'top left', $opacity, $left, $top ) ->  save($newFileName);


//getFileToDownload($newFileName);

exit( json_encode(array( 'status' => true ,
    'url' =>$settings['phpPath'].$newFileName ,
    'message' => 'Склейка изображения выполнена, файл отдан на скачивание' )));