<?php

class Palanquee {
    public int $idPalanquee;
    public string $nomPlongeurs;
    public string $hd;
    public int $duree;
    public int $alerte;

    public function __construct(int $idPalanquee = 0, string $nomPlongeurs = "", string $hd = "", int $duree = 0, int $alerte = 0) {
        $this->idPalanquee = $idPalanquee;
        $this->nomPlongeurs = $nomPlongeurs;
        $this->hd = $hd;
        $this->duree = $duree;
        $this->alerte = $alerte;
    }

    public function getIdPalanquee(): int {return $this->idPalanquee;}

    public function getNomPlongeurs(): string {return $this->nomPlongeurs;}

    public function getHd(): string {return $this->hd;}

    public function getDuree(): int {return $this->duree;}

    public function getAlerte(): int {return $this->alerte;}

    public function setIdPalanquee(int $idPalanquee): void {$this->idPalanquee = $idPalanquee;}

    public function setNomPlongeurs(string $nomPlongeurs): void {$this->nomPlongeurs = $nomPlongeurs;}

    public function setHd(string $hd): void {$this->hd = $hd;}

    public function setDuree(int $duree): void {$this->duree = $duree;}

    public function setAlerte(int $alerte): void {$this->alerte = $alerte;}
}