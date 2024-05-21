<?php

class Demande {
    /** identidifiant du produit */
    public int $idProd;

    /** identifiant de l'utilisateur */
    public int $idUti;

    /** quantité acheté */
    public int $qa;

    /** date de la demande */
    public string $date;

    /** Matin ou apès midi */
    public bool $pourMatin;

    /** Si la demande est validé ou non */
    public bool $valide;

    /**
     * @var int $idProd identidifiant du produit
     * @var int $idUti identifiant de l'utilisateur
     * @var int $qa quantité acheté
     * @var string $date date de la demande
     * @var bool $pourMatin Matin ou apès midi
     * @var bool $valide Si la demande est validé ou non
     * Constructeur de la classe Demande.
     */
    public function __construct(int $idProd = 0, int $idUti = 0, int $qa = 0, string $date = "", bool $pourMatin = true, bool $valide = false) {
        $this->idProd = $idProd;
        $this->idUti = $idUti;
        $this->qa = $qa;
        $this->date = $date;
        $this->pourMatin = $pourMatin;
        $this->valide = $valide;
    }

    /** Getter de l'id du produit */
    public function getIdProd(): int {return $this->idProd;}

    /** Getter de l'id de l'utilisateur */
    public function getIdUti(): int {return $this->idUti;}

    /** Getter de la quantité acheté */
    public function getQa(): int {return $this->qa;}

    /** Getter de la date de la demande */
    public function getDate(): string {return $this->date;}

    /** Getter de la période de la demande */
    public function getPourMatin(): bool {return $this->pourMatin;}

    /** Getter de la validation de la demande */
    public function getValide(): bool {return $this->valide;}


    /** Setter de l'id du produit */
    public function setIdProd(int $idProd): void {$this->idProd = $idProd;}

    /** Setter de l'id de l'utilisateur */
    public function setIdUti(int $idUti): void {$this->idUti = $idUti;}

    /** Setter de la quantité acheté */
    public function setQa(int $qa): void {$this->qa = $qa;}

    /** Setter de la date de la demande */
    public function setDate(string $date): void {$this->date = $date;}

    /** Setter de la période de la demande */
    public function setPourMatin(bool $pourMatin): void {$this->pourMatin = $pourMatin;}

    /** Setter de la validation de la demande */
    public function setValide(bool $valide): void {$this->valide = $valide;}
}