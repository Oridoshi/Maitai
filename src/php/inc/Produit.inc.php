<?php

class Produit {

    /** Numéro d'identification du produit. */
    public int $idprod;

    /** Référence du produit. */
    public string $ref;

    /** Libellé du produit. */
    public string $libprod;

    /** Prix unitaire du produit. */
    public ?float $prixuni;

    /** Prix unitaire hors taxe du produit */
    public ?float $prixuniht;

    /** TVA du produit */
    public ?float $tva;

    /** Disponible le matin */
    public bool $dispomatin;

    /** Disponible le soir */
    public bool $disposoir;

    /** Categorie du produit. */
    public string $categorie;

    /**
     * @var int $idprod Numéro d'identification du produit.
     * @var string $libprod Libellé du produit.
     * @var ?float $prixuni Prix unitaire du produit.
     * @var string $categorie Categorie du produit.
     * Constructeur de la classe Produit.
     */
    public function __construct(int $idprod = 0, string $ref = "", string $libprod = "", ?float $prixuni = null, ?float $prixuniht = null, $tva = null, bool $dispomatin = false, bool $disposoir = false, string $categorie = "") {
        $this->idprod = $idprod;
        $this->ref = $ref;
        $this->libprod = $libprod;
        $this->prixuni = $prixuni;
        $this->prixuniht = $prixuniht;
        $this->tva = $tva;
        $this->dispomatin = $dispomatin;
        $this->disposoir = $disposoir;
        $this->categorie = $categorie;
    }

    /** Getter de l'id du produit */
    public function getIdProd(): int {return $this->idprod;}

    /** Getter de la référence du produit */
    public function getRef(): string {return $this->ref;}

    /** Getter du libellé du produit */
    public function getLibProd(): string {return $this->libprod;}

    /** Getter du prix unitaire du produit */
    public function getPrixUni(): ?float {return $this->prixuni;}

    /** Getter du prix unitaire hors taxe du produit */
    public function getPrixUniHt(): ?float {return $this->prixuniht;}

    /** Getter de la TVA */
    public function getTva(): ?float {return $this->tva;}

    /** Getter du diponible matin */
    public function getDispoMatin(): bool {return $this->dispomatin;}

    /** Getter du diponible soir */
    public function getDispoSoir(): bool {return $this->disposoir;}

    /** Getter de la categorie du produit */
    public function getCategorie(): string {return $this->categorie;}

    /** Setter de l'id du produit */
    public function setIdProd(int $idprod): void {$this->idprod = $idprod;}

    /** Setter de la référence du produit */
    public function setRef(string $ref): void {$this->ref = $ref;}

    /** Setter du libellé du produit */
    public function setLibProd(string $libprod): void {$this->libprod = $libprod;}

    /** Setter du prix unitaire du produit */
    public function setPrixUni(?float $prixuni): void {$this->prixuni = $prixuni;}

    /** Setter du prix unitaire hors taxe du produit */
    public function setPrixUniHT(?float $prixuniht): void {$this->prixuniht = $prixuniht;}

    /** Setter de la TVA */
    public function setTva(?float $tva): void {$this->tva = $tva;}

    /** Setter du diponible matin */
    public function setDispoMatin(bool $dispomatin): void {$this->dispomatin = $dispomatin;}

    /** Setter du diponible soir */
    public function setDispoSoir(bool $disposoir): void {$this->disposoir = $disposoir;}

    /** Setter de la categorie du produit */
    public function setCategorie(string $categorie): void {$this->categorie = $categorie;}
}