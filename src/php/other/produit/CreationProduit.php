<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

/**
 * Crée un nouveau produit
 */
$newProd = new Produit();
$newProd->setIdProd($_POST['idProd']);
$newProd->setLibProd($_POST['libProd']);

if($_POST['prixUni'] != ""){
    $newProd->setPrixUni($_POST['prixUni']);
}

$newProd->setCategorie($_POST['categorie']);

/**
 * Insère le produit dans la base de données
 */
DB::getInstance()->insertProduit($newProd);
