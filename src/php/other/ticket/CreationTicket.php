<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

/**
 * Cration d'un ticket défini par :
 * @var int $idprod Numéro d'identification du produits commandés.
 * @var int $idcli Numéro d'identification du client qui commande.
 * @var int $qa Quantité du produit acheté.
 * @var ?float $prixtot Prix total de la commande
 */
$newTicket = new Ticket();
$newTicket->setIdProd($_POST['idprod']);
$newTicket->setIdCli($_POST['idcli']);
$newTicket->setQa($_POST['qa']);
if(isset($_POST['prixtot'])) {
	$newProd->setPrixTot($_POST['prixtot']);
}


/**
 * Insère le produit dans la base de données
 */
DB::getInstance()->insertTicket($Ticket);