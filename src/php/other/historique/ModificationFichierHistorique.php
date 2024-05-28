<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
include_once '../../inc/DB.inc.php';

$idhist = $_POST['idhist'];
$file = $_FILES['file'];
$fileName = $_POST['name'];
$fileTmpPath = $file['tmp_name'];

$pdo = DB::getInstance();

$chemin = $_SERVER['DOCUMENT_ROOT'] ."/SECU/";
//$chemin = "C:\\xampp\\htdocs\\historique\\SECU\\";

$nf = $idhist;

$historique = $pdo->getHistoriqueById( $idhist );

// supprimer l'ancien fichier
unlink($historique->getChemin());

$historique->setChemin($chemin . $nf . $fileName);

$pdo->updateFichierHistorique($historique);


if(!move_uploaded_file($fileTmpPath, $chemin . $nf . $fileName)) {
    echo "Error moving file : $fileTmpPath to $chemin$nf$fileName.";
    $historique = $pdo->getHistoriqueByChemin($chemin . $nf . $fileName);
    $pdo->suppHistorique($historique->getIdHis());
    return;
}