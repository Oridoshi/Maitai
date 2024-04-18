<?php

//Mettre les objet a require ici /!\
include 'Client.inc.php';
include 'Droit.inc.php';
include 'Historique.inc.php';
include 'Produit.inc.php';
include 'Ticket.inc.php';
include 'Utilisateur.inc.php';
include 'UtilisateurDroit.inc.php';

class DB {

	private static $instance = null; //mémorisation de l'instance de DB pour appliquer le pattern Singleton
	private $connect=null; //connexion PDO à la base

	private static string $dbName   = "Maitai";
	private static string $login    = "hs220880";
	private static string $password = "SAHAU2004";
	private static string $port     = "3306";
	private static string $host     = "localhost";



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

	/*** METHODES POUR LES UTILISATEURS ****/

	/** Récupérer tous les utilisateurs. */
	public function getUtilisateurs() {
		$requete = 'SELECT * FROM Utilisateur';
		return $this->execQuery($requete,null,'Utilisateur');
	}

	public function getUtilisateursLogin($login) {
		$requete = 'SELECT * FROM Utilisateur WHERE login = ?';
		return $this->execQuery($requete,array($login),'Utilisateur');
	}

	public function getUtilisateursEmail($email) {
		$requete = 'SELECT * FROM Utilisateur WHERE email = ?';
		return $this->execQuery($requete,array($email),'Utilisateur');
	}

	/** Modifier les données d'un utilisateur. */
	public function updateUtilisateur($utilisateur) {

		$existingUser = $this->getUtilisateursLogin($utilisateur->getLogin());
		if ($existingUser) {
			echo "Le nom d'utilisateur '{$utilisateur->getLogin()}' existe déjà. <br>";
			return false; // Sortir de la fonction si l'utilisateur existe déjà
		}

		// Vérifier si le nom d'utilisateur existe déjà
		$existingUser = $this->getUtilisateursEmail($utilisateur->getEmail());
		if ($existingUser) {
			echo "L'email '{$utilisateur->getEmail()}' est déjà utiliser. <br>";
			return false; // Sortir de la fonction si l'utilisateur existe déjà
		}
		

		$requete = 'UPDATE Utilisateur SET login = ?, mdp = ?, email = ?, actif = ? WHERE idUti = ?';

		echo 'UPDATE Utilisateur SET login = ' . $utilisateur->getLogin() . ', mdp = ?, email = ?, actif = ? WHERE idUti = ' . $utilisateur->getIdUti();
		return $this->execQuery($requete,array($utilisateur->getLogin(),$utilisateur->getLogin(),$utilisateur->getEmail(),$utilisateur->getActif(),$utilisateur->getIdUti()),'Utilisateur');
	}

	/** Ajouter un utilisateur uniquement s'il n'existe pas déjà. */
	public function insertUtilisateur($utilisateur) {
		// Vérifier si le nom d'utilisateur existe déjà
		$existingUser = $this->getUtilisateursLogin($utilisateur->getLogin());
		if ($existingUser) {
			echo "Le nom d'utilisateur '{$utilisateur->getLogin()}' existe déjà. <br>";
			return false; // Sortir de la fonction si l'utilisateur existe déjà
		}

		// Vérifier si le nom d'utilisateur existe déjà
		$existingUser = $this->getUtilisateursEmail($utilisateur->getEmail());
		if ($existingUser) {
			echo "L'email '{$utilisateur->getEmail()}' est déjà utiliser. <br>";
			return false; // Sortir de la fonction si l'utilisateur existe déjà
		}
		
		// Insérer l'utilisateur s'il n'existe pas déjà
		$requete = 'INSERT INTO Utilisateur (login, mdp, email, actif) VALUES (?, ?, ?, ?)';
		return $this->execQuery($requete, array($utilisateur->getLogin(), $utilisateur->getMdp(), $utilisateur->getEmail(), $utilisateur->getActif()), 'Utilisateur');
	}

	/** Supprimer un utilisateur. */
	public function suppUtilisateur($utilisateur) {
		$requete = 'DELETE FROM Utilisateur WHERE idUti = ?';
		return $this->execQuery($requete,array($utilisateur->getIdUti()),'Utilisateur');
	}

	/** Récupérer les droits d'un utilisateur. */
	public function getDroitUtilisateurs($utilisateur) {
		$requete = 'SELECT * FROM UtilisateurDroit WHERE idUti = ?';
		return $this->execQuery($requete,array($utilisateur->getIdUti()),'UtilisateurDroit');
	}

	/** Récupérer les droits d'un utilisateur. */
	public function insertDroitUtilisateur($droituti) {
		$requete = 'INSERT INTO UtilisateurDroit VALUES (?,?)';
		return $this->execQuery($requete,array($droituti->getIdUti(),$droituti->getIdDroit()),'UtilisateurDroit');
	}




	/*** METHODES POUR LES PRODUITS ****/

	/** Récuperer les produits. Trier par categorie. */
	public function getProduits() {
		$requete = 'SELECT * FROM Produit ORDER BY categorie';
		return $this->execQuery($requete,null,'Produit');
	}

	/** Modifier les données d'un produit. */
	public function updateProduit($produits) {
		$requete = 'UPDATE Produits SET libProd = ?, prixUni = ?, categorie = ? WHERE idProd = ?';
		return $this->execQuery($requete,array($produits->getLibProd(),$produits->getPrixUni(),$produits->getCategorie(),$produits->getIdUti()),'Produit');
	}

