<?php

class UtilisateurDroit {
    
    /** Numéro d'identification de l'utilisateur */
    private int $idUti;

    /** Numéro d'identification du droit */
    private int $idDroit;

    /**
     * @var int $idUti Numéro d'identification de l'utilisateur
     * @var int $idDroit Numéro d'identification du droit
     * Constructeur de la classe UtilisateurDroit.
     */
    public function __construct(int $idUti = 0, int $idDroit = 0) {
        $this->iduti = $idUti;
        $this->idDroit = $idDroit;
    }

    /** Getter du numéto d'identification de l'utilisateur */
    public function getIdUti(): int {return $this->idUti;}
    
    /** Getter du numéro d'identification du droit */
    public function getIdDroit(): int {return $this->idDroit;}

    /** Setter du numéro d'identification de l'utilisateur */
    public function setIdUti(int $idUti): void {$this->idUti = $idUti;}

    /** Setter du numéro d'identification du droit */
    public function setIdDroit(int $idDroit): void {$this->idDroit = $idDroit;}
}

$utilisateurDroit = new UtilisateurDroit();
$utilisateurDroit->setIdUti(1);
$utilisateurDroit->setIdDroit(1);
echo "L'utilisateur d'ID " . $utilisateurDroit->getIdUti() . " a le droit d'ID " . $utilisateurDroit->getIdDroit() . ".";
