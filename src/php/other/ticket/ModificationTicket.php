<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

$pdo = DB::getInstance();

/**
 * Modification d'un ticket défini par :
 * @var int $idprod Numéro d'identification du produits commandés.
 * @var int $idcli Numéro d'identification du client qui commande.
 * @var int $qa Quantité du produit acheté.
 * @var ?float $prixspe Prix Unitaire pour le produit propre au ticket
 * @var ?float $prixtot Prix total de la commande
 */
$modifTicket = new Ticket();
$modifTicket->setIdProd($_POST['idprod']);
$modifTicket->setIdCli($_POST['idcli']);
$modifTicket->setQa($_POST['qa']);
if(isset($_POST['prixtot'])) {
	$modifTicket->setPrixTot($_POST['prixtot']);
}
else {
	$modifTicket->setPrixTot($_POST['prixspe'] * $_POST['qa']);
}


/**
 * Insère le produit dans la base de données
 */
$pdo->updateTicket($modifTicket);