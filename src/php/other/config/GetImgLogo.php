<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

// $chemin = "../../../config/Manuel/Manuel_" . $droit . ".pdf";
$chemin = $_SERVER['DOCUMENT_ROOT'] ."/config/img/imgLogo.png";

echo readfile($chemin);