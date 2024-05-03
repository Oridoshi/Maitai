<?php
header("Access-Control-Allow-Origin: *");

$chemin = $_POST['chemin'];

echo readfile($chemin);