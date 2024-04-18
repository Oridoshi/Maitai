<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Inclure la classe DB
require_once '../src/php/DB.inc.php';

// Créer une instance de la classe DB
$db = DB::getInstance();

$nouvUti = new Utilisateur();
$nouvUti->setLogin('loginTest');
$nouvUti->setEmail('emailTest@gmail.com');

$db->insertUtilisateur($nouvUti);

$lstUti = $db->getUtilisateurs();

for ($i = 0; $i < count($lstUti); $i++) {
    echo($lstUti[$i]->getLogin() . ' - ' . $lstUti[$i]->getEmail() . '<br>');
}


$lstUti[1]->setLogin('loginTest');
$db->updateUtilisateur($lstUti[1]);


$lstUti[1]->setLogin('admin2');
$lstUti[1]->setEmail('emailTest@gmail.com');
$db->updateUtilisateur($lstUti[1]);

$db->insertUtilisateur($lstUti[1]);


$db->suppUtilisateur($lstUti[count($lstUti) - 1]);

$lstUti = $db->getUtilisateurs();

for ($i = 0; $i < count($lstUti); $i++) {
    echo($lstUti[$i]->getLogin() . ' - ' . $lstUti[$i]->getEmail() . '<br>');
}


// Produit
$nouvProduit = new Produit();
$nouvProduit->setIdProd(99);
$nouvProduit->setLibProd('Hugo');
$nouvProduit->setPrixUni(1);
$nouvProduit->setCategorie('Z-Developeur');
$db->insertProduit($nouvProduit);

$lstProd = $db->getProduits();

for ($i = 0; $i < count($lstProd); $i++) {
    echo($lstProd[$i]->getIdProd() . ' - ' . $lstProd[$i]->getLibProd() . ' - ' . $lstProd[$i]->getPrixUni() . ' - ' . $lstProd[$i]->getCategorie() . '<br>');
}

$lstProd[count($lstProd) - 1]->setPrixUni(69.69);
$lstProd[count($lstProd) - 1]->setLibProd('69.69');
$lstProd[count($lstProd) - 1]->setCategorie('ZZ-Developeur');
$db->updateProduit($lstProd[count($lstProd) - 1]);

$lstProd = $db->getProduits();

for ($i = 0; $i < count($lstProd); $i++) {
    echo($lstProd[$i]->getIdProd() . ' - ' . $lstProd[$i]->getLibProd() . ' - ' . $lstProd[$i]->getPrixUni() . ' - ' . $lstProd[$i]->getCategorie() . '<br>');
}

$db->suppProduit($lstProd[count($lstProd) - 1]);



$lstClient = $db->getClients();


//Ticket
// $lstTicket = $db->getTicketClient($lstClient[1]);
// $db->suppTicket($lstTicket[count($lstTicket) - 1]);  
$nouvTicket = new Ticket();
$nouvTicket->setIdProd(7);
$nouvTicket->setIdCli($lstClient[1]->getIdCli());

$db->insertTicket($nouvTicket);
$lstTicket = $db->getTicketClient($lstClient[1]);

for ($i = 0; $i < count($lstTicket); $i++) {
  echo($lstTicket[$i]->getIdProd() . ' - ' . $lstTicket[$i]->getIdCli() . ' - ' . $lstTicket[$i]->getPrixTot() . '<br>');
}

$lstTicket[count($lstTicket) - 1]->setPrixTot(1.1);

$db->updateTicket($lstTicket[count($lstTicket) - 1]);

$lstTicket = $db->getTicketClient($lstClient[1]);

for ($i = 0; $i < count($lstTicket); $i++) {
    echo($lstTicket[$i]->getIdProd() . ' - ' . $lstTicket[$i]->getIdCli() . ' - ' . $lstTicket[$i]->getPrixTot() . '<br>');
}
// $db->suppTicket($lstTicket[count($lstTicket) - 1]);  


//Historique
$nouvHisto = new Historique();
$nouvHisto->setChemin('cheminTest');
$nouvHisto->setType('SECU');
$nouvHisto->setIdCli($lstClient[1]->getIdCli());

$db->insertHistorique($nouvHisto);

$lstHisto = $db->getHistoriqueSecu();

