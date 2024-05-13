<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
include_once '../../inc/DB.inc.php';

$idhist = $_POST['idhist'];
$type = $_POST['type'];
$idcli = intval($_POST['idcli']);
$file = $_FILES['file'];
$fileName = $_POST['name'];
$fileTmpPath = $file['tmp_name'];

// $chemin = $_SERVER['DOCUMENT_ROOT'] ."/". $type . "/";
$chemin = "C:\\xampp\\htdocs\\historique\\" . $type . "\\";


$val = date('H:i:s');

$historique = new Historique();
$historique->setChemin($chemin . $val . $fileName);
$historique->setType($type);
$historique->setIdCli($idcli);



if(!DB::getInstance()->insertHistorique($historique)) {echo "Error inserting historique."; return;};

$historique = DB::getInstance()->getHistoriqueByChemin($chemin . $val . $fileName);


if(!move_uploaded_file($fileTmpPath, $chemin . $val . $fileName)) {
    echo "Error moving file.";
    echo $fileTmpPath;
    DB::getInstance()->suppHistorique($historique->getIdHis());
    return;
}