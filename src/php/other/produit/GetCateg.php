<?php
header("Access-Control-Allow-Origin: *");
include_once '../../inc/DB.inc.php';

/**
 * Récupère les catégories de produits
 */
if(isset($_POST['$pourMatin']) && $_POST['$pourMatin'] != "")
{
	$categs = DB::getInstance()->getCategorieDispo();
}
else
{
	$categs = DB::getInstance()->getCategorie();
}

/**
 * Retourne les catégories de produits
 */
echo json_encode($categs);