<?php

if(!$_POST) { exit( json_encode(array( 'message' => 'No post data') ));}

$fileUrl = $_POST['fileUlr'];
if ( strncasecmp( $fileUrl , $_SERVER['DOCUMENT_ROOT'] , strlen($_SERVER['DOCUMENT_ROOT'] ))) {
    $fileUrl = substr($fileUrl, strlen($_SERVER['DOCUMENT_ROOT'])) ;
}

$fileForm = $_POST['formId'];
if ( !$fileUrl or !$fileForm ){  exit( json_encode(array( 'message' => 'Not valid data in POST') )); }

session_start(); //обращение к сессии

if($fileForm = 'img-upload' ) { //файл основной
    $_SESSION['imageFile'] = $fileUrl;
} else if ( $fileForm = 'watermark-upload' ) {
    $_SESSION['File'] = $fileUrl;
} else {
    exit( json_encode(array( 'message' => 'Invalid form') ));
}
exit( json_encode(array( 'message' => 'All Ok') ));