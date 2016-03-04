<?php

include ('settings.php');

header("content-type: application/json");


exit( json_encode(array(
    'status' => true ,
    'message' => 'выдача на скачивание или очистка сесси - всё прошло хорошо'
)));
