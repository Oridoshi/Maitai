<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$client = DB::getInstance()->getClientById($_POST['idcli']);

if($client == null || $client == false) {
	$client = [];
}

echo json_encode($client);