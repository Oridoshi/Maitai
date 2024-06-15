<?php

header("Access-Control-Allow-Origin: *");

include_once '../../inc/DB.inc.php';

$pdo = DB::getInstance();

$pdo->suppPalanquee($_POST['idPalanquee']);