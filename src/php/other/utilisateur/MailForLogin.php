<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include_once '../../inc/DB.inc.php';

$login = $_POST['login'];
$mail = $_POST['email'];

$pdo = DB::getInstance();

$uti = $pdo->getUtilisateurByLogin($login);

echo $uti->getEmail() == $mail;