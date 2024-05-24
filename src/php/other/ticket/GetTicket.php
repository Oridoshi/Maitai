<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';


/**
 * Get Produit du Ticket en fonction de client si iduti est set sinon get all
 */
if(isset($_POST['iduti'])) {
	$lstProdTicket = DB::getInstance()->getProdTicket($_POST['iduti']);
}
else {
	$lstProdTicket = DB::getInstance()->getProdTicket(null);
}

if($lstProdTicket == null || $lstProdTicket == false) {
	$lstProdTicket = [];
}

echo json_encode($lstProdTicket);