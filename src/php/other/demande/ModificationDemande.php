<?php 

header("Access-Control-Allow-Origin: *");

include_once '../inc/DB.inc.php';


$pdo = DB::getInstance();


if(isset($_POST['valide']))
    $pdo->updateValide($_POST['idProd'], $_POST['date'], $_POST['pourMatin'], $_POST['valide']);
else
    $pdo->updateDemande($_POST['idProd'], $_POST['idUti'], $_POST['qa'], $_POST['date'], $_POST['pourMatin']);