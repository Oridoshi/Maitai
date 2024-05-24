<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include_once "../../inc/DB.inc.php";

//vérification de la présence des données POST
if (!isset($_POST['login'])) exit;
$login = $_POST['login'];

$pdo = DB::getInstance();

$utilisateur = $pdo->getUtilisateurByLogin($login);

// vérification si l'utilisateur est le dernier admin actif
if($utilisateur->getDroit() === "Admin" && $pdo->getNbAdminActif() == 1)
	die("SQLSTATE[45000] : erreur perso : 5552 Vous ne pouvez pas supprimer le dernier administrateur ! in C:");

// Suppression de l'utilisateur
$pdo->suppUtilisateur($utilisateur->getIdUti());