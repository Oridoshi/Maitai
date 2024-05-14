<?php
header("Access-Control-Allow-Origin: *");

$chemin = "./Export.ini";

echo file_get_contents($chemin);