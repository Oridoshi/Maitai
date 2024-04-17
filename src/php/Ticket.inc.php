<?php

class Ticket {

    /** Numéro d'identification du produits commandés. */
    private int $idprod;

    /** Numéro d'identification du client qui commande. */
    private int $idcli;

    /** Quantité du produit acheté. */
    private int $qa;

    /** Prix total de la commande */
    private float $prixtot;

    /**
     * @var int $idprod Numéro d'identification du produits commandés.
     * @var int $idcli Numéro d'identification du client qui commande.
     * @var int $qa Quantité du produit acheté.
     * @var float $prixtot Prix total de la commande
     * Constructeur de la classe Ticket.
     */
    public function __construct(int $idprod = 0, int $idcli = 0, int $qa = 0, float $prixtot = 0.0) {
        $this->idprod = $idprod;
        $this->idcli = $idcli;
        $this->qa = $qa;
        $this->prixtot = $prixtot;
    }

    /** Getter de l'id du produits commandés */
    public function getIdProd(): int {return $this->idprod;}

    /** Getter de l'id du client qui commande */
    public function getIdCli(): int {return $this->idcli;}

    /** Getter de la quantité du produit acheté */
    public function getQa(): int {return $this->qa;}

    /** Getter du prix total de la commande */
    public function getPrixTot(): float {return $this->prixtot;}

    /** Setter de l'id du produits commandés */
    public function setIdProd(int $idprod): void {$this->idprod = $idprod;}

    /** Setter de l'id du client qui commande */
    public function setIdCli(int $idcli): void {$this->idcli = $idcli;}

    /** Setter de la quantité du produit acheté */
    public function setQa(int $qa): void {$this->qa = $qa;}

    /** Setter du prix total de la commande */
    public function setPrixTot(float $prixtot): void {$this->prixtot = $prixtot;}
}