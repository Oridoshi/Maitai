<?php

class Client {

    /** Numéro d'identification du client. */
    private int $idCli;
    
    /** Nom du client. */
    private string $nomClub;
    
    /** Email du client (encryptés). */
    private string $email;
    
    /** Telephone du client (encryptés). */
    private string $telephone;
    
    /** Si le client est actuellement present sur le site ou non. */
    private bool $present;

    /**
     * @var int $idCli Numéro d'identification du client.
     * @var string $nomClub Nom du client.
     * @var string $email Email du client.
     * @var string $telephone Telephone du client.
     * @var bool $present Si le client est actuellement present sur le site ou non.
     * Constructeur de la classe Client.
     */
    public function __construct(int $idCli = 0, string $nomClub = "", string $email = "", string $telephone = "", bool $present = true) {
        $this->idCli = $idCli;
        $this->nomClub = $nomClub;
        $this->email = $email;
        $this->telephone = $telephone;
        $this->present = $present;
    }

    /** Getter de l'id du Client */
    public function getIdCli(): int {return $this->idCli;}

    /** Getter du nom du Client */
    public function getNomClub(): string {return $this->nomClub;}

    /** Getter de l'email du Client */
    public function getEmail(): string {return $this->email;}

    /** Getter du telephone du Client */
    public function getTelephone(): string {return $this->telephone;}

    /** Getter de la présence du Client */
    public function getPresent(): bool {return $this->present;}

    /** Setter de l'id du Client */
    public function setIdCli(int $idCli): void {$this->idCli = $idCli;}

    /** Setter du nom du Client */
    public function setNomClub(string $nomClub): void {$this->nomClub = $nomClub;}

    /** Setter de l'email du Client */
    public function setEmail(string $email): void {$this->email = $email;}

    /** Setter du telephone du Client */
    public function setTelephone(string $telephone): void {$this->telephone = $telephone;}

    /** Setter de la présence du Client */
    public function setPresent(bool $present): void { $this->present = $present;}
}