<?php

include_once "../inc/DB.inc.php";

if (!isset($_POST['login'])) exit;
$login = $_POST['login'];

$pdo = DB::getInstance();

// Suppression de l'utilisateur
$utilisateur = $pdo->getUtilisateur($login)[0];
$pdo->suppDroitUtilisateur($utilisateur->getIdUti());
$pdo->suppUtilisateur($utilisateur->getIdUti());