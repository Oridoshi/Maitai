<?php
include_once '../src/php/inc/Ticket.inc.php';

/**
 * Création d'un ticket.
 * `setIdProd` : Vous pouvez mettre l'id du produit existant dans la base de données (Nombre entier).
 * `setIdCli` : Vous pouvez mettre l'id du client existant dans la base de données (Nombre entier).
 * `setQa` : Vous pouvez mettre la quantité du produit acheté (Nombre entier).
 * `setPrixTot` : Vous pouvez mettre le prix total de la commande (Nombre à virgule).
 */
$ticket = new Ticket();
$ticket->setIdProd(1);
$ticket->setIdCli(2);
$ticket->setQa(3);
$ticket->setPrixTot(4.0);

//Affichage Ticket
echo "Ticket : idprod = " . $ticket->getIdProd() . ", idcli = " . $ticket->getIdCli() . ", qa = " . $ticket->getQa() . ", prixtot = " . $ticket->getPrixTot() . "\n";

/**
 * Création d'un ticket.
 * `setIdProd` : Vous pouvez mettre l'id du produit existant dans la base de données (Nombre entier).
 * `setIdCli` : Vous pouvez mettre l'id du client existant dans la base de données (Nombre entier).
 * `setQa` : Vous pouvez mettre la quantité du produit acheté (Nombre entier).
 */
$ticket2 = new Ticket();
$ticket2->setIdProd(1);
$ticket2->setIdCli(2);
$ticket2->setQa(3);

//Affichage Ticket
echo "Ticket2 : idprod = " . $ticket2->getIdProd() . ", idcli = " . $ticket2->getIdCli() . ", qa = " . $ticket2->getQa() . ", prixtot = " . $ticket2->getPrixTot() . "\n";