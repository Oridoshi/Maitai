<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

//$idhist = $_POST['idhist'];
$idhist = 15;

$chemin = DB::getInstance()->getHistoriquesById($idhist);

echo readfile($chemin);