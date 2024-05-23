<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';


$pdo = DB::getInstance();
// création du client
$client = new Utilisateur();
$client->setLogin($_POST['login']);
$client->setEmail($_POST['email']);
$client->setTelephone($_POST['tel']);
$client->setActif(true);
$client->setDroit("Client");
$client->setMdp(isset($_POST['mdp'])?password_hash($_POST['mdp'], PASSWORD_DEFAULT):"");
$client->setPresent(isset($_POST['present'])?$_POST['present']:true);

// insertion de l'utilisateur dans la base de données
$pdo->insertUtilisateur($client);