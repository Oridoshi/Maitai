<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

$idhist = $_POST['idhist'];

$chemin = DB::getInstance()->getHistoriquesById($idhist);

echo file_get_contents($chemin);