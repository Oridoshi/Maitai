<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
include_once '../../inc/DB.inc.php';

$type = $_POST['type'];
$idcli = intval($_POST['idcli']);
$file = $_FILES['file'];
$fileName = $_POST['name'];
$fileTmpPath = $file['tmp_name'];

$chemin = "/" . $type . "/";
//$chemin = "C:\\xampp\\htdocs\\historique\\" . $type . "\\";

$val = count(DB::getInstance()->getHistoriques());

$historique = new Historique();
$historique->setChemin($chemin . $val . $fileName);
$historique->setType($type);
$historique->setIdCli($idcli);


if(!DB::getInstance()->insertHistorique($historique)) {echo "Error inserting historique."; return;};

$historique = DB::getInstance()->getHistoriqueByChemin($chemin . $val . $fileName);


if(!move_uploaded_file($fileTmpPath, $chemin . $val . $fileName)) {
    echo "Error moving file.";
    DB::getInstance()->suppHistorique($historique->getIdHis());
    return;
}