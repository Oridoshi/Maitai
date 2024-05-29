<?php
header("Access-Control-Allow-Origin: *");
require_once '../../inc/DB.inc.php';
require '../../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

$idhist = $_POST['idhist'];

$pdo = DB::getInstance();

$pdo->updateHistorique($idhist);

$hist = $pdo->getHistoriqueById($idhist);

$file = $hist->getChemin();

addTicket($hist->getIdUti(), $file, $pdo);

function addTicket($iduti, $file, $pdo) {
    $tab = retournerFichier($file);
    $tab = getProduits($tab);
    foreach($tab as $prod) {
        $produit = $pdo->getProduitByLib($prod[0]);
        $ticket = $pdo->getTicket($produit->getIdProd(), $iduti);
            
        if($ticket != null) {
            $ticket->setQa($ticket->getQa() + $prod[1]);
            $ticket->setPrixTot($ticket->getPrixTot() + $ticket->getPrixSpe() * $prod[1]);
            $pdo->updateTicket($ticket);
        } else {
            $ticket = new Ticket();
            $ticket->setIdUti($iduti);
            $ticket->setIdProd($produit->getIdProd());
            $ticket->setPrixSpe($produit->getPrixUni());
            $ticket->setQa($prod[1]);
            $ticket->setPrixTot($ticket->getPrixSpe() * $ticket->getQa());
            $pdo->insertTicket($ticket);
        }

    }
}

function retournerFichier($chemin) {
    $file = IOFactory::load($chemin)->getActiveSheet();
    $tab = [];
    foreach($file->getRowIterator() as $row) {
        $tmp = [];
        foreach($row->getCellIterator() as $cell) {
            $tmp[] = $cell->getValue();
        }
        $tab[] = implode(";", $tmp);
    }

    return array_reverse($tab);
}

function getProduits($tabinfo) {
    $tab = [];
    $size = count($tabinfo);

    //verification si Sécu/DP/O2 = Maïtaï et récupération de si le DP est maïtaï pour une autre verification plus tard
    $cpt = $size - 9;
    $line = $tabinfo[$cpt];
    $tabtmp = explode(";", $line);
    $estMaitai = str_replace("ï", "i", strtolower($tabtmp[3])) == "maitai" || str_replace("ï", "i", strtolower($tabtmp[6])) == "maitai";
    $DPTrimix = str_replace("ï", "i", strtolower($tabtmp[3])) == "maitai";
    $cpt--;

    $line = $tabinfo[$cpt];
    $tabtmp = explode(";", $line);
    $estMaitai = $estMaitai || str_replace("ï", "i", strtolower($tabtmp[6])) == "Maïtaï";

    $cpt = 0;
    if($estMaitai)
        $tab["Maitai"] = ["Sécu/DP/O2 Maïtaï", 1];
    while($cpt < $size - 16) {
        $line = $tabinfo[$cpt++];
        $tabtmp = explode(";", $line);

        $palanque[2] = $tabtmp;
        $palanque[1] = explode(";", $tabinfo[$cpt++]);
        $palanque[0] = explode(";", $tabinfo[$cpt++]);

        //vérification si c'est un baptème
        if(str_contains(str_replace("è", "e", strtolower($palanque[1][3])),"bapteme") ) {
            $nbBapteme = 1;
            if($palanque[2][3] != "")
                $nbBapteme++;

            $str = "Baptème";
            if(strtolower($palanque[0][14]) == "recycleur") $str .= " recycleur";

            if(isset($tab[$str]))
                $tab[$str][1] += $nbBapteme;
            else
                $tab[$str] = [$str, $nbBapteme];
            
            // on skip les autres tests si c'est un baptème
            continue;
        }


        
        // vérification si c'est une plongée encadrée ou autonome
        if($palanque[0][4] == "X"           || $palanque[1][3] == "N1-PE20"     || $palanque[2][3] == "N1-PE20" ||
           $palanque[1][3] == "N2-PA20PE40" || $palanque[2][3] == "N2-PA20PE40" && $palanque[0][8] > 20           ) {
            // si encadrée
            if(isset($tab["encadrant"]))
                $tab["encadrant"][1]++;
            else
                $tab["encadrant"] = ["Plongée Encadrant", 1];

            // permet de savoir si il y a 1 ou 2 encadrés
            $nbEncadre = $palanque[2][3] != "" ? 2 : 1;

            if(isset($tab["encadre"]))
                    $tab["encadre"][1] += $nbEncadre;
                else
                    $tab["encadre"] = ["Plongée encadrée", $nbEncadre];
        } else { // si autonomes
            // permet de savoir si il y a 2 ou 3 autonomes
            $nbAutonome = $palanque[2][3] != "" ? 3 : 2;

            if(isset($tab["autonome"]))
                $tab["autonome"][1] += $nbAutonome;
            else
                $tab["autonome"] = ["Plongée Autonome", $nbAutonome];
        }

        //vérification de si le DP est un trimix
        $gaz = $palanque[0][14];
        if($DPTrimix && str_contains(strtolower($gaz), "trimix")) {
             if(isset($tab["Trimix"]))
                $tab["Trimix"][1] ++;
            else
                $tab["Trimix"] = ["DP Trimix Maïtaï", 1];
        }
    }

    return $tab;
}