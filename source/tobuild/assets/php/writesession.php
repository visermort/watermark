<?php

include ('settings.php');

header("content-type: application/json");

if(!$_POST) { exit( json_encode(array( 'message' => 'No post data') ));}

$fileUrl = urldecode($_POST['fileUlr']);

$serverFiles=$_SERVER['HTTP_ORIGIN'].$settings['imagePath'];
$serverFilesLength=strlen($serverFiles );
if ( stristr( $fileUrl , $_SERVER['HTTP_ORIGIN'] )) {
    $fileUrl = substr($fileUrl, $serverFilesLength) ;
}

$fileForm = $_POST['formId'];

if ( !$fileUrl or !$fileForm ){  exit( json_encode(array( 'status' => false , 'message' => 'Not valid data in POST') )); }

if(!($fileForm == 'image-upload__form' or $fileForm == 'watermark__form') ){
    exit( json_encode(array('status' => false,  'message' => 'Неизвестная форма '.$fileForm) ));
}

session_start(); //обращение к сессии


switch ($fileForm) {
    case 'image-upload__form':
        $_SESSION['imageFile'] = $fileUrl;;
        break;
    case 'watermark__form':
        $_SESSION['watermarkFile'] = $fileUrl;
        break;
    default:
        exit( json_encode( array( 'status' => false, 'message' => 'Invalid form') ) );
}

exit( json_encode(array( 'status' => true , //для отладки пока всё это выводим
    'message' => 'All Ok ',
    'fileForm' => $fileForm,
    'fileName' => $fileUrl,
    'sessionimagefile' => $_SESSION['imageFile'] ,
    'sessinonmarkapfile '  => $_SESSION['watermarkFile'] )));