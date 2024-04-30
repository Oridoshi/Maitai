<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

/**
 * Vérifie si les données POST sont bien définies
 */
if(!isset($_POST['idProd']) || $_POST['ref'] || !isset($_POST['libProd']) || !isset($_POST['prixUni']) || !isset($_POST['categorie'])) exit;

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
