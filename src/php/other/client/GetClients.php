<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$present = isset($_POST['present']) ? $_POST['present'] : false;


if($present){

echo "testP";
    $clients = DB::getInstance()->getClientsPresent();

echo "testPP";
}
else{

echo "test";
    $clients = DB::getInstance()->getClients();


echo "test";
}


echo json_encode($clients);
var_dump($clients);