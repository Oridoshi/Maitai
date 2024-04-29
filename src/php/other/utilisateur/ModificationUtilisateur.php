<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

// initialisations des variables
$prevLogin = $_POST['prevLogin'];
$login = $_POST['login'];
$mdp = $_POST['mdp'];
$email = $_POST['email'];
$actif = $_POST['actif'];
$iddroit = $_POST['iddroit'];


$pdo = DB::getInstance();

// récupération de l'utilisateur à modifier
$utilisateur = $pdo->getUtilisateur($prevLogin);

// modification des données de l'utilisateur si non null
if($login != "")
    $utilisateur->setLogin($login);
if($mdp != "")
    $utilisateur->setMdp($mdp);
if($email != "")
    $utilisateur->setEmail($email);

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