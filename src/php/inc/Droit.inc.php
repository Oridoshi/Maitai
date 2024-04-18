<?php

class Droit {

    /** Numéro d'identification du droit. */
    private int $iddroit;

    /** Libellé du droit afin de faciliter l'identification. */
    private string $libdroit;

    /**
     * @var int $iddroit Numéro d'identification du droit.
     * @var string $libdroit Libellé du droit afin de faciliter l'identification.
     * Constructeur de la classe Droit.
     */
    public function __construct(int $iddroit = 0, string $libdroit = "") {
        $this->iddroit = $iddroit;
        $this->libdroit = $libdroit;
    }

    /** Getter de l'id du Droit */
    public function getIdDroit(): int {return $this->iddroit;}

    /** Getter du libellé du Droit */
    public function getLibDroit(): string {return $this->libdroit;}

    /** Setter de l'id du Droit */
    public function setIdDroit(int $iddroit): void {$this->iddroit = $iddroit;}

    /** Setter du libellé du Droit */
    public function setLibDroit(string $libdroit): void {$this->libdroit = $libdroit;}
}