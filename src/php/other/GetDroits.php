<?php
<<<<<<< HEAD
header("Access-Control-Allow-Origin: *");
=======
header('Access-Control-Allow-Origin: *');
>>>>>>> d86fbd5f8a7c696bd77c102433880ece448661f8
include_once "../inc/DB.inc.php";

$pdo = DB::getInstance();

// Récupération des droits
$droits = $pdo->getDroits();

// Envoi des données au format JSON
echo json_encode($droits);