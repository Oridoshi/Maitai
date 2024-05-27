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
if($_POST['prixUniHT'] != ""){
    $Prod->setPrixUniHT($_POST['prixUniHT']);
}
$Prod->setDispoMatin($_POST['dispoMatin']==="true" ? 1 : 0);
$Prod->setDispoSoir($_POST['dispoSoir']==="true" ? 1 : 0);
$Prod->setCategorie($_POST['categorie']);

/**
 * Modifie le produit avec le même ID dans la base de données
 */
DB::getInstance()->updateProduit($Prod);