<?php

header("Access-Control-Allow-Origin: *");

include_once '../inc/DB.inc.php';

$idProd = $_POST['idProd'];
$idUti = $_POST['idUti'];

$pdo = DB::getInstance();

$pdo->suppDemande($idProd, $idUti);