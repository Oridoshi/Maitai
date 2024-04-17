<?php

class Droit {

    /** Numéro d'identification du droit. */
    private int $idDroit;

    /** Libellé du droit afin de faciliter l'identification. */
    private string $libDroit;

    /**
     * @var int $idDroit Numéro d'identification du droit.
     * @var string $libDroit Libellé du droit afin de faciliter l'identification.
     * Constructeur de la classe Droit.
     */
    public function __construct(int $idDroit = 0, string $libDroit = "") {
        $this->idDroit = $idDroit;
        $this->libDroit = $libDroit;
    }

    /** Getter de l'id du Droit */
    public function getIdDroit(): int {return $this->idDroit;}

    /** Getter du libellé du Droit */
    public function getLibDroit(): string {return $this->libDroit;}

    /** Setter de l'id du Droit */
    public function setIdDroit(int $idDroit): void {$this->idDroit = $idDroit;}

    /** Setter du libellé du Droit */
    public function setLibDroit(string $libDroit): void {$this->libDroit = $libDroit;}
}