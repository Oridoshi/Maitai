<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$iduti = $_POST['iduti'];

$historiques = DB::getInstance()->getHistoriquesByClient($iduti);

foreach ($historiques as $historique) {
    $filename = basename($historique->getChemin());    
    $historique->setChemin($filename);
}

if($historiques == null || $historiques == false) {
	$historiques = [];
}

echo json_encode($historiques);