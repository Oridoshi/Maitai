<?php
header("Access-Control-Allow-Origin: *");
require_once '../../inc/DB.inc.php';

$idhist = $_POST['idhist'];

DB::getInstance()->suppHistorique($idhist);