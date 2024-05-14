<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';


$pdo = DB::getInstance();
// création du client
$client = new Client();
$client->setNomClub($_POST['nomClub']);
$client->setEmail($_POST['email']);
$client->setTelephone($_POST['telephone']);

// insertion du client
$valide = $pdo->insertClient($client);

// création de l'utilisateur
$utilisateur = new Utilisateur();
$utilisateur->setLogin($_POST['nomClub']);
$utilisateur->setEmail($_POST['email']);

// insertion de l'utilisateur dans la base de données
$pdo->insertUtilisateur($utilisateur);

$uti = $pdo->getUtilisateur($_POST['nomClub']);

$pdo->insertUtilisateurDroit($uti->getIdUti(), 3);