<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

/**
 * Modification d'un ticket défini par :
 * @var int $idprod Numéro d'identification du produits commandés.
 * @var int $idcli Numéro d'identification du client qui commande.
 * @var int $qa Quantité du produit acheté.
 * @var ?float $prixtot Prix total de la commande
 */
$modifTicket = new Ticket();
$modifTicket->setIdProd($_POST['idprod']);
$modifTicket->setIdCli($_POST['idcli']);
$modifTicket->setQa($_POST['qa']);
if(isset($_POST['prixtot'])) {
	$newProd->setPrixTot($_POST['prixtot']);
}


/**
 * Insère le produit dans la base de données
 */
DB::getInstance()->updateTicket($modifTicket);