for ($i = 0; $i < count($lstHisto); $i++) {
    echo($lstHisto[$i]->getChemin() . ' - ' . $lstHisto[$i]->getType() . ' - ' . $lstHisto[$i]->getIdCli() . '<br>' . '<br>');
}

$nouvHisto2 = new Historique();
$nouvHisto2->setChemin('cheminTest');
$nouvHisto2->setType('TICKET');
$nouvHisto2->setIdCli($lstClient[1]->getIdCli());

$db->insertHistorique($nouvHisto2);

$lstHisto = $db->getHistoriqueTicket();

for ($i = 0; $i < count($lstHisto); $i++) {
    echo($lstHisto[$i]->getChemin() . ' - ' . $lstHisto[$i]->getType() . ' - ' . $lstHisto[$i]->getIdCli() . '<br>');
}


$lstHisto = $db->getHistoriqueSecuClient($lstClient[1]);

for ($i = 0; $i < count($lstHisto); $i++) {
    echo($lstHisto[$i]->getChemin() . ' - ' . $lstHisto[$i]->getType() . ' - ' . $lstHisto[$i]->getIdCli() . '<br>');
}


$db->suppHistorique($lstHisto[count($lstHisto) - 1]);
$db->suppHistorique($lstHisto[count($lstHisto) - 1]);


//Droit
$lstDroit = $db->getDroits();

for ($i = 0; $i < count($lstDroit); $i++) {
    echo($lstDroit[$i]->getIdDroit() . ' - ' . $lstDroit[$i]->getLibDroit() . '<br>');
}

$lstDroitUti = $db->getDroitUtilisateur($lstUti[1]);


for ($i = 0; $i < count($lstDroitUti); $i++) {
    echo($lstDroitUti[$i]->getIdDroit() . ' - ' . $lstDroitUti[$i]->getIdUti() . '<br>');
}

$utiDroit = new UtilisateurDroit();
$utiDroit->setIdUti($lstUti[1]->getIdUti());
$utiDroit->setIdDroit($lstDroit[1]->getIdDroit());

$db->insertDroitUtilisateur($utiDroit);

$lstDroitUti = $db->getDroitUtilisateur($lstUti[1]);

for ($i = 0; $i < count($lstDroitUti); $i++) {
    echo($lstDroitUti[$i]->getIdDroit() . ' - ' . $lstDroitUti[$i]->getIdUti() . '<br>');
}

$db->suppDroitUtilisateur($lstDroitUti[count($lstDroitUti) - 1]);

$lstDroitUti = $db->getDroitUtilisateur($lstUti[1]);

for ($i = 0; $i < count($lstDroitUti); $i++) {
    echo($lstDroitUti[$i]->getIdDroit() . ' - ' . $lstDroitUti[$i]->getIdUti() . '<br>');
}


//Client
$nouvClient = new Client();
$nouvClient->setNomClub('nomTest');
$nouvClient->setEmail('nomTest@gmail.com');
$nouvClient->setTelephone('123456789');
$nouvClient->setPresent(true);

$db->insertClient($nouvClient);

$lstClient = $db->getClients();

for ($i = 0; $i < count($lstClient); $i++) {
    echo($lstClient[$i]->getIdCli() . ' - ' . $lstClient[$i]->getNomClub() . ' - ' . $lstClient[$i]->getEmail() . ' - ' . $lstClient[$i]->getTelephone() . ' - ' . $lstClient[$i]->getPresent() . '<br>');
}

$lstClient[count($lstClient) - 1]->setNomClub('nomTest2');
$lstClient[count($lstClient) - 1]->setEmail('test@gmail.com');
$lstClient[count($lstClient) - 1]->setTelephone('987654321');
$lstClient[count($lstClient) - 1]->setPresent(false);
$db->updateClient($lstClient[count($lstClient) - 1]);

$lstClient = $db->getClients();

for ($i = 0; $i < count($lstClient); $i++) {
    echo($lstClient[$i]->getIdCli() . ' - ' . $lstClient[$i]->getNomClub() . ' - ' . $lstClient[$i]->getEmail() . ' - ' . $lstClient[$i]->getTelephone() . ' - ' . $lstClient[$i]->getPresent() . '<br>');
}

$lstClient[count($lstClient) - 1]->setNomClub('Club de plongée A');
$db->updateClient($lstClient[count($lstClient) - 1]);

$db->suppClient($lstClient[count($lstClient) - 1]);