<?php

include_once '../inc/DB.inc.php';

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

// insertion de l'utilisateur dans la base de données
$valide = $pdo->insertUtilisateur($utilisateur);

if(!$valide) {
    echo "Erreur lors de la création de l'utilisateur";
    return;
}
$uti = $pdo->getUtilisateur($login);

$valide = $pdo->insertUtilisateurDroit($uti->getIdUti(), $droit);

if(!$valide) {
    echo "Erreur lors de la création du droit de l'utilisateur";
    return;
}