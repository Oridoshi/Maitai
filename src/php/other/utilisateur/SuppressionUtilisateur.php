<?php
header("Access-Control-Allow-Origin: *");
include_once "../../inc/DB.inc.php";

//vérification de la présence des données POST
if (!isset($_POST['login'])) exit;
$login = $_POST['login'];

$pdo = DB::getInstance();

// Suppression de l'utilisateur
$utilisateur = $pdo->getUtilisateur($login);
$pdo->suppDroitUtilisateur($utilisateur->getIdUti());
$pdo->suppUtilisateur($utilisateur->getIdUti());