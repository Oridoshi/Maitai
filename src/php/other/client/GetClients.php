<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$present = isset($_POST['present']) ? $_POST['present'] : false;


if($present){
    $clients = DB::getInstance()->getClientsPresent();

}
else{
    $clients = DB::getInstance()->getClients();
}


echo json_encode($clients);