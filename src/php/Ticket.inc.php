<?php

class Ticket {

    /** Numéro d'identification du produits commandés. */
    private int $idProd;

    /** Numéro d'identification du client qui commande. */
    private int $idCli;

    /** Quantité du produit acheté. */
    private int $qa;

    /** Prix total de la commande */
    private float $prixTot;

    /**
     * @var int $idProd Numéro d'identification du produits commandés.
     * @var int $idCli Numéro d'identification du client qui commande.
     * @var int $qa Quantité du produit acheté.
     * @var float $prixTot Prix total de la commande
     * Constructeur de la classe Ticket.
     */
    public function __construct(int $idProd = 0, int $idCli = 0, int $qa = 0, float $prixTot = 0.0) {
        $this->idProd = $idProd;
        $this->idCli = $idCli;
        $this->qa = $qa;
        $this->prixTot = $prixTot;
    }

    /** Getter de l'id du produits commandés */
    public function getIdProd(): int {return $this->idProd;}

    /** Getter de l'id du client qui commande */
    public function getIdCli(): int {return $this->idCli;}

    /** Getter de la quantité du produit acheté */
    public function getQa(): int {return $this->qa;}

    /** Getter du prix total de la commande */
    public function getPrixTot(): float {return $this->prixTot;}

    /** Setter de l'id du produits commandés */
    public function setIdProd(int $idProd): void {$this->idProd = $idProd;}

    /** Setter de l'id du client qui commande */
    public function setIdCli(int $idCli): void {$this->idCli = $idCli;}

    /** Setter de la quantité du produit acheté */
    public function setQa(int $qa): void {$this->qa = $qa;}

    /** Setter du prix total de la commande */
    public function setPrixTot(float $prixTot): void {$this->prixTot = $prixTot;}
}