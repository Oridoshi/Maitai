<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
include_once '../../inc/DB.inc.php';

$idhist = $_POST['idhist'];
$file = $_FILES['file'];
$fileName = $_POST['name'];
$fileTmpPath = $file['tmp_name'];

$chemin = $_SERVER['DOCUMENT_ROOT'] ."/SECU/";
// $chemin = "C:\\xampp\\htdocs\\historique\\SECU\\";

$nf = $idhist;

$historique = DB::getInstance()->getHistoriqueById( $idhist );

// supprimer l'ancien fichier
unlink($historique->getChemin());

$historique->setChemin($chemin . $nf . $fileName);

DB::getInstance()->updateFichierHistorique($historique);


if(!move_uploaded_file($fileTmpPath, $chemin . $nf . $fileName)) {
    echo "Error moving file : $fileTmpPath to $chemin$nf$fileName.";
    $historique = DB::getInstance()->getHistoriqueByChemin($chemin . $nf . $fileName);
    DB::getInstance()->suppHistorique($historique->getIdHis());
    return;
}