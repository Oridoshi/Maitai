<?php

include_once '../inc/DB.inc.php';

if(!isset($_POST['login']) || !isset($_POST['email'])) exit;

$login = $_POST['login'];
$email = $_POST['email'];
$pdo = DB::getInstance();


$utilisateur = new Utilisateur();
$utilisateur->setLogin($login);
$utilisateur->setEmail($email);

$pdo->insertUtilisateur($utilisateur);