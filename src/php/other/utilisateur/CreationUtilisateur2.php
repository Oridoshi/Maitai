<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

// récupération des données du formulaire
$login = $_POST['login'];
$mdp   = $_POST['mdp'];
$email = $_POST['email'];
$actif = $_POST['actif'];
$droit = $_POST['droit'];
$tel   = $_POST['tel'];

$pdo = DB::getInstance();

// création de l'utilisateur
$utilisateur = new Utilisateur();
$utilisateur->setLogin($login);
$utilisateur->setMdp($mdp);
$utilisateur->setEmail($email);
$utilisateur->setActif($actif);

// Création du client
$client = new Client();
$client->setEmail($email);
$client->setNomClub($login);
$client->setTelephone($tel);

// insertion de l'utilisateur dans la base de données
$pdo->insertUtilisateur($utilisateur);
$pdo->insertClient($client->getEmail(), $client->getNomClub(), $client->getTelephone());

$uti = $pdo->getUtilisateur($login);

$pdo->insertUtilisateurDroit($uti->getIdUti(), $droit);