<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

// initialisations des variables
$prevLogin = isset($_POST['prevLogin'])?$_POST['prevLogin']:null;
$email     = isset($_POST['email']    )?$_POST['email']    :null;
$actif     = isset($_POST['actif']    )?$_POST['actif']    :null;
$iddroit   = isset($_POST['iddroit']  )?$_POST['iddroit']  :null;
$login     = $_POST['login'];
$mdp       = $_POST['mdp']  ;

$pdo = DB::getInstance();

if($prevLogin == null || $email == null || $actif == null || $iddroit == null) {
    $pdo->majMdpUti($login, $mdp);
}
else
{
    
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
}