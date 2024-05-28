<?php
//Mettre les objet a require ici /!\
include_once 'Utilisateur.inc.php';
include_once 'Produit.inc.php';
include_once 'Ticket.inc.php';
include_once 'Historique.inc.php';
include_once 'Demande.inc.php';

class DB {

	private static $instance = null; //mémorisation de l'instance de DB pour appliquer le pattern Singleton
	private $connect=null; //connexion PDO à la base

	// private static string $dbName   = "maitai";
	// private static string $login    = "Admin";
	// private static string $password = "maitai";
	// private static string $host     = "localhost";


	private static string $dbName   = "if0_36460769_maitai";
	private static string $login    = "if0_36460769";
	private static string $password = "Sc4ZKSO8sanWyvz";
	private static string $host     = "sql211.infinityfree.com";


	private static string $port     = "3306";



	/************************************************************************/
	//	Constructeur gerant  la connexion à la base via PDO
	//	NB : il est non utilisable a l'exterieur de la classe DB
	/************************************************************************/	
	private function __construct() {

		// Connexion à la base de données
		try {
			// Connexion à la base

			$this->connect = new PDO("mysql:host=" . self::$host . ";port=" . self::$port . ";dbname=" . self::$dbName, self::$login, self::$password);

			// Configuration facultative de la connexion
			$this->connect->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER); 
			$this->connect->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION); 
		}
		catch (PDOException $e) {
					echo "probleme de connexion :".$e->getMessage();
			return null;
		}
	}

	/************************************************************************/
	//	Methode permettant d'obtenir un objet instance de DB
	//	NB : cet objet est unique pour l'exécution d'un même script PHP
	//	NB2: c'est une methode de classe.
	/************************************************************************/
	public static function getInstance() {
			if (is_null(self::$instance)) {
			try { 
			self::$instance = new DB(); 
		} 
		catch (PDOException $e) {
			echo $e;
		}
			} //fin IF
		$obj = self::$instance;

		if (($obj->connect) == null) {
		self::$instance=null;
		}
		return self::$instance;
	} //fin getInstance	 

	/************************************************************************/
	//	Methode permettant de fermer la connexion a la base de données
	/************************************************************************/
	public function close() {
			$this->connect = null;
	}

	/************************************************************************/
	//	Methode uniquement utilisable dans les méthodes de la class DB 
	//	permettant d'exécuter n'importe quelle requête SQL
	//	et renvoyant en résultat les tuples renvoyés par la requête
	//	sous forme d'un tableau d'objets
	//	param1 : texte de la requête à exécuter (éventuellement paramétrée)
	//	param2 : tableau des valeurs permettant d'instancier les paramètres de la requête
	//	NB : si la requête n'est pas paramétrée alors ce paramètre doit valoir null.
	//	param3 : nom de la classe devant être utilisée pour créer les objets qui vont
	//	représenter les différents tuples.
	//	NB : cette classe doit avoir des attributs qui portent le même que les attributs
	//	de la requête exécutée.
	//	ATTENTION : il doit y avoir autant de ? dans le texte de la requête
	//	que d'éléments dans le tableau passé en second paramètre.
	//	NB : si la requête ne renvoie aucun tuple alors la fonction renvoie un tableau vide
	/************************************************************************/
	private function execQuery($requete,$tparam,$nomClasse) {
			//on prépare la requête
		$stmt = $this->connect->prepare($requete);
		//on indique que l'on va récupére les tuples sous forme d'objets instance de Client
		$stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, $nomClasse); 
		//on exécute la requête
		if ($tparam != null) {
			$stmt->execute($tparam);
		}
		else {
			$stmt->execute();
		}
		//récupération du résultat de la requête sous forme d'un tableau d'objets
		$tab = array();
		$tuple = $stmt->fetch(); //on récupère le premier tuple sous forme d'objet
		if ($tuple) {
			//au moins un tuple a été renvoyé
				while ($tuple != false) {
			$tab[]=$tuple; //on ajoute l'objet en fin de tableau
					$tuple = $stmt->fetch(); //on récupère un tuple sous la forme
						//d'un objet instance de la classe $nomClasse	       
			} //fin du while	           	     
			}
		return $tab;    
	}

	/************************************************************************/
	//	Methode utilisable uniquement dans les méthodes de la classe DB
	//	permettant d'exécuter n'importe quel ordre SQL (update, delete ou insert)
	//	autre qu'une requête.
	//	Résultat : nombre de tuples affectés par l'exécution de l'ordre SQL
	//	param1 : texte de l'ordre SQL à exécuter (éventuellement paramétré)
	//	param2 : tableau des valeurs permettant d'instancier les paramètres de l'ordre SQL
	//	ATTENTION : il doit y avoir autant de ? dans le texte de la requête
	//	que d'éléments dans le tableau passé en second paramètre.
	/************************************************************************/
	private function execMaj($ordreSQL,$tparam) {
		$stmt = $this->connect->prepare($ordreSQL);
		$res = $stmt->execute($tparam); //execution de l'ordre SQL      	     
		return $stmt->rowCount();
	}




	/*************************************************************************
	* Fonctions qui peuvent être utilisées dans les scripts PHP
	*************************************************************************/

	/**
	 * Récupère le nombre d'administrateurs actifs.
	 * @return int le nombre d'administrateurs actifs
	 */
	public function getNbAdminActif() {
		$requete = 'SELECT COUNT(*) FROM Utilisateur WHERE Utilisateur.droit = "Admin" AND Utilisateur.actif = 1';
		$stmt = $this->connect->prepare($requete);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		$tuple = $stmt->fetch();
		// echo "KEY : " . array_keys($tuple)[0];
		return $tuple['count(*)'];
	}

	
	/****************/
	//  Utilisateur //
	/****************/
	
	/**
	 * Permet de savoir si un email existe déjà dans la base de données.
	 * @param string $mail email à vérifier
	 * @return ?array null si l'email n'existe pas, un tableau sinon
	 */
	public function getUtilisateurByMail($mail) {
		$requete = 'SELECT * FROM Utilisateur WHERE email = ?';
		return $this->execQuery($requete,array($mail),'Utilisateur');
	}

	/** 
	 * Obtenir un utilisateur à partir de son login
	 * @param string $login login de l'utilisateur à récupérer
	 * @return Utilisateur l'utilisateur récupéré ou null
	 */
	public function getUtilisateurByLogin($login) {
		$requete = 'SELECT * FROM Utilisateur WHERE lower(login) = ?';
		return $this->execQuery($requete,array(strtolower($login)),'Utilisateur') == null ? null:$this->execQuery($requete,array(strtolower($login)),'Utilisateur')[0];
	}

	/** 
	 * Obtenir tout les utilisateurs
	 * @return array tableau d'objets de la classe Utilisateur
	 */
	public function getUtilisateurs() {
		$requete = 'SELECT * FROM Utilisateur WHERE droit != "Client"';
		return $this->execQuery($requete, null,'Utilisateur');
	}

	/** 
	 * Modifier les données d'un utilisateur.
	 * @param Utilisateur $utilisateur l'utilisateur à modifier
	 * @return void
	 */
	public function updateUtilisateur($utilisateur) {
		$requete = 'UPDATE Utilisateur SET login = ?, mdp = ?, email = ?, actif = ? WHERE iduti = ?';
		$this->execMaj($requete,array($utilisateur->getLogin(),$utilisateur->getMdp(),$utilisateur->getEmail(),$utilisateur->getActif(),$utilisateur->getIdUti()));
	}

	/**
	 * Mettre à jour le champ droit d'un utilisateur.
	 * @param int $iduti id de l'utilisateur à mettre à jour
	 * @param string $droit nouveau droit de l'utilisateur
	 * @return void
	 */
	public function majDroitUti($iduti, $droit) {
		$requete = 'UPDATE Utilisateur SET droit = ? WHERE iduti = ?';
		$this->execMaj($requete, array($droit, $iduti));
	}

	/** 
	 * Supprimer un utilisateur.
	 * @param int $iduti id de l'utilisateur à supprimer
	 * @return void
	 */
	public function suppUtilisateur($iduti) {
		$requete = 'DELETE FROM Utilisateur WHERE iduti = ?';
		$this->execQuery($requete,array($iduti),'Utilisateur');
	}
	
	/** 
	 * Ajouter un utilisateur.
	 * @param Utilisateur $utilisateur l'utilisateur à ajouter
	 * @return void
	 */
	public function insertUtilisateur($utilisateur) {
		$requete = 'INSERT INTO Utilisateur (login, mdp, email, actif, droit) VALUES (?, ?, ?, ?, ?)';
		$this->execQuery($requete, array($utilisateur->getLogin(), $utilisateur->getMdp(), $utilisateur->getEmail(), $utilisateur->getActif(), $utilisateur->getDroit()), 'Utilisateur');
	}

	/**
	 * Mettre à jour le mot de passe d'un utilisateur.
	 * @param string $login login de l'utilisateur
	 * @param string $mdp nouveau mot de passe
	 * @return void
	 */
	public function majMdpUti($login, $mdp) {
		$requete = 'UPDATE Utilisateur SET mdp = ? WHERE login = ?';
		$this->execMaj($requete, array($mdp, $login));
	}


	/****************/
	//    Client    //
	/****************/

	/** 
	 * Récuperer les clients.
	 * @return array tableau d'objets de la classe Client
	 */
	public function getClients() {
		$requete = 'SELECT * FROM Utilisateur WHERE droit = "Client"';
		return $this->execQuery($requete,null,'Utilisateur');
	}

	/** 
	 * Récuperer les clients présents.
	 * @return array tableau d'objets de la classe Client
	 */
	public function getClientsPresent() {
		$requete = 'SELECT * FROM Utilisateur WHERE present = 1 AND droit = "Client"';
		return $this->execQuery($requete,null,'Client');
	}

	/**
	 * Récuperer le client à l'aide du nom du club.
	 * @param string $nomClub nom du club du client à récupérer
	 * @return Utilisateur le client récupéré
	 */
	public function getClient($nomClub) {
		$requete = 'SELECT * FROM Utilisateur WHERE login = ?';
		return $this->execQuery($requete,array($nomClub),'Utilisateur')[0];
	}

	/**
	 * Récupérer un client à partir de son id.
	 * @param int $idUti id du client à récupérer
	 * @return Utilisateur le client récupéré
	 */
	public function getClientById($idUti) {
		$requete = 'SELECT * FROM Utilisateur WHERE iduti = ?';
		return $this->execQuery($requete,array($idUti),'Utilisateur')[0];
	}

	/**
	 * Met à jour le champ actif d'un client.
	 * @param int $idUti id du client à mettre à jour
	 * @param bool $actif valeur du champ actif
	 * @return void
	 */
	public function majActifCli($idUti, $actif) {
		$requete = 'UPDATE Utilisateur SET present = ? WHERE iduti = ?';
		$this->execMaj($requete, array($actif, $idUti));
	}

	/**
	 * Modifier les données d'un client.
	 * @param Utilisateur $client le client à modifier
	 * @return void
	 */
	public function updateClient($client) {
		$requete = 'UPDATE Utilisateur SET login = ?, email = ?, telephone = ?, present = ? WHERE iduti = ?';
		$this->execQuery($requete,array($client->getLogin(),$client->getEmail(),$client->getTelephone(),$client->getPresent(),$client->getidUti()),'Utilisateur');
	}

	/** 
	 * Ajouter un client.
	 * @param Utilisateur $client le client à ajouter
	 * @return void
	 */
	public function insertClient($client) {
		$requete = 'INSERT INTO Utilisateur (login, mdp, email, actif, droit, telephone, present) VALUES (?, ?, ?, ?, ?, ?, ?)';
		$this->execMaj($requete,array($client->getLogin(), $client->getMdp(),$client->getEmail(),$client->getActif(), $client->getDroit(),$client->getTelephone(),$client->getPresent()));
	}

	/****************/
	//   Produits   //
	/****************/

	/** Récuperer les produits, trier par categorie.
	 * @return array tableau d'objets de la classe Produit
	 */
	public function getProduits() {
		$requete = 'SELECT * FROM Produit ORDER BY categorie';
		return $this->execQuery($requete,null,'Produit');
	}

	/**
	 * Récupérer le produit à partir de l'id du produit.
	 * @param int $idProd id du produit à récupérer
	 * @return Produit le produit récupéré
	 */
	public function getProduit($idProd) {
		$requete = 'SELECT * FROM Produit WHERE idProd = ?';
		return $this->execQuery($requete,array($idProd),'Produit')[0];
	}

	/** Récuperer les produits en fonction de la catégorie.
	 * @param string $categ la catégorie des produits à récupérer
	 * @return array tableau d'objets de la classe Produit
	 */
	public function getProduitsParCateg($categ) {
		$requete = 'SELECT * FROM Produit WHERE categorie = ?';
		return $this->execQuery($requete,array($categ),'Produit');
	}

	/** Récuperer les produits disponibles le matin en fonction de la catégorie.
	 * @param string $categ la catégorie des produits à récupérer
	 * @return array tableau d'objets de la classe Produit
	 */
	public function getProduitsParCategDispoMatin($categ) {
		$requete = 'SELECT * FROM Produit WHERE categorie = ? AND dispoMatin = 1';
		return $this->execQuery($requete,array($categ),'Produit');
	}

	/** Récuperer les produits disponibles le soir en fonction de la catégorie.
	 * @param string $categ la catégorie des produits à récupérer
	 * @return array tableau d'objets de la classe Produit
	 */
	public function getProduitsParCategDispoSoir($categ) {
		$requete = 'SELECT * FROM Produit WHERE categorie = ? AND dispoSoir = 1';
		return $this->execQuery($requete,array($categ),'Produit');
	}

	/** Récuperer un produit en fonction de son id.
	 * @param int $idProd l'id du produit à récupérer
	 * @return Produit le produit récupéré
	 */
	public function getProduitById($idProd) {
		$requete = 'SELECT * FROM Produit WHERE idProd = ?';
		return $this->execQuery($requete,array($idProd),'Produit')[0];
	}

	/** Récuperer un produit en fonction de sa référence.
	 * @param string $ref la référence du produit à récupérer
	 * @return Produit le produit récupéré
	 */
	public function getProduitByLib($lib) {
		$requete = 'SELECT * FROM Produit WHERE libProd = ?';
		return $this->execQuery($requete,array($lib),'Produit')[0];
	}

	/** Récuperer toute les catégories de produits. 
	 * @return array tableau d'objets de la classe Produit
	 */
	public function getCategorie() {
		$requete = 'SELECT DISTINCT categorie FROM Produit';
		return $this->execQuery($requete,null,'Produit');
	}

	/** Récuperer toute les catégories de produits disponibles le matin et le soir.
	 * @return array tableau d'objets de la classe Produit
	 */
	public function getCategorieDispo($pourMatin) {
		if($pourMatin)
			$requete = 'SELECT DISTINCT categorie FROM Produit WHERE dispoMatin = 1';
		else
			$requete = 'SELECT DISTINCT categorie FROM Produit WHERE dispoSoir = 1';
		return $this->execQuery($requete,null,'Produit');
	}

	/** Modifier les données d'un produit.
	 * @param Produit $produits le produit à modifier.
	 */
	public function updateProduit($produits) {
		$requete = 'UPDATE Produit SET ref = ?, libProd = ?, prixUni = ?, prixUniHT = ?, categorie = ?, dispoMatin = ?, dispoSoir = ? WHERE idProd = ?';
		$this->execMaj($requete,array($produits-> getRef(), $produits->getLibProd(),$produits->getPrixUni(),$produits->getPrixUniHT(),$produits->getCategorie(),$produits->getDispoMatin(),$produits->getDispoSoir(),$produits->getIdProd()));
	}

	/**
	 * Créer un produit.
	 * @param Produit $produits le produit à créer.
	 */
	public function insertProduit($produits) {
		$requete = 'INSERT INTO Produit (ref,libProd,prixUni,prixUniHT,categorie,dispoMatin,dispoSoir) VALUES (?,?,?,?,?,?,?)';
		$this->execMaj($requete,array($produits->getRef(),$produits->getLibProd(),$produits->getPrixUni(),$produits->getPrixUniHT(),$produits->getCategorie(),$produits->getDispoMatin(),$produits->getDispoSoir()));
	}

	/** Supprimer un produit.
	 * @param Produit $produits le produit à supprimer
	 */
	public function suppProduit($produits) {
		$requete = 'DELETE FROM Produit WHERE idProd = ?';
		$this->execMaj($requete,array($produits->getIdProd()));
	}

	/****************/
	//    Ticket    //
	/****************/

	/**
	 * Insère un ticket dans la base de données.
	 * @param Ticket $ticket Ticket à insérer dans la base de données.
	 * @return void
	 */
	public function insertTicket(Ticket $ticket) {
		$requete = "INSERT INTO Ticket (idprod, iduti, qa, prixspe, prixtot) VALUES (?, ?, ?, ?, ?)";
		$tparam = array($ticket->getIdProd(), $ticket->getIdUti(), $ticket->getQa(), $ticket->getPrixSpe(), $ticket->getPrixTot());
		$requete = "INSERT INTO Ticket (idprod, iduti, qa, prixspe, prixtot) VALUES (?, ?, ?, ?, ?)";
		$tparam = array($ticket->getIdProd(), $ticket->getIdUti(), $ticket->getQa(), $ticket->getPrixSpe(), $ticket->getPrixTot());
		$this->execMaj($requete, $tparam);
	}

	/**
	 * Permet de mettre à jour un ticket
	 * @param Ticket $ticket le ticket à mettre à jour
	 * @return void
	 */
	public function updateTicket(Ticket $ticket) {
		$requete = "UPDATE Ticket SET qa=?, prixtot=? WHERE idprod=? AND iduti=?";
		$requete = "UPDATE Ticket SET qa=?, prixtot=? WHERE idprod=? AND iduti=?";
		$tparam = array($ticket->getQa(), $ticket->getPrixTot(), $ticket->getIdProd(), $ticket->getIdUti());
		$this->execMaj($requete, $tparam);
	}

	/**
	 * Permet de récupérer les produits du ticket
	 * @param int $idUti id du client
	 * @param int $idprod id du produit
	 * @return void
	 */
	public function suppTicket(int $idprod, int $idUti) {
		$requete = "DELETE FROM Ticket WHERE idprod = ? AND iduti = ?";
		$requete = "DELETE FROM Ticket WHERE idprod = ? AND iduti = ?";
		$tparam = array($idprod, $idUti);
		$this->execMaj($requete, $tparam);
	}

	/**
	 * Permet de supprimer tout les produit d'un ticket en fonction de l'id du client
	 * @param int $idUti id du client
	 * @return void
	 */
	public function suppTicketCli(int $idUti) {
		$requete = "DELETE FROM Ticket WHERE iduti = ?";
		$tparam = array($idUti);
		$this->execMaj($requete, $tparam);
	}

	/**
	 * Récupère les produits du ticket en fonction de l'id du client
	 * @param int $idUti id du client ou null pour tous les clients
	 * @return array de produit de Ticket
	 */
	public function getProdTicket(?int $idUti) {
		if ($idUti == null) {
			$requete = "SELECT * FROM Ticket";
			$requete = "SELECT * FROM Ticket";
			$tparam = null;
		}
		else {
			$requete = "SELECT * FROM Ticket WHERE iduti = ?";
			$requete = "SELECT * FROM Ticket WHERE iduti = ?";
			$tparam = array($idUti);
		}

		return $this->execQuery($requete, $tparam, 'Ticket');
	}

	/**
	 * Récupère le nombre de produit du ticket en fonction de l'id du client
	 * @param int $idUti id du client
	 * @return int le nombre de produit du ticket
	 */
	public function getNbProdTicketCli(int $idUti) {
		$requete = "SELECT COUNT(*) FROM Ticket WHERE iduti = ?";
		$tparam = array($idUti);
		$stmt = $this->connect->prepare($requete);
		$stmt->execute($tparam);
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		$tuple = $stmt->fetch();
		return $tuple['count(*)'];
	}
	
	/****************/
	//  Historique  //
	/****************/

	public function getHistoriques() {
		$requete = 'SELECT * FROM Historique';
		return $this->execQuery($requete, null, 'Historique');
	}

	/**
	 * Obtenir l'historique via sont ID
	 * @param int $idhis id de l'historique
	 * @return Historique l'historique
	 */
	public function getHistoriqueById(int $idhis) {
		$requete = 'SELECT * FROM Historique WHERE idhis = ?';
		return $this->execQuery($requete, array($idhis), 'Historique')[0];
	}

	/**
	 * Obtenir l'ID du prochain historique
	 * @return int l'ID du prochain historique
	 */
	public function getNextIdHistorique() {
		$requete = 'SHOW TABLE STATUS LIKE \'Historique\';';
		$stmt = $this->connect->prepare($requete);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		$tuple = $stmt->fetch();
		return $tuple['auto_increment'];
	}

	/** 
	 * Insértion d'un historique
	 * @param Historique $historique l'historique à insérer
	 * @return bool true si l'insertion a réussi, false sinon
	 */
	public function insertHistorique(Historique $historique) {
		$requete = "INSERT INTO Historique (date, chemin, type, iduti) VALUES (NOW(), :chemin, :type, :idUti)";
		$tparam = array(':chemin' => $historique->getChemin(), ':type' => $historique->getType(), ':idUti' => $historique->getIdUti());
		return $this->execMaj($requete, $tparam);
		return $this->execMaj($requete, $tparam);
	}

	/**
	 * Suppression d'un historique
	 * @param int $idhis id de l'historique à supprimer
	 * @return void
	 */
	public function suppHistorique(int $idhis) {
		$requete = "DELETE FROM Historique WHERE idhis = :idhis";
		$tparam = array(':idhis' => $idhis);
		$this->execMaj($requete, $tparam);
	}

	/** 
	 * Get historique en fonction du chemin
	 * @param string $chemin chemin de l'historique
	 * @return Historique l'historique
	 */
	public function getHistoriqueByChemin(string $chemin) {
		$requete = "SELECT * FROM Historique WHERE chemin = :chemin";
		$tparam = array(':chemin' => $chemin);
		return $this->execQuery($requete, $tparam, 'Historique')[0];
	}

	/** 
	 * Get tout l'historique d'un client
	 * @param int $idUti id du client
	 * @return array tableau d'objets de la classe Historique
	 */
	public function getHistoriquesByClient(int $idUti): array {
		$requete = "SELECT chemin, idhis, type, date FROM Historique WHERE iduti = ?";
		$tparam = array($idUti);
		$stmt = $this->connect->prepare($requete);
		$stmt->execute($tparam);
		$stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'Historique');
		$tab = array();
		$tuple = $stmt->fetch();
		if ($tuple) {
			while ($tuple != false) {
				$tab[]=$tuple;
				$tuple = $stmt->fetch();
			}
		}
		return $tab;
	}

	/**
	 * Mettre tout les client présent à non présent s'il n'ont pas de ticket en cours
	 * @return void
	 */
	public function setClientNonPresent() {
		$requete = "UPDATE Utilisateur SET present = 0 WHERE iduti NOT IN (SELECT iduti FROM Ticket WHERE iduti = Utilisateur.iduti) AND droit = 'Client'";
		$this->execMaj($requete, null);
	}

	/** 
	 * Get tout l'historique SECU d'un client.
	 * @param int $idUti id du client
	 * @return array tableau d'objets de la classe Historique
	 */
	public function getHistoriquesByClientSecu(int $idUti): array {
		$requete = "SELECT chemin, idhis, type, date, valide FROM Historique WHERE iduti = ? AND type = 'SECU'";
		$tparam = array($idUti);
		$stmt = $this->connect->prepare($requete);
		$stmt->execute($tparam);
		$stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'Historique');
		$tab = array();
		$tuple = $stmt->fetch();
		if ($tuple) {
			while ($tuple != false) {
				$tab[]=$tuple;
				$tuple = $stmt->fetch();
			}
		}
		return $tab;
	}

	/** 
	 * Get tout l'historique TICKET d'un client
	 * @param int $idUti id du client
	 * @return array tableau d'objets de la classe Historique
	 */
	public function getHistoriquesByClientTicket(int $idUti): array {
		$requete = "SELECT chemin, idhis, type, date FROM Historique WHERE iduti = ? AND type = 'TICKET'";
		$tparam = array($idUti);
		$stmt = $this->connect->prepare($requete);
		$stmt->execute($tparam);
		$stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'Historique');
		$tab = array();
		$tuple = $stmt->fetch();
		if ($tuple) {
			while ($tuple != false) {
				$tab[]=$tuple;
				$tuple = $stmt->fetch();
			}
		}
		return $tab;
	}

	/** 
	 * Get un historique via son id
	 * @param int $idhist id de l'historique
	 * @return string le chemin de l'historique
	 */
	public function getHistoriquesById(int $idhist): string {
		$requete = "SELECT chemin FROM Historique WHERE idhis = ?";
		$tparam = array($idhist);
		$stmt = $this->connect->prepare($requete);
		$stmt->execute($tparam);
		$tuple = $stmt->fetch();
		return $tuple['chemin'];
	}

	/**
	 * Supprime un Historique
	 * @param int $idhist id de l'historique
	 * @return void
	 */
	public function suppHistoriqueById(int $idhist) {
		$requete = "DELETE FROM Historique WHERE idhis = ?";
		$tparam = array($idhist);
		$this->execMaj($requete, $tparam);
	}

	/**
	 * Mise à jour d'un historique
	 * @param int $idhist id de l'historique
	 * @return void
	 */
	public function updateHistorique(int $idhist) {
		$requete = "UPDATE Historique SET valide = 1 WHERE idhis = ?";
		$tparam = array($idhist);
		$this->execMaj($requete, $tparam);
	}

	/**
	 * Met à jour le chemin d'un historique.
	 * @param Historique $historique l'historique à mettre à jour
	 * @return void
	 */
	public function updateFichierHistorique(Historique $historique) {
		$requete = "UPDATE Historique SET chemin = ? WHERE idhis = ?";
		$tparam = array($historique->getChemin(), $historique->getIdHis());
		$this->execMaj($requete, $tparam);
	}

	/**
	 * Récupère tout les historiques non validé
	 * @return array tableau d'objets de la classe Historique
	 */
	public function getHistoriquesSecuNonValide() {
		$requete = "SELECT * FROM Historique WHERE type = 'SECU' AND valide = 0";
		return $this->execQuery($requete, null, 'Historique');
	}

	/* Méthodes pour les demandes */

	/**
	 * Insère une demande dans la base de données.
	 * @param int $idProd id du produit
	 * @param int $idUti id de l'utilisateur
	 * @param int $qa quantité achetée
	 * @param string $date date de la demande
	 * @param bool $pourMatin matin ou après-midi
	 */
	public function insertDemande($idProd, $idUti, $qa, $date, $pourMatin) {
		$requete = "INSERT INTO Demande (idProd, idUti, qa, date, pourMatin, valider) VALUES (?, ?, ?, ?, ?, ?)";
		$tparam = array($idProd, $idUti, $qa, $date, $pourMatin, false);
		$this->execMaj($requete, $tparam);
	}

	/**
	 * Met à jour une demande dans la base de données.
	 * @param int $idProd id du produit
	 * @param int $idUti id de l'utilisateur
	 * @param int $qa quantité achetée
	 * @param string $date date de la demande
	 * @param bool $pourMatin matin ou après-midi
	 */
	public function updateDemande($idProd, $idUti, $qa, $date, $pourMatin) {
		$requete = "UPDATE Demande SET qa = ?, valider = false WHERE idProd = ? AND idUti = ? AND date = ? AND pourMatin = ?";
		$tparam = array($qa, $idProd, $idUti, $date, $pourMatin);
		$this->execMaj($requete, $tparam);
	}

	public function updateValide($idProd, $date, $pourMatin, $valide) {
		$requete = "UPDATE Demande SET valider = ? WHERE idProd = ? AND date = ? AND pourMatin = ?";
		$tparam = array($valide, $idProd, $date, $pourMatin);
		$this->execMaj($requete, $tparam);
	}

	/**
	 * Récupère une demande dans la base de données.
	 * @param string $date date de la demande
	 * @param bool $pourMatin matin ou après-midi
	 */
	public function getDemandes($date, $pourMatin) {
		$requete = "SELECT u.login, SUM(qa) as \"qa\", MIN(valider) FROM Demande d JOIN Utilisateur u ON d.idUti = u.idUti WHERE date = ? AND pourMatin = ? GROUP BY login";
		$tparam = array($date, $pourMatin);
		return $this->execQuery($requete, $tparam, 'Demande');
	}

	/**
	 * Récupère une demande dans la base de données.
	 * @param string $date date de la demande
	 * @param bool $pourMatin matin ou après-midi
	 * @param int $idUti id de l'utilisateur
	 */
	public function getDemandesUti($date, $pourMatin, $idUti) {
		$requete = "SELECT p.idProd, p.libProd, p.categorie, d.qa FROM Demande d JOIN Produit p ON d.idprod = p.idProd WHERE date = ? AND pourMatin = ? AND idUti = ?";
		$tparam = array($date, $pourMatin, $idUti);
		return $this->execQuery($requete, $tparam, 'Demande');
	}

	/**
	 * Récupère une demande dans la base de données.
	 * @param int $idProd id du produit
	 * @param string $date date de la demande
	 * @param bool $pourMatin matin ou après-midi
	 */
	public function getDemandesProduit($date, $pourMatin) {
		$requete = "SELECT p.idProd, ref, libProd, SUM(qa) as \"qa\", MIN(valider) as \"valider\" FROM Demande d JOIN Produit p ON d.idprod = p.idProd WHERE date = ? AND pourMatin = ? GROUP BY idProd; ";
		$tparam = array($date, $pourMatin);
		return $this->execQuery($requete, $tparam, 'Demande');
	}

	/**
	 * Supprime une demande dans la base de données.
	 * @param int $idProd id du produit
	 * @param int $idUti id de l'utilisateur
	 */
	public function suppDemande($idProd, $idUti, $date, $pourMatin) {
		$requete = "DELETE FROM Demande WHERE idProd = ? AND idUti = ? AND date = ? AND pourMatin = ?";
		$tparam = array($idProd, $idUti, $date, $pourMatin);
		$this->execMaj($requete, $tparam);
	}
} //fin classe DB