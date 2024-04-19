<?php

include_once '../inc/DB.inc.php';

/**
 * Vérifie si les données POST sont bien définies
 */
if(!isset($_POST['idProd'])) exit;

/**
 * Crée un nouveau produit avec les données POST
 */
$suppProd = new Produit();
$suppProd->setIdProd($_POST['idProd']);

/**
 * Supprime le produit avec les même donnés dans la DB
 */
DB::getInstance()->suppProduit($suppProd);