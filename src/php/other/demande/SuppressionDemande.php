<?php

header("Access-Control-Allow-Origin: *");

include_once '../../inc/DB.inc.php';

$idProd = $_POST['idProd'];
$idUti = $_POST['idUti'];
$date = $_POST['date'];
$pourMatin = $_POST['pourMatin'];

$pdo = DB::getInstance();

$pdo->suppDemande($idProd, $idUti, $date, $pourMatin);