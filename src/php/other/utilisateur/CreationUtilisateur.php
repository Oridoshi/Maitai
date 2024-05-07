<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include_once '../../inc/DB.inc.php';

// récupération des données du formulaire
$login = $_POST['login'];
$mdp   = isset($_POST['mdp'])?$_POST['mdp']:null;
$email = $_POST['email'];
$actif = $_POST['actif'];
$droit = $_POST['droit'];
$tel   = isset($_POST['tel'])?$_POST['tel']:null;

$pdo = DB::getInstance();

// création de l'utilisateur
$utilisateur = new Utilisateur();
$utilisateur->setLogin($login);
$utilisateur->setEmail($email);
$utilisateur->setActif($actif);

// insertion de l'utilisateur dans la base de données
$pdo->insertUtilisateur($utilisateur);

$uti = $pdo->getUtilisateur($login);

$pdo->insertUtilisateurDroit($uti->getIdUti(), $droit);

if($mdp != null && $tel != null && count($pdo->getClient($login)) == 0){
    // Création du client
    $client = new Client();
    $client->setEmail($email);
    $client->setNomClub($login);
    $client->setTelephone($tel);

    $pdo->insertClient($client);

    $pdo->majMdpUti($login, password_hash($mdp, PASSWORD_DEFAULT));
}