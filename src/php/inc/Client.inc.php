<?php

class Client {

    /** Numéro d'identification du client. */
    public int $idcli;
    
    /** Nom du client. */
    public string $nomclub;
    
    /** Email du client (encryptés). */
    public string $email;
    
    /** Telephone du client (encryptés). */
    public string $telephone;
    
    /** Si le client est actuellement present sur le site ou non. */
    public bool $present;

    /**
     * @var int $idcli Numéro d'identification du client.
     * @var string $nomclub Nom du client.
     * @var string $email Email du client.
     * @var string $telephone Telephone du client.
     * @var bool $present Si le client est actuellement present sur le site ou non.
     * Constructeur de la classe Client.
     */
    public function __construct(int $idcli = 0, string $nomclub = "", string $email = "", string $telephone = "", bool $present = true) {
        $this->idcli = $idcli;
        $this->nomclub = $nomclub;
        $this->email = $email;
        $this->telephone = $telephone;
        $this->present = $present;
    }

    /** Getter de l'id du Client */
    public function getIdCli(): int {return $this->idcli;}

    /** Getter du nom du Client */
    public function getNomClub(): string {return $this->nomclub;}

    /** Getter de l'email du Client */
    public function getEmail(): string {return $this->email;}

    /** Getter du telephone du Client */
    public function getTelephone(): string {return $this->telephone;}

    /** Getter de la présence du Client */
    public function getPresent(): bool {return $this->present;}

    /** Setter de l'id du Client */
    public function setIdCli(int $idcli): void {$this->idcli = $idcli;}

    /** Setter du nom du Client */
    public function setNomClub(string $nomclub): void {$this->nomclub = $nomclub;}

    /** Setter de l'email du Client */
    public function setEmail(string $email): void {$this->email = $email;}

    /** Setter du telephone du Client */
    public function setTelephone(string $telephone): void {$this->telephone = $telephone;}

    /** Setter de la présence du Client */
    public function setPresent(bool $present): void { $this->present = $present;}
}