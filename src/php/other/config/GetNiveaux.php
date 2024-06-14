<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

$chemin = "../../../config/Niveaux/niveaux.ini";


// Lire le fichier niveaux.ini
$config = parse_ini_file($chemin, true);

// Convertir les chaînes de valeurs en tableaux
$config['niveaux']['nivEncadrant'] = explode(',', $config['niveaux']['nivEncadrant']);
$config['niveaux']['nivGeneral'] = explode(',', $config['niveaux']['nivGeneral']);
$config['niveaux']['nivDP'] = explode(',', $config['niveaux']['nivDP']);
$config['niveaux']['nivSecu'] = explode(',', $config['niveaux']['nivSecu']);

// Envoyer la réponse JSON
echo json_encode($config['niveaux']);