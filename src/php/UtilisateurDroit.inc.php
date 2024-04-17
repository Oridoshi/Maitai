<?php

class UtilisateurDroit {
    
    /** Numéro d'identification de l'utilisateur */
    private int $iduti;

    /** Numéro d'identification du droit */
    private int $iddroit;

    /**
     * @var int $iduti Numéro d'identification de l'utilisateur
     * @var int $iddroit Numéro d'identification du droit
     * Constructeur de la classe UtilisateurDroit.
     */
    public function __construct(int $iduti = 0, int $iddroit = 0) {
        $this->iduti = $iduti;
        $this->iddroit = $iddroit;
    }

    /** Getter du numéto d'identification de l'utilisateur */
    public function getIdUti(): int {return $this->iduti;}
    
    /** Getter du numéro d'identification du droit */
    public function getIdDroit(): int {return $this->iddroit;}

    /** Setter du numéro d'identification de l'utilisateur */
    public function setIdUti(int $iduti): void {$this->iduti = $iduti;}

    /** Setter du numéro d'identification du droit */
    public function setIdDroit(int $iddroit): void {$this->iddroit = $iddroit;}
}