<?php
header('Cross-Origin-Opener-Policy: same-origin');

$idcli = $_POST['idcli'];

$historiques = DB::getInstance()->getHistoriquesByClient($idcli);

foreach ($historiques as $historique) {
    $filename = basename($historique->getChemin());    
    $historique->setChemin($filename);
}

echo json_encode($historiques);