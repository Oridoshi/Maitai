<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$login = $_POST['login'];

$client = DB::getInstance()->getClient($login)[0];

echo $client->getIdCli();