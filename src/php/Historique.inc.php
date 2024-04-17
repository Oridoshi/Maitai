<?php

class Historique {

    /** Numéro d'identification du fichier stockés. */
    private int $idHis;

    /** Date a laquelle le fichier a été généré. */
    private string $date;

    /** Chemin pour retrouver le fichier. */
    private string $chemin;

    /** Type de fichier (Ticket ou fiche de secu). */
    private string $type;

    /** Client attachés au fichiers générés. */
    private int $idCli;

    /**
     * @var int $idHis Numéro d'identification du fichier stockés.
     * @var string $date Date a laquelle le fichier a été généré.
     * @var string $chemin Chemin pour retrouver le fichier.
     * @var string $type Type de fichier (Ticket ou fiche de secu).
     * @var int $idCli Client attachés au fichiers générés.
     * Constructeur de la classe Historique.
     */
    public function __construct(int $idHis = 0, string $date = "", string $chemin = "", string $type = "", int $idCli = 0) {
        $this->idHis = $idHis;
        $this->date = $date;
        $this->chemin = $chemin;
        $this->type = $type;
        $this->idCli = $idCli;
    }

    /** Getter de l'id du fichier stockés */
    public function getIdHis(): int {return $this->idHis;}

    /** Getter de la date du fichier stockés */
    public function getDate(): string {return $this->date;}

    /** Getter du chemin du fichier stockés */
    public function getChemin(): string {return $this->chemin;}

    /** Getter du type du fichier stockés */
    public function getType(): string {return $this->type;}

    /** Getter de l'id du client attachés au fichiers générés */
    public function getIdCli(): int {return $this->idCli;}

    /** Setter de l'id du fichier stockés */
    public function setIdHis(int $idHis): void {$this->idHis = $idHis;}

    /** Setter de la date du fichier stockés */
    public function setDate(string $date): void {$this->date = $date;}

    /** Setter du chemin du fichier stockés */
    public function setChemin(string $chemin): void {$this->chemin = $chemin;}

    /** Setter du type du fichier stockés */
    public function setType(string $type): void {$this->type = $type;}

    /** Setter de l'id du client attachés au fichiers générés */
    public function setIdCli(int $idCli): void {$this->idCli = $idCli;}
}