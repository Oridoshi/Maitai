<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

// récupération des données du formulaire
$login = $_POST['login'];
$mdp   = isset($_POST['mdp'])?$_POST['mdp']:null;
$email = $_POST['email'];
$actif = $_POST['actif'];
$droit = $_POST['droit'];
$tel   = isset($_POST['tel'])?$_POST['tel']:null;

$pdo = DB::getInstance();

if($mdp != null && $tel != null){
    // Création du client
    $client = new Client();
    $client->setEmail($email);
    $client->setNomClub($login);
    $client->setTelephone($tel);

    $pdo->insertClient($client->getEmail(), $client->getNomClub(), $client->getTelephone());
}

// création de l'utilisateur
$utilisateur = new Utilisateur();
$utilisateur->setLogin($login);
$utilisateur->setEmail($email);
$utilisateur->setActif($actif);

// insertion de l'utilisateur dans la base de données
$pdo->insertUtilisateur($utilisateur);

$uti = $pdo->getUtilisateur($login);

$pdo->insertUtilisateurDroit($uti->getIdUti(), $droit);