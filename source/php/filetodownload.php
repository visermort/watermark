<?php
session_start();
$lastFile = $_SESSION['lastFile'];
if ($lastFile) {
    header('Content-Disposition: attachment; filename="'.$lastFile.'"');
    readfile($lastFile);
}
