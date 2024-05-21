<?php

header("Access-Control-Allow-Origin: *");

include_once '../inc/DB.inc.php';

$pdo = DB::getInstance();

if(isset($_POST['idUti']))
    $tab = $pdo->getDemandesUti($_POST['date'], $_POST['pourMatin'], $_POST['idUti']);
else if(isset($_POST['prod']))
    $tab = $pdo->getDemandesProduit($_POST['date'], $_POST['pourMatin']);
else 
    $tab = $pdo->getDemandes($_POST['date'], $_POST['pourMatin']);


echo json_encode($tab);