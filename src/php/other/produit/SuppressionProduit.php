<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$pdo=DB::getInstance();

$idProd = $_POST['idProd'];

if($pdo->prodDansTicket($idProd))
    die("SQLSTATE[45000] : erreur perso : 5225 Ce produit est dans un ticket, il ne peut donc pas être supprimé ! in");

/**
 * Crée un nouveau produit avec les données POST
 * la méthode suppProduit() de DB.inc.php attend un objet de type Produit et n'utilise que l'id du produit
 */
$suppProd = new Produit();
$suppProd->setIdProd($idProd);

/**
 * Supprime le produit avec les même donnés dans la DB
 */
$pdo->suppProduit($suppProd);