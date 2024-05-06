<?php

header("Access-Control-Allow-Origin: *");

include_once '../../inc/DB.inc.php';

$login = $_POST['login'];
$mail = $_POST['email'];

$pdo = DB::getInstance();

$uti = $pdo->getUtilisateur($login);

echo $uti->getEmail() == $mail;