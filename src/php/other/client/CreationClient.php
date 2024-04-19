<?php

include_once '../inc/DB.inc.php';

// initialisations des variables à null
$nomClub = null;
$email = null;
$telephone = null;

// récupération des données du formulaire si elles sont renseignées
if(isset($_POST['nomClub'])) {$nomClub = $_POST['nomClub'];}

if(isset($_POST['email'])) {$email = $_POST['email'];}

if(isset($_POST['telephone'])) {$telephone = $_POST['telephone'];}


$pdo = DB::getInstance();

// création du client
$client = new Client();
if($nomClub != null)
    $client->setNomClub($nomClub);
if($email != null)
    $client->setEmail($email);
if($telephone != null)
    $client->setTelephone($telephone);

// insertion du client
$pdo->insertClient($client);