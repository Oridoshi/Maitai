<?php

header("Access-Control-Allow-Origin: *");

include_once '../../inc/DB.inc.php';

$login = $_POST['login'];

$pdo = DB::getInstance();

echo $pdo->getUtilisateur($login)->getMdp();