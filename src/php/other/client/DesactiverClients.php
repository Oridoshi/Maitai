<?php
header("Access-Control-Allow-Origin: *");

include_once "../../inc/DB.inc.php";

$clients = DB::getInstance()->getClients();

foreach($clients as $client) {
    $client->setPresent(false);
    DB::getInstance()->updateClient($client);
}