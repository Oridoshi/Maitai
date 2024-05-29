<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include_once '../../inc/DB.inc.php';

$email = $_POST['email'];

$pdo = DB::getInstance();

echo $pdo->getUtilisateurByMail($email) != null;