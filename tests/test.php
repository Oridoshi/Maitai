<?php

include_once '../src/php/inc/Utilisateur.inc.php';
include_once '../src/php/inc/UtilisateurDroit.inc.php';

$uti = new Utilisateur();
$uti->setIdUti(1); // mettre le chiffre de votre choix
$uti->setLogin("toto"); // mettre le login de votre choix entre les ""
$uti->setMdp("toto"); // mettre le mot de passe de votre choix entre les ""
$uti->setEmail("toto@gmail.com"); // mettre l'email de votre choix entre les ""
$uti->setActif(true); // mettre true ou false

$utiDroit = new UtilisateurDroit();
$utiDroit->setIdUti(1); // mettre le chiffre de votre choix
$utiDroit->setIdDroit(1); // mettre le chiffre de votre choix

echo "<h1>Utilisateur </h1><br>";
echo "iduti : " . $uti->getIdUti() . "<br>";
echo "login : " . $uti->getLogin() . "<br>";
echo "mdp : " . $uti->getMdp() . "<br>";
echo "email : " . $uti->getEmail() . "<br>";
echo "actif : " . $uti->getActif() . "<br>";

echo "<br><h1>UtilisateurDroit</h1><br>";
echo "iduti : " . $utiDroit->getIdUti() . "<br>";
echo "iddroit : " . $utiDroit->getIdDroit() . "<br>";