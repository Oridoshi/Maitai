<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';


$pdo = DB::getInstance();
// création du client
$client = new Utilisateur();
$client->setLogin($_POST['nomClub']);
$client->setEmail($_POST['email']);
$client->setTelephone($_POST['telephone']);
$client->setActif(true);
$client->setDroit("Client");
$client->setMdp($_POST['mdp']);
$client->setPresent(false);

// insertion de l'utilisateur dans la base de données
$pdo->insertUtilisateur($client);