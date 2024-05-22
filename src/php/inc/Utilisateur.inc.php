<?php
class Utilisateur {

    /** Numéro d'identification de l'utilisateur. */
    public int $iduti;

    /** Login de l'utilisateur. */
    public string $login;

    /** Mot de passe encrypté de l'utilisateur. */
    public string $mdp;

    /** Email de récupération du compte */
    public string $email;

    /** Si le compte est actif ou non. Peut être activer ou désactiver à volonter */
    public bool $actif;

    /** Numéro de téléphone de l'utilisateur. */
    public ?string $telephone;

    /** Si l'utilisateur est présent ou non. */
    public ?bool $present;

    /** Droit de l'utilisateur. Peut être 'Client', 'Maitai' ou 'Admin'. */
    public string $droit;

    /**
     * @var int $iduti Numéro d'identification de l'utilisateur.
     * @var string $login Login de l'utilisateur.
     * @var string $email Email de récupération du compte
     * @var string $mdp Mot de passe encrypté de l'utilisateur.
     * @var bool $actif Si le compte est actif ou non. Peut être activer ou désactiver à volonter
     * @var ?string $telephone Numéro de téléphone de l'utilisateur.
     * @var ?bool $present Si l'utilisateur est présent ou non.
     * @var string $droit Droit de l'utilisateur. Peut être 'Client', 'Maitai' ou 'Admin'.
     * Constructeur de la classe Utilisateur.
     */
    public function __construct(int $iduti = 0, string $login = "", string $mdp = "", string $email = "", bool $actif = true, ?string $telephone = null, ?bool $present = null, String $droit = "Client") {
        $this->iduti = $iduti;
        $this->login = $login;
        $this->mdp   = $mdp;
        $this->email = $email;
        $this->actif = $actif;
        $this->telephone = $telephone;
        $this->present = $present;
        $this->droit = $droit;
    }

    /** Getter de l'id de l'utilisateur */
    public function getIdUti(): int {return $this->iduti;}

    /** Getter du login de l'utilisateur */
    public function getLogin(): string {return $this->login;}

    /** Getter du mot de passe de l'utilisateur */
    public function getMdp(): string {return $this->mdp;}

    /** Getter de l'email de l'utilisateur */
    public function getEmail(): string {return $this->email;}

    /** Getter de l'activation du compte */
    public function getActif(): bool {return $this->actif;}

    /** Getter du numéro de téléphone de l'utilisateur */
    public function getTelephone(): ?string {return $this->telephone;}

    /** Getter de la présence de l'utilisateur */
    public function getPresent(): ?bool {return $this->present;}

    /** Getter du droit de l'utilisateur */
    public function getDroit(): string {return $this->droit;}


    /** Setter de l'id de l'utilisateur */
    public function setIdUti(int $iduti): void {$this->iduti = $iduti;}

    /** Setter du login de l'utilisateur */
    public function setLogin(string $login): void {$this->login = $login;}

    /** Setter du mot de passe de l'utilisateur */
    public function setMdp(string $mdp): void {$this->mdp = $mdp;}

    /** Setter de l'email de l'utilisateur */
    public function setEmail(string $email): void {$this->email = $email;}

    /** Setter de l'activation du compte */
    public function setActif(bool $actif): void { $this->actif = $actif;}

    /** Setter du numéro de téléphone de l'utilisateur */
    public function setTelephone(?string $telephone): void {$this->telephone = $telephone;}

    /** Setter de la présence de l'utilisateur */
    public function setPresent(?bool $present): void {$this->present = $present;}

    /** Setter du droit de l'utilisateur */
    public function setDroit(string $droit): void {$this->droit = $droit;}
}