<?php

class Utilisateur {

    /** Numéro d'identification de l'utilisateur. */
    private int $idUti;

    /** Login de l'utilisateur. */
    private string $login;

    /** Mot de passe encrypté de l'utilisateur. */
    private string $mdp;

    /** Email de récupération du compte */
    private string $email;

    /** Si le compte est actif ou non. Peut être activer ou désactiver à volonter */
    private bool $actif;

    /**
     * @var int $idUti Numéro d'identification de l'utilisateur.
     * @var string $login Login de l'utilisateur.
     * @var string $mdp Mot de passe encrypté de l'utilisateur.
     * @var string $email Email de récupération du compte
     * @var bool $actif Si le compte est actif ou non. Peut être activer ou désactiver à volonter
     * Constructeur de la classe Utilisateur.
     */
    public function __construct(int $idUti = 0, string $login = "", string $mdp = "", string $email = "", bool $actif = true) {
        $this->idUti = $idUti;
        $this->login = $login;
        $this->mdp = $mdp;
        $this->email = $email;
        $this->actif = $actif;
    }

    /** Getter de l'id de l'utilisateur */
    public function getIdUti(): int {return $this->idUti;}

    /** Getter du login de l'utilisateur */
    public function getLogin(): string {return $this->login;}
    
    /** Getter du mot de passe de l'utilisateur */
    public function getMdp(): string {return $this->mdp;}

    /** Getter de l'email de l'utilisateur */
    public function getEmail(): string {return $this->email;}

    /** Getter de l'activation du compte */
    public function getActif(): bool {return $this->actif;}

    /** Setter de l'id de l'utilisateur */
    public function setIdUti(int $idUti): void {$this->idUti = $idUti;}

    /** Setter du login de l'utilisateur */
    public function setLogin(string $login): void {$this->login = $login;}

    /** Setter du mot de passe de l'utilisateur */
    public function setMdp(string $mdp): void {$this->mdp = $mdp;}

    /** Setter de l'email de l'utilisateur */
    public function setEmail(string $email): void {$this->email = $email;}

    /** Setter de l'activation du compte */
    public function setActif(bool $actif): void { $this->actif = $actif;}
}