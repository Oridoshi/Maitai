<?php

class Ticket {

    /** Numéro d'identification du produits commandés. */
    public int $idprod;

    /** Numéro d'identification du client qui commande. */
    public int $iduti;

    /** Quantité du produit acheté. */
    public int $qa;

    /** Prix Unitaire pour le produit */
    public float $prixspe;

    /** Prix total de la commande */
    public ?float $prixtot;

    /**
     * @var int $idprod Numéro d'identification du produits commandés.
     * @var int $iduti Numéro d'identification du client qui commande.
     * @var int $qa Quantité du produit acheté.
     * @var ?float $prixspe Prix Unitaire pour le produit
     * @var ?float $prixtot Prix total de la commande
     * Constructeur de la classe Ticket.
     */
    public function __construct(int $idprod = 0, int $iduti = 0, int $qa = 0, float $prixspe = 0, ?float $prixtot = null) {
        $this->idprod = $idprod;
        $this->iduti = $iduti;
        $this->prixspe = $prixspe;
        $this->qa = $qa;
        $this->prixtot = $prixtot;
    }

    /** Getter de l'id du produits commandés */
    public function getIdProd(): int {return $this->idprod;}

    /** Getter de l'id du client qui commande */
    public function getIdUti(): int {return $this->iduti;}
    
    /** Getter de la quantité du produit acheté */
    public function getQa(): int {return $this->qa;}
    
    /** Getter du prix propre au ticket */
    public function getPrixSpe(): float {return $this->prixspe;}
    /** Getter du prix total de la commande */

    public function getPrixTot(): ?float {return $this->prixtot;}

    /** Setter de l'id du produits commandés */
    public function setIdProd(int $idprod): void {$this->idprod = $idprod;}

    /** Setter de l'id du client qui commande */
    public function setIdUti(int $iduti): void {$this->iduti = $iduti;}

    /** Setter de la quantité du produit acheté */
    public function setQa(int $qa): void {$this->qa = $qa;}

    /** Setter du prix propre au ticket */
    public function setPrixSpe(float $prixspe): void {$this->prixspe = $prixspe;}

    /** Setter du prix total de la commande */
    public function setPrixTot(?float $prixtot): void {$this->prixtot = $prixtot;}
}