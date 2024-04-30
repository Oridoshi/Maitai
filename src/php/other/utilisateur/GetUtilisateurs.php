<?php
include_once "../../inc/DB.inc.php";

// Ajoutez les en-têtes CORS pour permettre l'accès depuis n'importe quel domaine
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Assurez-vous de vérifier la méthode de la requête pour les demandes POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Si c'est une demande POST, assurez-vous également d'ajouter l'en-tête Content-Type
    header('Content-Type: application/json');
}

$pdo = DB::getInstance();

// Récupération des utilisateurs et de leur droit
$utilisateurs = $pdo->getUtilisateursEtDroit();

// Envoi des données au format JSON
echo json_encode($utilisateurs);