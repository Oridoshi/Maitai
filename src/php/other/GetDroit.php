<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include_once '../inc/DB.inc.php';

$login = $_POST['login'];

$pdo = DB::getInstance();

$tab = $pdo->getUtilisateursEtDroit();

foreach ($tab as $uti) {
    if (strtolower($uti["login"]) == strtolower($login)) {
        echo $uti["libdroit"];
        break;
    }
}