<?php
include_once "../../inc/DB.inc.php";

// Ajoutez les en-têtes CORS pour permettre l'accès depuis n'importe quel domaine
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("content-type: application/json");
// header("Access-Control-Allow-Headers: Content-Type");

$pdo = DB::getInstance();

// Récupération des utilisateurs et de leur droit
$utilisateurs = $pdo->getUtilisateurs();

// Envoi des données au format JSON
echo json_encode($utilisateurs);