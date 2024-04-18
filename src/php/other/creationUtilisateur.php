<?php

include_once '../inc/DB.inc.php';

// vérifie si les données sont renseignées dans le formulaire
if(!isset($_POST['login']) || !isset($_POST['email'])) exit;

// récupération des données du formulaire
$login = $_POST['login'];
$email = $_POST['email'];


$pdo = DB::getInstance();

// création de l'utilisateur
$utilisateur = new Utilisateur();
$utilisateur->setLogin($login);
$utilisateur->setEmail($email);

// insertion de l'utilisateur dans la base de données
$pdo->insertUtilisateur($utilisateur);