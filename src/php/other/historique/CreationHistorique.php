<?php

$chemin = $_POST['chemin'];
$type = $_POST['type'];
$idcli = $_POST['idcli'];
$file = $_FILES['file'];
$fileName = $file['name'];
$fileTmpPath = $file['tmp_name'];

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