<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

/**
 * Crée un nouveau produit
 */
$newProd = new Produit();
$newProd->setRef($_POST['ref']);
$newProd->setLibProd($_POST['libProd']);
if($_POST['prixUni'] != ""){
    $newProd->setPrixUni($_POST['prixUni']);
}
if($_POST['prixUniHT'] != ""){
    $Prod->setPrixUniHT($_POST['prixUniHT']);
}
$newProd->setDispoMatin($_POST['dispoMatin']);
$newProd->setDispoSoir($_POST['dispoSoir']);
$newProd->setCategorie($_POST['categorie']);

/**
 * Insère le produit dans la base de données
 */
DB::getInstance()->insertProduit($newProd);
