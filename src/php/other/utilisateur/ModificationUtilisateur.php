<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include_once '../../inc/DB.inc.php';

// initialisations des variables
$prevLogin = isset($_POST['prevLogin'])?$_POST['prevLogin']:null;
$email     = isset($_POST['email']    )?$_POST['email']    :null;
$actif     = isset($_POST['actif']    )?$_POST['actif']    :null;
$droit     = isset($_POST['droit']    )?$_POST['droit']    :null;
$login     = $_POST['login'];
$mdp       = $_POST['mdp']  ;

$pdo = DB::getInstance();

if($prevLogin == null || $email == null || $actif == null || $droit == null) {
    $pdo->majMdpUti($login, password_hash($mdp, PASSWORD_DEFAULT));
}
else
{
    // récupération de l'utilisateur à modifier
    $utilisateur = $pdo->getUtilisateurByLogin($prevLogin);

    // vérification si l'utilisateur est le dernier admin actif
    if($utilisateur->getDroit() === "Admin" && $pdo->getNbAdminActif() == 1 && "Admin" != $droit && $actif == 0)
        die("SQLSTATE[45000] : erreur perso : 2255 Vous ne pouvez pas modifier les droits du dernier administrateur ! in");

    // modification des données de l'utilisateur si non null
    $utilisateur->setLogin($login);
    $utilisateur->setMdp($mdp);
    $utilisateur->setEmail($email);
    $utilisateur->setDroit($droit);
    $utilisateur->setActif($actif);
    
    // mise à jour de l'utilisateur
    $pdo->updateUtilisateur($utilisateur);
}