<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$client = DB::getInstance()->getClientById($_POST['iduti']);

echo json_encode($client);