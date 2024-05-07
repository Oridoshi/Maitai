<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
include_once '../../inc/DB.inc.php';

$type = $_POST['type'];
$idcli = intval($_POST['idcli']);
$file = $_FILES['file'];
$fileName = $_POST['name'];
$fileTmpPath = $file['tmp_name'];

$chemin = "C:\\xampp\\htdocs\\historique\\" . $type . "\\";

echo $chemin . $fileName . "<br>";

$historique = new Historique();
$historique->setChemin($chemin . $fileName);
$historique->setType($type);
$historique->setIdCli($idcli);

if(!DB::getInstance()->insertHistorique($historique)) {echo "Error inserting historique."; return;};

$historique = DB::getInstance()->getHistoriqueByChemin($chemin . $fileName);

if(!move_uploaded_file($fileTmpPath, $chemin . $fileName)) {
    echo "Error moving file.";
    DB::getInstance()->suppHistorique($historique->getIdHis());
    return;
}