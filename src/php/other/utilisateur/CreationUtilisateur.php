<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include_once '../../inc/DB.inc.php';

// récupération des données du formulaire
$login = $_POST['login'];
$email = $_POST['email'];
$actif = $_POST['actif'];
$droit = $_POST['droit'];

$pdo = DB::getInstance();

// création de l'utilisateur
$utilisateur = new Utilisateur();
$utilisateur->setLogin($login);
$utilisateur->setEmail($email);
$utilisateur->setActif($actif);
$utilisateur->setDroit($droit);

// insertion de l'utilisateur dans la base de données
$pdo->insertUtilisateur($utilisateur);