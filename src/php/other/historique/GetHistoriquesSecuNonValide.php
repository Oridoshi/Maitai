<?php
header("Access-Control-Allow-Origin: *");

include_once '../../inc/DB.inc.php';

$fichier = array();

$historiques = DB::getInstance()->getHistoriquesSecuNonValide();

foreach ($historiques as $historique) {
    $fichier[$historique->getId()] = base64_encode(file_get_contents($historique->getChemin()));
}

if($historiques == null || $historiques == false) {
	$historiques = [];
}

echo json_encode($historiques);