<?php

header("content-type: application/json");

include('lib/abeautifulsite/SimpleImage.php');
include('functions.php');
session_start(); //обращение к сессии

//получить данные из пост
$inputData=readPost();

//делаем валидацию
if (!validateData($inputData)) exit(createMessage(false,'Ошибка во входных данных!'));

//из длинных путей делаем короткие имена файлов
$inputData['mainImageFile']      = getFileShortName($inputData['mainImageFile'],$settings['scriptPath']);
$inputData['watermarkImageFile'] = getFileShortName($inputData['watermarkImageFile'],$settings['scriptPath']);


try {

    $mainImage = new abeautifulsite\SimpleImage($inputData['mainImageFile']);
    $watermarkImage = new abeautifulsite\SimpleImage($inputData['watermarkImageFile']);

    //пнг основого изображения сразу сконвертим в jpeg
    $mainImage = convertIntoJpeg($mainImage,$inputData['mainImageFile']);

    //получаем размеры изображений
    $imageSize = getImageSizes($mainImage,$inputData['imageWidth'],1);//поскольку вертикальный размер не знаем, передаём 1
    $watermarkSize = getImageSizes($watermarkImage,$inputData['frontWatermarkWidth'],$inputData['frontWatermarkHeight']);

    // $watermarkImage нужно ресайзить в соответсвии с тем, что получили из фронта
    $watermarkImage = resizeWatermark($watermarkImage,$imageSize,$watermarkSize);

    //готовим данные для склейки
    $workData = makeWorkData ($inputData, $watermarkImage,$imageSize);

    //сформировать новое имя файла
    $newFileName = 'files/' . substr(md5(rand(1, 100000)), 0, 16) . '.jpg';

    if ($inputData['tiled']) {//если замощение, то делаем много раз в цикле, иначе один раз
          for ($i = 0; $i < $workData['countX']; $i++) {
                for ($j = 0; $j < $workData['countY']; $j++) {
                    $currentLeft =  $workData['innerX'] + $i * ($workData['newWidth'] + $workData['intervalHor']);
                    $currentTop = $workData['innerY'] + $j * ($workData['newHeight'] + $workData['intervalVert']);
                    $mainImage->overlay($watermarkImage, 'top left', $inputData['opacity'], $currentLeft, $currentTop);
                } //for j
        } //for i
    } else $mainImage->overlay($watermarkImage, 'top left', $inputData['opacity'], $workData['left'], $workData['top']);

    $mainImage->save($newFileName);//сохраняем

} catch (Exception $e) {			//ошибка,
    exit (createMessage(false,'Ошибка при выполнении '.$e -> getMessage()));
}
$_SESSION['lastFile'] = $newFileName;

exit (createMessage(true,'Склейка изображения выполнена'));
