<?php
include('lib/Valitron/src/Valitron/Validator.php');


class imageProp {
  var $width,
      $height,
      $naturalWidth,
      $naturalHeight,
      $scaleHor,
      $scaleVert;
};

$settings = array (
    'scriptPath' => 'assets/php/',
    'dev' => true //режим разработки
);

function readPost() {
    $opacity = 0.7;
    if ($_POST['opacity'])  $opacity = $_POST['opacity'];
    return  array(
        'opacity' => $opacity,
        'left' => $_POST['left'],
        'top' =>  $_POST['top'],
        'imageWidth' => $_POST['imgWidth'],
        'frontWatermarkWidth' => $_POST['watemarkWidth'],
        'frontWatermarkHeight' => $_POST['watemarkHeight'],
        'mainImageFile' => urldecode($_POST['imgPath']),
        'watermarkImageFile' => urldecode($_POST['watermarkPath']),
        'intervalVert' => $_POST['intervalVert'],
        'intervalHor' => $_POST['intervalHor'],
        'tiled' => $_POST['tiled']
    );
};

//формируем сообщение для отправки на фронт
function createMessage($status,$message){
    global $settings,$newFileName,$inputData,$imageSize,$watermarkSize,$workData;
    $resArray = array( 'status' => $status,
                        'message' => $message,);
    if (isset($newFileName)) $resArray['url'] =  $settings['scriptPath'].$newFileName;
    if ($settings['dev']) {
        $resArray ['post'] = $inputData;
        $resArray['imageSize'] = $imageSize;
        $resArray['watermarkSize'] = $watermarkSize;
        $resArray['workData'] = $workData;
    }
    return json_encode($resArray);
};

//используем waliotron-validator
function validateData($data) {
    $v = new Valitron\Validator($data);
    $v->rule('required', ['mainImageFile', 'watermarkImageFile']);
    $v->rule('integer',['left','top','imageWidth','frontWatermarkWidth','frontWatermarkHeight','intervalVert','intervalHor']);
    $v->rule('numeric',['opacity']);
    return $v -> validate();
};

//получаем путь к файлу относительно папки с php из полного url
function getFileShortName($fileUrl,$filePath){
   if ($fileUrl = stristr( $fileUrl , $filePath)) {
        $fileUrl =  substr( $fileUrl, strlen($filePath)) ;
   }
    return $fileUrl;
};

//если основная картинка - png , сразу конвертим её в jpeg
function convertIntoJpeg($image,$file) {
    $imageinfo = getimagesize($file);
    if ($imageinfo['mime'] == 'image/png') {
        $tmpFileName = 'files/' . substr(md5(rand(1, 100000)), 0, 16) . '.jpg';
        $image -> save($tmpFileName);
        $image = new abeautifulsite\SimpleImage($tmpFileName);
    }
    return $image;
}

//получаем полные данные об изображении
function getImageSizes ($image,$width,$height) {//image и размеры картинки на фронте
    $imageSize = new imageProp;
    $imageSize -> naturalWidth = $image -> get_width();
    $imageSize -> naturalHeight = $image -> get_height();
    $imageSize -> width = $width; //это данные с фронта
    $imageSize -> height = $height;//это данные с фронта
    $imageSize -> scaleHor = $imageSize -> naturalWidth / $width;
    $imageSize -> scaleVert = $imageSize -> naturalHeight / $height;
    return $imageSize;
}
        //если нужно, то ресайзим ватемарк
function resizeWatermark($watermark,$imageSize,$watermarkSize) {
    if ($imageSize -> scaleHor != 1 or $watermarkSize -> scaleHor != 1 or $watermarkSize -> scaleVert != 1) {
        $newWidth = $imageSize -> scaleHor * $watermarkSize -> naturalWidth / $watermarkSize -> scaleHor;
        $newHeight = $imageSize -> scaleHor * $watermarkSize -> naturalHeight / $watermarkSize -> scaleVert;
        $watermark -> resize($newWidth,$newHeight);
    }
    return $watermark;
};

//готовим данные для склейки
function makeWorkData($inputData,$watermark,$imageSize) {
    $data=[];
    $data['left'] = $inputData['left'] * ($imageSize -> scaleHor);
    $data['top'] = $inputData['top'] * ($imageSize -> scaleHor);
    $data['intervalHor'] = $inputData['intervalHor'] * $imageSize -> scaleHor;
    $data['intervalVert'] = $inputData['intervalVert'] * $imageSize -> scaleHor;
    $data['newWidth'] = $watermark -> get_width();
    $data['newHeight'] = $watermark -> get_height();
    $data['countX'] = round( $imageSize -> naturalWidth / ($data['newWidth'] + $data['intervalHor'])) + 1;
    $data['countY'] = round( $imageSize -> naturalHeight / ($data['newHeight'] + $data['intervalVert'])) + 1;
    $data['innerX'] = $data['left'];
    $data['innerY'] = $data['top'];
    while ($data['innerX'] >= $data['intervalHor'])
        $data['innerX'] -= ($data['newWidth'] + $data['intervalHor']); //сдвигаем innerleft на минимальную отрицательную величину
    while ($data['innerY'] >= $data['intervalVert'])
        $data['innerY'] -= ($data['newHeight'] + $data['intervalVert']); //сдвигаем innertop на минимальную отрицательную величину
    while ($data['innerX'] <= 0 - $data['newWidth'])
        $data['innerX'] += ($data['newWidth'] + $data['intervalHor']);//если очень отрицательный - сдвикаем максимально к нулю
    while ($data['innerY'] <= 0 - $data['newHeight'])
        $data['innerY'] += ($data['newHeight'] + $data['intervalVert']);//если очень отрицательный - сдвикаем максимально к нулю
    return $data;
};

