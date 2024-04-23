<?php

include '../src/php/inc/Client.inc.php';

$test = new Client();
$test->setIdCli(0); // Modifier l'id du client pour voir le changement
$test->setNomClub("club1"); // Modifier le nom du club pour voir le changement (mettre le texte entres les "")
$test->setTelephone("0606060606"); // Modifier le téléphone pour voir le changement (mettre le texte entres les "")
$test->setEmail("club1@gmail.com"); // Modifier l'email pour voir le changement (mettre le texte entres les "")

echo 'Id du client : ' . $test->getIdCli() . '<br>';
echo 'Nom du club : ' . $test->getNomClub() . '<br>';
echo 'Téléphone : ' . $test->getTelephone() . '<br>';
echo 'Email : ' . $test->getEmail() . '<br>';