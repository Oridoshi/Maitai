<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
include_once '../../inc/DB.inc.php';

$idhist = $_POST['idhist'];
$file = $_FILES['file'];
$fileName = $_POST['name'];
$fileTmpPath = $file['tmp_name'];

$chemin = $_SERVER['DOCUMENT_ROOT'] ."/". $type . "/";
// $chemin = "C:\\xampp\\htdocs\\historique\\SECU\\";

$val = date('H-i-s');

$historique = DB::getInstance()->getHistoriqueById( $idhist );

// supprimer l'ancien fichier
unlink($historique->getChemin());

$historique->setChemin($chemin . $val . $fileName);

DB::getInstance()->updateFichierHistorique($historique);


if(!move_uploaded_file($fileTmpPath, $chemin . $val . $fileName)) {
    echo "Error moving file : $fileTmpPath to $chemin$val$fileName.";
    $historique = DB::getInstance()->getHistoriqueByChemin($chemin . $val . $fileName);
    DB::getInstance()->suppHistorique($historique->getIdHis());
    return;
}