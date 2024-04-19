<?php

include_once '../inc/DB.inc.php';

// initialisations des variables à null
$prevLogin = null;
$login = null;
$mdp = null;
$email = null;
$actif = null;
$iddroit = null;

// récupération des données du formulaire si elles sont renseignées
if(isset($_POST['prevLogin'])) {$prevLogin = $_POST['prevLogin'];}

if(isset($_POST['login'])) {$login = $_POST['login'];}

if(isset($_POST['mdp'])) {$mdp = $_POST['mdp'];}

if(isset($_POST['email'])) {$email = $_POST['email'];}

if(isset($_POST['actif'])) {$actif = $_POST['actif'];}

if(isset($_POST['iddroit'])) {$iddroit = $_POST['iddroit'];}


$pdo = DB::getInstance();

// récupération de l'utilisateur à modifier
$utilisateur = $pdo->getUtilisateur($prevLogin)[0];

// modification des données de l'utilisateur si non null
if($login != null)
    $utilisateur->setLogin($login);
if($mdp != null)
    $utilisateur->setMdp($mdp);
if($email != null)
    $utilisateur->setEmail($email);
if($actif != null)
    $utilisateur->setActif($actif);

// mise à jour de l'utilisateur
$pdo->updateUtilisateur($utilisateur);

// si un droit est renseigné, on le met à jour
if($iddroit != null) {
    $droituti = new UtilisateurDroit();
    $droituti->setIdUti($utilisateur->getIdUti());
    $droituti->setIdDroit($iddroit);
    $pdo->updateUtilisateurDroit($droituti);
}