<?php
header("Access-Control-Allow-Origin: *");
require_once '../../inc/DB.inc.php';

$idhist = $_POST['idhist'];

$pdo = DB::getInstance();

$pdo->updateHistorique($idhist);

$hist = $pdo->getHistoriqueById($idhist);

$chemin = $_SERVER['DOCUMENT_ROOT'] ."/SECU/" . $hist->getChemin();

addTicket($idcli, $file, $pdo);

function addTicket($idcli, $file, $pdo) {
    $tab = getProduits($file);
    foreach($tab as $prod) {
        $ticket = new Ticket();
        $ticket->setIdCli($idcli);
        $ticket->setIdProd($pdo->getProduitByRef($prod[0])->getIdProd());
        $ticket->setQa($prod[1]);
        $pdo->insertTicket($ticket);
    }
}

function getProduits($file) {
    $tab = [];
    $file = fopen($file, "r");

    for($i = 0; $i < 15; $i++) 
        fgets($file);
    
    while(!feof($file)) {
        $line = fgets($file);
        $tabtmp = explode(";", $line);

        

        for($i = 0; $i < 4; $i++) {

            if($i == 0){                    
                $key = $tabtmp[14];
            } else if($i == 2) {
                if($tabtmp[4] == 'X')
                    $key = 'TECH';
                else
                    $key = 'EXPLO';
            } else if ($i >= 2){
                $line = fgets($file);
                $tabtmp = explode(";", $line);
                $key = $tabtmp[3];
            }
            

            if(isset($tab[$key]))
                $tab[$key][1]++;
            else
                $tab[$key] = [$key, 1];

        }
    }
    fclose($file);
    return $tab;
}