<?php
header('Access-Control-Allow-Origin: *');
include_once '../../inc/DB.inc.php';

if(isset($_POST['idprod']))
    DB::getInstance()->suppTicket($_POST['idprod'],$_POST['idcli']);
else
    DB::getInstance()->suppTicketCli($_POST['idcli']);