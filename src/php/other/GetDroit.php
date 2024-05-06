<?php 

header("Access-Control-Allow-Origin: *");

include_once '../inc/DB.inc.php';

$login = $_POST['login'];

$pdo = DB::getInstance();

$tab = $pdo->getUtilisateursEtDroit();

foreach ($tab as $uti) {
    if ($uti["login"] == $login) {
        echo $uti["libdroit"];
        break;
    }
}