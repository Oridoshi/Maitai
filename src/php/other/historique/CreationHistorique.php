<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
include_once '../../inc/DB.inc.php';

$type = $_POST['type'];
$iduti = intval($_POST['iduti']);
$file = $_FILES['file'];
$fileName = $_POST['name'];
$fileTmpPath = $file['tmp_name'];

$chemin = $_SERVER['DOCUMENT_ROOT'] ."/". $type . "/";
//$chemin = "C:\\xampp\\htdocs\\historique\\" . $type . "\\";

$nf = DB::getInstance()->getNextIdHistorique();

$historique = new Historique();
$historique->setChemin($chemin . $nf . $fileName);
$historique->setType($type);
$historique->setIdUti($iduti);


if(!DB::getInstance()->insertHistorique($historique)) {echo "Error inserting historique."; return;};

$historique = DB::getInstance()->getHistoriqueByChemin($chemin . $nf . $fileName);


if(!move_uploaded_file($fileTmpPath, $chemin . $nf . $fileName)) {
    echo "Error moving file.";
    echo $fileTmpPath;
    echo $fileTmpPath;
    DB::getInstance()->suppHistorique($historique->getIdHis());
    return;
}

echo $nf;