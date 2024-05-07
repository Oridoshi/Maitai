<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include_once '../../inc/DB.inc.php';

$login = $_POST['login'];
$pwd = $_POST['mdp']; 

$pdo = DB::getInstance();

echo password_verify($pwd, $pdo->getUtilisateur($login)->getMdp()) || $pwd == $pdo->getUtilisateur($login)->getMdp();