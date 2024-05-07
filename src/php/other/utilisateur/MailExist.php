<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include_once '../../inc/DB.inc.php';

$mail = $_POST['mail'];

$pdo = DB::getInstance();

echo $pdo->getUtilisateurByMail($mail) != null;