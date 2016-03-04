<?php

header("content-type: application/json");

include ('lib/abeautifulsite/SimpleImage.php');
include ('settings.php');


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

//получить данные из пост

$opacity = 0.7;
if ($_POST['opacity'])  $opacity = $_POST['opacity'];
$left = $_POST['left'];
$top =  $_POST['top'];
$imageWidth = $_POST['imgWidth'];
$watemarkWidth = $_POST['watemarkWidth'];

//далее  $watermarkImage нужно ресайзить в соответсвии с тем, что получили из POST
$width = $mainImage -> get_width();
$wmWidth = $watermarkImage -> get_width();
$mainImageScale = $width / $imageWidth;//получили коэффициент картинка на столько больше чем у нас на экране
//на эту величину умножим top left;
$left = $left * $mainImageScale;
$top = $top * $mainImageScale;
//разбираемся в вотермарком
$watermarkScale = 1;
if ( $wmWidth > $watemarkWidth ) $watermarkScale = $wmWidth / $watemarkWidth; //коэффициент, насколько реальный больше, чем на экране

if (!($mainImageScale == 1 and $watermarkScale == 1) ) {  //если нужно , то ресайзим
    $newWidth = $mainImageScale * $watemarkWidth / $watermarkScale;
    $watermarkImage -> fit_to_width( $newWidth );
}


//сформировать новое имя файла
$newFileName = $settings['imageShortPath'].substr(md5(rand(1,10000)),0,16).'.jpg';

$mainImage -> overlay($watermarkImage, 'top left', $opacity, $left, $top ) ->  save($newFileName);


//getFileToDownload($newFileName);

exit( json_encode(array( 'status' => true ,
    'url' =>$settings['phpPath'].$newFileName ,
    'message' => 'Склейка изображения выполнена', //далее это всё выводим для отладки
    'with' =>  $imageWidth,
    'watermarkwidth' => $watemarkWidth,
    'realwidth' => $width,
    'realwatermarkWidth' => $wmWidth,
    'top' => $top,
    'left' => $left,
    'scale' =>  $mainImageScale,
    'watermarkScale' => $watermarkScale,
    'newWidth' => $newWidth,
    'opacity' => $opacity

)));