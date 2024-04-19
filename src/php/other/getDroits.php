<?php

include_once "../inc/DB.inc.php";

$pdo = DB::getInstance();

$droits = $pdo->getDroits();

echo json_encode($droits);