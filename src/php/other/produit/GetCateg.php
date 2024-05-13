<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

$categs = DB::getInstance()->getCategorie();

if($categs == null || $categs == false) {
	$categs = [];
}

/**
 * Retourne les catégories de produits
 */
echo json_encode($categs);