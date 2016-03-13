<?php
session_start();
$lastFile = $_SESSION['lastFile'];
if ($lastFile) {
    $fileName = $lastFile;
    if ($fileName = stristr( $fileName , 'files/' )) {  //нам нужно в т.ч. имя файла
        $fileName = substr($fileName, strlen('files/')) ;
    }
    header('Content-Disposition: attachment; filename="'.$fileName.'"');
    readfile($lastFile);
}
