<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

$pdo = DB::getInstance();

echo $pdo->getNbProdTicketCli($_POST['idUti']) > 0;