<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$categs = DB::getInstance()->getCategorie();

/**
 * Retourne les catégories de produits
 */
echo json_encode($categs);