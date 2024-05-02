<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';


/**
 * Get Produit du Ticket en fonction de client si idcli est set sinon get all
 */
if(isset($_POST['idcli'])) {
	$lstProdTicket = DB::getInstance()->getProdTicket($_POST['idcli']);
}
else {
	$lstProdTicket = DB::getInstance()->getProdTicket(null);
}

echo json_encode($lstProdTicket);