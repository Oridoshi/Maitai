<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
include_once '../../inc/DB.inc.php';

/**
 * Récupère les produits de la base de donnée en fonction de la catégorie si une catégorie est passée en paramètre
 */
if(isset($_POST['categ']) && $_POST['categ'] != "")
{
	if(isset($_POST['dispo']) && $_POST['dispo'] != "")
	{
		if($_POST['dispo'] == "matin")
		{
			$prods=DB::getInstance()->getProduitsParCategDispoMatin($_POST['categ']);
		}
		else
		{
			$prods=DB::getInstance()->getProduitsParCategDispoSoir($_POST['categ']);
		}
	}
	else
	{
		$prods=DB::getInstance()->getProduitsParCateg($_POST['categ']);
	}
}
else if(isset($_POST['idprod']) && $_POST['idprod'] != "")
{
	$prods=DB::getInstance()->getProduitById($_POST['idprod']);
}
else
{
	$prods = DB::getInstance()->getProduits();
}

if($prods == null || $prods == false) {
	$prods = [];
}

echo json_encode($prods);