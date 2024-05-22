<?php

class Historique {

    /** Numéro d'identification du fichier stockés. */
    public int $idhis;

    /** Date a laquelle le fichier a été généré. */
    public string $date;

    /** Chemin pour retrouver le fichier. */
    public string $chemin;

    /** Type de fichier (Ticket ou fiche de secu). */
    public string $type;

    /** Si le ficher a était validé par un admin */
    public bool $valide;

    /** Client attachés au fichiers générés. */
    public int $iduti;

    /**
     * @var int $idhis Numéro d'identification du fichier stockés.
     * @var string $date Date a laquelle le fichier a été généré.
     * @var string $chemin Chemin pour retrouver le fichier.
     * @var string $type Type de fichier (Ticket ou fiche de secu).
     * @var bool $valide Si le ficher a était validé par un admin
     * @var int $iduti Client attachés au fichiers générés.
     * Constructeur de la classe Historique.
     */
    public function __construct(int $idhis = 0, string $date = "", string $chemin = "", string $type = "", bool $valide=false, int $iduti = 0) {
        $this->idhis = $idhis;
        $this->date = $date;
        $this->chemin = $chemin;
        $this->type = $type;
        $this->valide = $valide;
        $this->iduti = $iduti;
    }

    /** Getter de l'id du fichier stockés */
    public function getIdHis(): int {return $this->idhis;}

    /** Getter de la date du fichier stockés */
    public function getDate(): string {return $this->date;}

    /** Getter du chemin du fichier stockés */
    public function getChemin(): string {return $this->chemin;}

    /** Getter du type du fichier stockés */
    public function getType(): string {return $this->type;}

    /** Getter de la validation du fichier stockés */
    public function getValide(): bool {return $this->valide;}

    /** Getter de l'id du client attachés au fichiers générés */
    public function getIdUti(): int {return $this->iduti;}

    /** Setter de l'id du fichier stockés */
    public function setIdHis(int $idhis): void {$this->idhis = $idhis;}

    /** Setter de la date du fichier stockés */
    public function setDate(string $date): void {$this->date = $date;}

    /** Setter du chemin du fichier stockés */
    public function setChemin(string $chemin): void {$this->chemin = $chemin;}

    /** Setter du type du fichier stockés */
    public function setType(string $type): void {$this->type = $type;}

    /** Setter de la validation du fichier stockés */
    public function setValide(bool $valide): void {$this->valide = $valide;}

    /** Setter de l'id du client attachés au fichiers générés */
    public function setIdUTi(int $iduti): void {$this->iduti = $iduti;}
}