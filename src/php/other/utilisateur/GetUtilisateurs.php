<?php

include_once "../inc/DB.inc.php";

$pdo = DB::getInstance();

// Récupération des utilisateurs et de leur droit
$utilisateurs = $pdo->getUtilisateursEtDroit();

// Envoi des données au format JSON
echo json_encode($utilisateurs);