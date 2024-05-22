<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include_once '../../inc/DB.inc.php';

$login = $_POST['login'];

$pdo = DB::getInstance();

$uti = $pdo->getUtilisateurByLogin($login);

echo $uti != null && $uti->getMdp() != null && $uti->getMdp() != "";