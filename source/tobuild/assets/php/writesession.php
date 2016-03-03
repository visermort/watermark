<?php

if(!$_POST) { exit( json_encode(array( 'message' => 'No post data') ));}

$fileUrl = $_POST['fileUlr'];

$serverStr=$_SERVER['HTTP_ORIGIN'];
$serverLength=strlen($serverStr );
if ( stristr( $fileUrl , $_SERVER['HTTP_ORIGIN'] )) {
    $fileUrl = substr($fileUrl, $serverLength) ;
}

$fileForm = $_POST['formId'];

if ( !$fileUrl or !$fileForm ){  exit( json_encode(array( 'status' => false , 'message' => 'Not valid data in POST') )); }

if(!($fileForm == 'image-upload__form' or $fileForm == 'watermark__form') ){
    exit( json_encode(array('status' => false,  'message' => 'Неизвестная форма '.$fileForm) ));
}

session_start(); //обращение к сессии

$_SESSION['imageFile'] = '111';
$_SESSION['watermarkFile'] = '222';

if ( $fileForm === 'image-upload__form' ) {
    $_SESSION['imageFile'] = $fileUrl;
} else if ( $fileForm === 'watermark__form' ) {
    $_SESSION['watermarkFile'] = $fileUrl;
} else {
    exit( json_encode(array('status' => false, 'message' => 'Invalid form') ));
}
exit( json_encode(array( 'status' => true , 'message' => 'All Ok '.$fileForm.' fileurl '.
                $fileUrl.' sess1 '.$_SESSION['imageFile'].' sess2 '.$_SESSION['watermarkFile'] )));