	/** Ajouter un produit. */
	public function insertProduit($produits) {
		$requete = 'INSERT INTO Produits (libProd, prixUni, categorie) SET (?,?,?)';
		return $this->execQuery($requete,array($produits->getLibProd(),$produits->getPrixUni(),$produits->getCategorie()),'Produit');
	}

	/** Supprimer un produit. */
	public function suppProduit($produits) {
		$requete = 'DELETE FROM Produit WHERE idProd = ?';
		return $this->execQuery($requete,array($utilisateur->getIdUti()),'Produit');
	}



	/*** METHODES POUR LES CLIENTS ****/

	/** Récuperer les clients. */
	public function getClients($client) {
		$requete = 'SELECT * FROM Client';
		return $this->execQuery($requete,null,'Client');
	}

	/** Récuperer le client d'un nom de club. */
	public function getClient($nomClub) {
		$requete = 'SELECT * FROM Client WHERE nomClub = ?';
		return $this->execQuery($requete,array($nomClub),'Client');
	}

	/** Récuperer les clients présents. */
	public function getClientsPresent($client) {
		$requete = 'SELECT * FROM Client WHERE present = 1';
		return $this->execQuery($requete,null,'Client');
	}

	/** Modifier les données d'un client. */
	public function updateClient($client) {


		$existingClient = $this->getClient($client->getNomClub());
		if ($existingClient) {
			echo "Le club '{$client->getNomClub()}' est déjà dans la base. <br>";
			return false; // Sortir de la fonction si l'utilisateur existe déjà
		}

		$requete = 'UPDATE Client SET nomClub = ?, email = ?, telephone = ?, present = ? WHERE idCli = ?';
		return $this->execQuery($requete,array($client->getNomClub(),$produits->getEmail(),$produits->getTelephone(),$produits->getPresent(),$produits->getIdCli()),'Client');
	}

	/** Ajouter un client. */
	public function insertClient($client) {

		$existingClient = $this->getClient($client->getNomClub());
		if ($existingClient) {
			echo "Le club '{$client->getNomClub()}' est déjà dans la base. <br>";
			return false; // Sortir de la fonction si l'utilisateur existe déjà
		}

		$requete = 'INSERT INTO Client (nomClub, email, telephone, present) SET (?, ?, ?, ?)';
		return $this->execQuery($requete,array($client->getNomClub(),$produits->getEmail(),$produits->getTelephone(),$produits->getPresent(),$produits->getIdCli()),'Client');
	}

	/** Supprimer un client. */
	public function suppClient($client) {
		$requete = 'DELETE FROM Client WHERE idCli = ?';
		return $this->execQuery($requete,array($client->getIdCli()),'Client');
	}



	/*** METHODES POUR LES TICKETS ****/

	/** Récuperer les tickets/commande d'un client. */
	public function getTicketClient($client) {
		$requete = 'SELECT * FROM Ticket WHERE idCli = ?';
		return $this->execQuery($requete,array($client->getIdCli()),'Ticket');
	}

	/** Modifier la quantité et le prix total d'un des tickets/commande */
	public function updateTicket($ticket) {
		$requete = 'UPDATE Ticket SET qa = ?, prixTot = ? WHERE idCli = ? AND idProd = ?';
		return $this->execQuery($requete,array($ticket->getQa(),$ticket->getPrixTot(),$ticket->getIdCli(),$ticket->getIdProd()),'Ticket');
	}

	/** Ajouter un ticket/commande. */
	public function insertTicket($client) {
		$requete = 'INSERT INTO Ticket SET (?, ?, ?, ?)';
		return $this->execQuery($requete,array($produits->getIdCli(),$produits->getIdProd(),$produits->getQa(),$produits->getPrixTot()),'Ticket');
	}

	/** Supprimer un ticket/commande. */
	public function suppTicket($client) {
		$requete = 'DELETE FROM Ticket WHERE idCli = ?';
		return $this->execQuery($requete,array($produits->getIdCli()),'Ticket');
	}



	/*** METHODES POUR L'HISTORIQUE ****/

	/** Récuperer l'historique des fiches de securité. */
	public function getHistoriqueSecu() {
		$requete = 'SELECT * FROM Historique WHERE categorie = \'SECU\'';
		return $this->execQuery($requete,null,'Historique');
	}

	/** Récuperer l'historique des ticket. */
	public function getHistoriqueTicket() {
		$requete = 'SELECT * FROM Historique WHERE categorie = \'TICKET\'';
		return $this->execQuery($requete,null,'Historique');
	}

	/** Récuperer l'historique des tickets d'un client. */
	public function getHistoriqueTicketClient($client) {
		$requete = 'SELECT * FROM Historique WHERE categorie = \'TICKET\' AND idCli = ?';
		return $this->execQuery($requete,array($client->getIdCli()),'Historique');
	}

	/** Récuperer l'historique des fiche de sécurité d'un client. */
	public function getHistoriqueSecuClient($client) {
		$requete = 'SELECT * FROM Historique WHERE categorie = \'SECU\' AND idCli = ?';
		return $this->execQuery($requete,array($client->getIdCli()),'Historique');
	}

	/** Inserer un fichier dans l'historique. */
	public function insertHistorique($historique) {
		$requete = 'INSERT INTO Historique (chemin, type, idCli) SET (?, ?, ?)';
		return $this->execQuery($requete,array($historique->getChemin(),$historique->getType(),$historique->getIdCli()),'Historique');
	}

	/** Inserer un fichier dans l'historique. */
	public function suppHistorique($historique) {
		$requete = 'DELETE FROM Historique WHERE idHis = ?';
		return $this->execQuery($requete,array($historique->getIdHis()),'Historique');
	}

} //fin classe DB

?>
