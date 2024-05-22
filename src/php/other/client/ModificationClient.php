<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

// initialisations des variables à null
$prevNomClub = $_POST['prevNomClub'];
$nomClub = $_POST['nomClub'];
$email = $_POST['email'];
$telephone = $_POST['telephone'];
$present = $_POST['present'];

$pdo = DB::getInstance();

// récupération du client à modifier
$client = $pdo->getUtilisateurByLogin($prevNomClub);

if(($present == false || $present == 0 ) && $pdo->getNbProdTicketCli($client->getIdUti()) > 0)
    die("SQLSTATE[45000] : erreur perso : 2255 Ce client a un ticket, il ne peut donc pas être modifié ! in");

// modification des données du client si non null
$client->setLogin($nomClub);
$client->setEmail($email);
$client->setTelephone($telephone);
$client->setPresent($present);

// mise à jour du client
$pdo->updateClient($client);