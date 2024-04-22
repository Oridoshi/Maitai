<?php
include_once '../src/php/inc/Produit.inc.php';

//Création produit
$produit = new Produit();
$produit->setIdProd(1);                //Vous pouvez mettre n'importe quel nombre entier qui n'est pas déjà utilisé
$produit->setLibProd("Produit 1");     //Vous pouvez mettre n'importe quel libellé entre ""
$produit->setPrixUni(10.0);            //Vous pouvez mettre n'importe quel nombre décimal
$produit->setCategorie("Catégorie 1"); //Vous pouvez mettre n'importe quelle catégorie entre ""

//Affichage des informations du produit
echo "Id du produit : " . $produit->getIdProd() . "<br>";
echo "Libellé du produit : " . $produit->getLibProd() . "<br>";
echo "Prix unitaire du produit : " . $produit->getPrixUni() . "<br>";
echo "Catégorie du produit : " . $produit->getCategorie() . "<br>";

//Création d'un autre produit avec prix unitaire null
$produit2 = new Produit(2, "Produit 2", null, "Catégorie 2");

//Affichage des informations du produit
echo "Id du produit : " . $produit2->getIdProd() . "<br>";
echo "Libellé du produit : " . $produit2->getLibProd() . "<br>";
echo "Prix unitaire du produit : " . $produit2->getPrixUni() . "<br>";
echo "Catégorie du produit : " . $produit2->getCategorie() . "<br>";