<?php

$errorMessage='';

function scanDirectory($dir) {
    $files = array();
    $handle = opendir($dir);
    while (false !== ($file = readdir($handle))){
        if ($file != '.' && $file != '..' && !is_dir($file)){
                $files[] = $file;
            }
        }
    closedir($handle);
    return $files;
}

function clearDir($dirName) {
    global $errorMessage;
    try {
        $files = scanDirectory($dirName);
        foreach($files as $key => $value) {
            $fileDate = filemtime($dirName.'/'.$value);
            if( $fileDate+60*60*24 < time() ) { //файл старый, удаляем
                unlink($dirName.'/'.$value);
            }
        }
        return true;
    }catch (Exception $e ){
        $errorMessage = $e -> getMessage();
        return 0;
    }

}


header("content-type: application/json");

if ($_POST['clear']) { //oчищаем сервер от старых файлов

    if (clearDir('files/thumbnail') and clearDir('files')){
        exit( json_encode(array(
            'status' => true ,
            'message' => 'Очистка от устаревших файлов - успешно')));
        } else {
        exit( json_encode(array(
            'status' => false,
            'message' => 'Ошибка при очистке от устаревших файлов! '.$errorMessage
        )));
    }
}





