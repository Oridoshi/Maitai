<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

/**
 * Suppression d'un Produit d'un ticket
 */
DB::getInstance()->suppTicket($_POST['idprod'],$_POST['idcli']);