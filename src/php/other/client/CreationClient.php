<?php

include_once '../../inc/DB.inc.php';

// vérification des données POST
if(!isset($_POST['nomClub']) || !isset($_POST['email']) || !isset($_POST['telephone'])) exit;

// création du client
$client = new Client();
$client->setNomClub($_POST['nomClub']);
$client->setEmail($_POST['email']);
$client->setTelephone($_POST['telephone']);

// insertion du client
$valide = DB::getInstance()->insertClient($client);

if(!$valide) {
    echo "Erreur lors de la création du client";
    exit;
}