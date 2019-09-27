<?php
function customError($errno, $errstr) {
    echo "<b>Error:</b> [$errno] $errstr<br>";
    echo "Ending Script";
    die("Ending Script");
}
set_error_handler("customError");
header("Content-Type: application/json; charset=UTF-8");
$myData = $_POST["data"];

session_start();
$myFile = '../users/' . $_SESSION['umail'] . '/database.json';
// $myFile = "database.json";
$fileHandle = fopen($myFile, "w");

fwrite($fileHandle, $myData);
fclose($fileHandle);

?>