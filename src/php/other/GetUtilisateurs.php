<?php

include_once "../inc/DB.inc.php";

$pdo = DB::getInstance();

$utilisateurs = $pdo->getUtilisateursEtDroit();

echo json_encode($utilisateurs);