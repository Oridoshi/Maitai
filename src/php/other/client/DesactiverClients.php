<?php
header('Cross-Origin-Opener-Policy: same-origin');

include_once "../../inc/DB.inc.php";

$clients = DB::getInstance()->getClients();

foreach($clients as $client) {
    $client->setActif(false);
    DB::getInstance()->updateClient($client);
}