<?php

include_once "../inc/DB.inc.php";

$clients = DB::getInstance()->getClients();

echo json_encode($clients);