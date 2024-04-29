<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include_once "../inc/DB.inc.php";

$pdo = DB::getInstance();

// Récupération des droits
$droits = $pdo->getDroits();

// Envoi des données au format JSON
echo json_encode($droits);