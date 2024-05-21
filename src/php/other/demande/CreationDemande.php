<?php

header("Access-Control-Allow-Origin: *");

include_once '../inc/DB.inc.php';

$idProd = $_POST['idProd'];
$idUti = $_POST['idUti'];
$qa = $_POST['qa'];
$date = $_POST['date'];
$pourMatin = $_POST['pourMatin'];

$pdo = DB::getInstance();

$pdo->insertDemande($idProd, $idUti, $qa, $date, $pourMatin);