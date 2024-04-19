<?php

include_once '../inc/DB.inc.php';

// initialisations des variables à null
$prevNomClub = null;
$nomClub = null;
$email = null;
$telephone = null;
$present = null;

// récupération des données du formulaire si elles sont renseignées
if(isset($_POST['prevNomClub'])) {$prevNomClub = $_POST['prevNomClub'];}

if(isset($_POST['nomClub'])) {$nomClub = $_POST['nomClub'];}

if(isset($_POST['email'])) {$email = $_POST['email'];}

if(isset($_POST['telephone'])) {$telephone = $_POST['telephone'];}

if(isset($_POST['present'])) {$present = $_POST['present'];}


$pdo = DB::getInstance();

// récupération du client à modifier
$client = $pdo->getClient($prevNomClub)[0];

// modification des données du client si non null
if($nomClub != null)
    $client->setNomClub($nomClub);
if($email != null)
    $client->setEmail($email);
if($telephone != null)
    $client->setTelephone($telephone);
if($present != null)
    $client->setPresent($present);

// mise à jour du client
$pdo->updateClient($client);