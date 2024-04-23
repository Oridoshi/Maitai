<?php

class Produit {

    /** Numéro d'identification du produit. */
    public int $idprod;

    /** Libellé du produit. */
    public string $libprod;

    /** Prix unitaire du produit. */
    public ?float $prixuni;

    /** Categorie du produit. */
    public string $categorie;

    /**
     * @var int $idprod Numéro d'identification du produit.
     * @var string $libprod Libellé du produit.
     * @var float $prixuni Prix unitaire du produit.
     * @var string $categorie Categorie du produit.
     * Constructeur de la classe Produit.
     */
    public function __construct(int $idprod = 0, string $libprod = "", ?float $prixuni = null, string $categorie = "") {
        $this->idprod = $idprod;
        $this->libprod = $libprod;
        $this->prixuni = $prixuni;
        $this->categorie = $categorie;
    }

    /** Getter de l'id du produit */
    public function getIdProd(): int {return $this->idprod;}

    /** Getter du libellé du produit */
    public function getLibProd(): string {return $this->libprod;}

    /** Getter du prix unitaire du produit */
    public function getPrixUni(): ?float {return $this->prixuni;}

    /** Getter de la categorie du produit */
    public function getCategorie(): string {return $this->categorie;}

    /** Setter de l'id du produit */
    public function setIdProd(int $idprod): void {$this->idprod = $idprod;}

    /** Setter du libellé du produit */
    public function setLibProd(string $libprod): void {$this->libprod = $libprod;}

    /** Setter du prix unitaire du produit */
    public function setPrixUni(?float $prixuni): void {$this->prixuni = $prixuni;}

    /** Setter de la categorie du produit */
    public function setCategorie(string $categorie): void {$this->categorie = $categorie;}
}