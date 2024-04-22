<?php

include_once '../../inc/DB.inc.php';

/**
 * Récupère les produits de la base de donnée en fonction de la catégorie si une catégorie est passée en paramètre
 */
if(isset($_POST['categ']))
{
	$prods=DB::getInstance()->getProduitsParCateg($_POST['categ']);
}
/**
 * Récupère tout les produit de la base de donnée trié par catégorie
 */
else
{
	$prods = DB::getInstance()->getProduits();
}

/**
 * Retourne les produits récupéré au format JSON
 */
echo json_encode($prods);