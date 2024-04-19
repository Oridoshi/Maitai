<?php

include_once '../inc/DB.inc.php';

/**
 * Vérifie si les données POST sont bien définies
 */
if(!isset($_POST['idProd']) || !isset($_POST['libProd']) || !isset($_POST['categorie'])) exit;

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