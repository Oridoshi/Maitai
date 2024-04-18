<?php

include_once 'CreationProduit.php';

/**
 * Vérifie si les données POST sont bien définies
 */
if(!isset($_POST['idProd']) || !isset($_POST['libProd']) || !isset($_POST['prixUni']) || !isset($_POST['categorie'])) exit;

/**
 * Crée un nouveau produit
 */
$newProd = new Produit();
$newProd->setIdProd($_POST['idProd']);
$newProd->setLibProd($_POST['libProd']);
$newProd->setPrixUni($_POST['prixUni']);
$newProd->setCategorie($_POST['categorie']);

/**
 * Insère le produit dans la base de données
 */
DB::getInstance()->insertProduit($newProd);