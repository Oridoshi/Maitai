<?php
header("Access-Control-Allow-Origin: *");
include_once "../inc/DB.inc.php";

$pdo = DB::getInstance();

// Récupération des droits
$droits = $pdo->getDroits();

// Envoi des données au format JSON
echo json_encode($droits);