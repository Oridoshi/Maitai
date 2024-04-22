<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

/**
 * Vérifie si les données POST sont bien définies
 */
if(!isset($_POST['idProd'])) exit;

/**
 * Crée un nouveau produit avec les données POST
 * la méthode suppProduit() de DB.inc.php attend un objet de type Produit et n'utilise que l'id du produit
 */
$suppProd = new Produit();
$suppProd->setIdProd($_POST['idProd']);

/**
 * Supprime le produit avec les même donnés dans la DB
 */
DB::getInstance()->suppProduit($suppProd);