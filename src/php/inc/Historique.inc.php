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

    /** Client attachés au fichiers générés. */
    public int $idcli;

    /**
     * @var int $idhis Numéro d'identification du fichier stockés.
     * @var string $date Date a laquelle le fichier a été généré.
     * @var string $chemin Chemin pour retrouver le fichier.
     * @var string $type Type de fichier (Ticket ou fiche de secu).
     * @var int $idcli Client attachés au fichiers générés.
     * Constructeur de la classe Historique.
     */
    public function __construct(int $idhis = 0, string $date = "", string $chemin = "", string $type = "", int $idcli = 0) {
        $this->idhis = $idhis;
        $this->date = $date;
        $this->chemin = $chemin;
        $this->type = $type;
        $this->idcli = $idcli;
    }

    /** Getter de l'id du fichier stockés */
    public function getIdHis(): int {return $this->idhis;}

    /** Getter de la date du fichier stockés */
    public function getDate(): string {return $this->date;}

    /** Getter du chemin du fichier stockés */
    public function getChemin(): string {return $this->chemin;}

    /** Getter du type du fichier stockés */
    public function getType(): string {return $this->type;}

    /** Getter de l'id du client attachés au fichiers générés */
    public function getIdCli(): int {return $this->idcli;}

    /** Setter de l'id du fichier stockés */
    public function setIdHis(int $idhis): void {$this->idhis = $idhis;}

    /** Setter de la date du fichier stockés */
    public function setDate(string $date): void {$this->date = $date;}

    /** Setter du chemin du fichier stockés */
    public function setChemin(string $chemin): void {$this->chemin = $chemin;}

    /** Setter du type du fichier stockés */
    public function setType(string $type): void {$this->type = $type;}

    /** Setter de l'id du client attachés au fichiers générés */
    public function setIdCli(int $idcli): void {$this->idcli = $idcli;}
}