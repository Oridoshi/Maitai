<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$login = $_POST['login'];

$client = DB::getInstance()->getUtilisateurByLogin($login);

echo $client->getIdUti();