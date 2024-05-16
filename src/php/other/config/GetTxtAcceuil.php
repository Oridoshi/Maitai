<?php
header('Access-Control-Allow-Origin: *');

$chemin = "../../../config/txtAcceuil/txtAcceuil.ini";

echo file_get_contents($chemin);