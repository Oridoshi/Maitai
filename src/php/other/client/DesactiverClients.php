<?php
header("Access-Control-Allow-Origin: *");

include_once "../../inc/DB.inc.php";

DB::getInstance()->setClientNonPresent();