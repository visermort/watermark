<?php

header("content-type: application/json");

include ('lib/abeautifulsite/SimpleImage.php');

//получить данные из пост

$opacity = 0.7;
if ($_POST['opacity'])  $opacity = $_POST['opacity'];
$left = $_POST['left'];
$top =  $_POST['top'];
$imageWidth = $_POST['imgWidth'];
$watemarkWidth = $_POST['watemarkWidth'];
$mainImageFile = urldecode($_POST['imgPath']);
$watermarkImageFile = urldecode($_POST['watermarkPath']);
$intervalVert = $_POST['intervalVert'];
$intervalHor = $_POST['intervalHor'];
$tiled = $_POST['tiled'];

$scriptPath = 'assets/php/';

if ($mainImageFile = stristr( $mainImageFile , $scriptPath )) {  //из полных путей к файлам оставим только путь из папки где скрипты
    $mainImageFile = substr($mainImageFile, strlen($scriptPath)) ;
}
if ($watermarkImageFile = stristr( $watermarkImageFile , $scriptPath )) {  //из полных путей к файлам оставим только путь из папки где скрипты
    $watermarkImageFile = substr($watermarkImageFile, strlen($scriptPath)) ;
}


$mainImage = new abeautifulsite\SimpleImage($mainImageFile);
$watermarkImage = new abeautifulsite\SimpleImage($watermarkImageFile);


//далее  $watermarkImage нужно ресайзить в соответсвии с тем, что получили из POST
$originalWidth = $mainImage -> get_width();
$imageHeight = $mainImage -> get_height();

$watermarkWidth = $watermarkImage -> get_width();
$watermarkHeight = $watermarkImage -> get_height();

$mainImageScale = $originalWidth / $imageWidth;//получили коэффициент картинка на столько больше чем у нас на экране

//на эту величину умножим top left и интервалы;
$left = $left * $mainImageScale;
$top = $top * $mainImageScale;
$intervalVert = $intervalVert * $mainImageScale;
$intervalHor = $intervalHor * $mainImageScale;


//разбираемся в вотермарком
$watermarkScale = 1;
//if ( $wmWidth > $watemarkWidth ) $watermarkScale = $wmWidth / $watemarkWidth; //коэффициент, насколько реальный больше, чем на экране

if (!($mainImageScale == 1 ) ) {  //and $watermarkScale == 1   если нужно , то ресайзим
    $watermarkWidth = $mainImageScale * $watermarkWidth;// * $watermarkScale;
    $watermarkHeight = $mainImageScale * $watermarkHeight;// * $watermarkScale;

    $watermarkImage -> fit_to_width( $watermarkWidth );
}

//сформировать новое имя файла
$newFileName = 'files/'.substr(md5(rand(1,10000)),0,16).'.jpg';

if ($tiled) {//если замощение, то делаем много раз в цикле, иначе один раз
    $countX = round($originalWidth / ($watermarkWidth + $intervalHor)) + 1;
    $countY = round($imageHeight / ($watermarkHeight + $intervalVert)) + 1;
    $innerX = $left;
    while ($innerX >=0 ) $innerX -= $watermarkWidth - $intervalHor;
    $innerY = $top;
    while ($innerY >=0 ) $innerY -= $watermarkHeight - $intervalVert;
    for ( $i = 0 ; $i < $countX ; $i++ ) {
        for( $j = 0 ; $j < $countY ; $j++ ) {
            $currentLeft = $innerX + $i * ($watermarkWidth + $intervalHor );
            $currentTop = $innerY + $j * ($watermarkHeight + $intervalVert );
            $mainImage -> overlay($watermarkImage, 'top left', $opacity, $currentLeft, $currentTop );
        } //for j
    } //for i

} else $mainImage -> overlay($watermarkImage, 'top left', $opacity, $left, $top );// ->  save($newFileName);
$mainImage -> save($newFileName);


exit( json_encode(array( 'status' => true ,
    'url' => $scriptPath.$newFileName, //$settings['phpPath'].$newFileName ,
   // 'fullUrl' => $_SERVER['HTTP_ORIGIN'].'/'.$settings['phpPath'].$newFileName ,
    'message' => 'Склейка изображения выполнена', //далее это всё выводим для отладки
    'frontImage' => $mainImageFile,
    'frontWatermark' => $watermarkImageFile,
    'with' =>  $imageWidth,
    'watermarkwidth' => $watermarkWidth,
    'realwidth' => $originalWidth,
  //  'realwatermarkWidth' => $wmWidth,
    'top' => $top,
    'left' => $left,
    'scale' =>  $mainImageScale,
    'watermarkScale' => $watermarkScale,
    'newWidth' => $newWidth,
    'opacity' => $opacity,
    'intervalVert' => $intervalVert,
    'intervalHor' => $intervalHor,
    'countX' => $countX.' = '.$originalWidth.'/('.$watermarkWidth.' + '.$intervalHor.') +1',
    'countY' => $countY.' = '.$imageHeight.'/('.$watermarkHeight.' + '.$intervalVert.') +1',
    'innerX' => $innerX,
    'innerY' => $innerY


)));