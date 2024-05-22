<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include_once '../../inc/DB.inc.php';

$login = $_POST['login'];
$pwd = $_POST['mdp']; 

$pdo = DB::getInstance();

$uti = $pdo->getUtilisateurByLogin($login);
$mdp = $uti->getMdp();

if(isset($_POST['connexion'])) {
    echo password_verify($pwd, $mdp) && $uti->getActif() == 1;
} else {
    echo $pwd == $mdp && $uti->getActif() == 1;
}