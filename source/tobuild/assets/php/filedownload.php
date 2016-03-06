<?php

header("content-type: application/json");

include ('lib/abeautifulsite/SimpleImage.php');


//session_start(); //обращение к сессии
//
//if (!$_SESSION or !$_SESSION['imageFile'] or !$_SESSION['watermarkFile']) {
//    exit( json_encode(array(
//        'status' => false ,
//        'message' => 'Не загружены одна или оба изображения',
//        'sessionimagefile' => $_SESSION['imageFile'] ,
//        'sessinonmarkapfile '  => $_SESSION['watermarkFile']
//    )));
//}

//получить данные из пост

$opacity = 0.7;
if ($_POST['opacity'])  $opacity = $_POST['opacity'];
$left = $_POST['left'];
$top =  $_POST['top'];
$imageWidth = $_POST['imgWidth'];
$watemarkWidth = $_POST['watemarkWidth'];
$mainImageFile = $_POST['imgPath'];//urldecode($_POST['imgPath']);
$watermarkImageFile = $_POST['watermarkPath'];//urldecode($_POST['watermarkPath']);

//$serverPhp=$_SERVER['HTTP_ORIGIN'].'/'.$settings['phpPath'];//путь к файлам



//if ( stristr( $mainImageFile , $serverPhp )) {  //из полных путей к файлам оставим только путь из папки где скрипты
//    $mainImageFile = substr($mainImageFile, strlen($serverPhp)) ;
//}
//if ( stristr( $watermarkImageFile , $serverPhp )) {
//    $watermarkImageFile = substr($watermarkImageFile, strlen($serverPhp)) ;
//}

//$mainImage = new abeautifulsite\SimpleImage($settings['imageShortPath'] . $_SESSION['imageFile']);
//$watermarkImage = new abeautifulsite\SimpleImage($settings['imageShortPath'] . $_SESSION['watermarkFile']);

$mainImage = new abeautifulsite\SimpleImage($mainImageFile);
$watermarkImage = new abeautifulsite\SimpleImage($watermarkImageFile);



//далее  $watermarkImage нужно ресайзить в соответсвии с тем, что получили из POST
$width = $mainImage -> get_width();
$wmWidth = $watermarkImage -> get_width();
$mainImageScale = $width / $imageWidth;//получили коэффициент картинка на столько больше чем у нас на экране
//на эту величину умножим top left;
$left = $left * $mainImageScale;
$top = $top * $mainImageScale;
//разбираемся в вотермарком
$watermarkScale = 1;
//if ( $wmWidth > $watemarkWidth ) $watermarkScale = $wmWidth / $watemarkWidth; //коэффициент, насколько реальный больше, чем на экране

if (!($mainImageScale == 1 ) ) {  //and $watermarkScale == 1   если нужно , то ресайзим
    $newWidth = $mainImageScale * $watemarkWidth;// * $watermarkScale;
    $watermarkImage -> fit_to_width( $newWidth );
}

//сформировать новое имя файла
$newFileName = $settings['imageShortPath'].substr(md5(rand(1,10000)),0,16).'.jpg';

$mainImage -> overlay($watermarkImage, 'top left', $opacity, $left, $top ) ->  save($newFileName);



header("content-type: application/json");
exit( json_encode(array( 'status' => true ,
    'url' => 'assets/php/'.$newFileName, //$settings['phpPath'].$newFileName ,
   // 'fullUrl' => $_SERVER['HTTP_ORIGIN'].'/'.$settings['phpPath'].$newFileName ,
    'message' => 'Склейка изображения выполнена', //далее это всё выводим для отладки
    'frontImage' => $mainImageFile,
    'frontWatermark' => $watermarkImageFile,
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
    //'scriptPath' => $_post['SCRIPT_PATH']

)));