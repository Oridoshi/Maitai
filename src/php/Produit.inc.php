<?php

class Produit {

    /** Numéro d'identification du produit. */
    private int $idProd;

    /** Libellé du produit. */
    private string $libProd;

    /** Prix unitaire du produit. */
    private float $prixUni;

    /** Categorie du produit. */
    private string $categorie;

    /**
     * @var int $idProd Numéro d'identification du produit.
     * @var string $libProd Libellé du produit.
     * @var float $prixUni Prix unitaire du produit.
     * @var string $categorie Categorie du produit.
     * Constructeur de la classe Produit.
     */
    public function __construct(int $idProd = 0, string $libProd = "", float $prixUni = 0.0, string $categorie = "") {
        $this->idProd = $idProd;
        $this->libProd = $libProd;
        $this->prixUni = $prixUni;
        $this->categorie = $categorie;
    }

    /** Getter de l'id du produit */
    public function getIdProd(): int {return $this->idProd;}

    /** Getter du libellé du produit */
    public function getLibProd(): string {return $this->libProd;}

    /** Getter du prix unitaire du produit */
    public function getPrixUni(): float {return $this->prixUni;}

    /** Getter de la categorie du produit */
    public function getCategorie(): string {return $this->categorie;}

    /** Setter de l'id du produit */
    public function setIdProd(int $idProd): void {$this->idProd = $idProd;}

    /** Setter du libellé du produit */
    public function setLibProd(string $libProd): void {$this->libProd = $libProd;}

    /** Setter du prix unitaire du produit */
    public function setPrixUni(float $prixUni): void {$this->prixUni = $prixUni;}

    /** Setter de la categorie du produit */
    public function setCategorie(string $categorie): void {$this->categorie = $categorie;}
}