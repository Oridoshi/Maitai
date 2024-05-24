<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$iduti = $_POST['iduti'];

$historiques = DB::getInstance()->getHistoriquesByClientTicket($iduti);

foreach ($historiques as $historique) {
    $filename = basename($historique->getChemin());    
    $historique->setChemin($filename);
}

echo json_encode($historiques);