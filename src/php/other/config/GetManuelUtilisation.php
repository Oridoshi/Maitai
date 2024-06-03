<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

$droit = $_POST['droit'];

$chemin = "../../../config/Manuel/Manuel_" + $droit + ".pdf";

echo readfile($chemin);