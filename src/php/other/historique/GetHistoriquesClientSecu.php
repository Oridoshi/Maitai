<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$idcli = $_POST['idcli'];

$historiques = DB::getInstance()->getHistoriquesByClientSecu($idcli);

foreach ($historiques as $historique) {
    $filename = basename($historique->getChemin());    
    $historique->setChemin($filename);
}

if($historiques == null) {
	$historiques = [];
}

echo json_encode($historiques);