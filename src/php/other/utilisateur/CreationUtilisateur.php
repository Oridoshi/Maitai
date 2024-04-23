<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

// récupération des données du formulaire
$login = $_POST['login'];
$email = $_POST['email'];
$actif = $_POST['actif'];
$droit = $_POST['droit'] ;

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