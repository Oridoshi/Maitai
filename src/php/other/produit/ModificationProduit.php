<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

/**
 * Crée un nouveau produit avec les données POST
 */
$Prod = new Produit();
$Prod->setIdProd($_POST['idProd']);
$Prod->setRef($_POST['ref']);
$Prod->setLibProd($_POST['libProd']);
if($_POST['prixUni'] != ""){
    $Prod->setPrixUni($_POST['prixUni']);
} 
$Prod->setCategorie($_POST['categorie']);

/**
 * Modifie le produit avec le même ID dans la base de données
 */
DB::getInstance()->updateProduit($Prod);