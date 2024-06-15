<?php

header("Access-Control-Allow-Origin: *");

include_once '../../inc/DB.inc.php';
include_once '../../inc/Palanquee.inc.php';

$pdo = DB::getInstance();

$palanquees = $pdo->getPalanquees();

echo json_encode($palanquees);