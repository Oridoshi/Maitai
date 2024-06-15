<?php

header("Access-Control-Allow-Origin: *");

include_once '../../inc/DB.inc.php';
include_once '../../inc/Palanquee.inc.php';

$pdo = DB::getInstance();

$palanquee = new Palanquee();

$palanquee->setNomPlongeurs($_POST['nomPlongeurs']);
$palanquee->setHd($_POST['hd']);
$palanquee->setDuree($_POST['duree']);

$pdo->insertPalanquee($palanquee);

echo $pdo->getCurrentIdPalanquee();