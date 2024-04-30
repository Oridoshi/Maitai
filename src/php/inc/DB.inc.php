<?php

//Mettre les objet a require ici /!\
include_once 'Produit.inc.php';

class DB {

	private static $instance = null; //mémorisation de l'instance de DB pour appliquer le pattern Singleton
	private $connect=null; //connexion PDO à la base

	private static string $dbName   = "maitai";
	private static string $login    = "Admin";
	private static string $password = "maitai";
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

	/*** METHODES POUR LES PRODUITS ***/

	/** Récuperer les produits. Trier par categorie.
	 * @return array tableau d'objets de la classe Produit
	 */
	public function getProduits() {
		$requete = 'SELECT * FROM Produit ORDER BY categorie';
		return $this->execQuery($requete,null,'Produit');
	}

	/** Récuperer les produits en fonction de la catégorie.
	 * @param string $categ la catégorie des produits à récupérer
	 * @return array tableau d'objets de la classe Produit
	 */
	public function getProduitsParCateg($categ) {
		$requete = 'SELECT * FROM Produit WHERE categorie = ?';
		return $this->execQuery($requete,array($categ),'Produit');
	}

	/** Modifier les données d'un produit.
	 * @param Produit $produits le produit à modifier.
	 */
	public function updateProduit($produits) {
		$requete = 'UPDATE Produit SET libProd = ?, prixUni = ?, categorie = ? WHERE idProd = ?';
		$this->execQuery($requete,array($produits->getLibProd(),$produits->getPrixUni(),$produits->getCategorie(),$produits->getIdProd()),'Produit');
	}

	/**
	 * Créer un produit.
	 * @param Produit $produits le produit à créer.
	 */
	public function insertProduit($produits) {
		$requete = 'INSERT INTO Produit VALUES (?,?,?,?)';
		$this->execQuery($requete,array($produits->getIdProd(),$produits->getLibProd(),$produits->getPrixUni(),$produits->getCategorie()),'Produit');
	}

	/** Supprimer un produit.
	 * @param Produit $produits le produit à supprimer
	 */
	public function suppProduit($produits) {
		$requete = 'DELETE FROM Produit WHERE idProd = ?';
		$this->execQuery($requete,array($produits->getIdProd()),'Produit');
	}

} //fin classe DB
<?php

//Mettre les objet a require ici /!\
include_once 'Droit.inc.php';
include_once 'Utilisateur.inc.php';
include_once 'UtilisateurDroit.inc.php';
include_once 'Client.inc.php';

class DB {

	private static $instance = null; //mémorisation de l'instance de DB pour appliquer le pattern Singleton
	private $connect=null; //connexion PDO à la base

	private static string $dbName   = "maitai";
	private static string $login    = "Admin";
	private static string $password = "maitai";
	private static string $port     = "3306";
	private static string $host     = "172.26.4.207";



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

	/** Retourne tout les droits de la table droit. */
	public function getDroits() {
		$requete = 'SELECT * FROM Droit';
		return $this->execQuery($requete,null,'Droit');
	}

	/** Récupérer le login, mdp, email, libdroit et actif des tout utilisateurs */
	public function getUtilisateursEtDroit() {
		$requete = 'SELECT login, mdp, email, libdroit, actif FROM Utilisateur, Droit, UtilisateurDroit WHERE Utilisateur.idUti = UtilisateurDroit.idUti AND Droit.iddroit = UtilisateurDroit.iddroit ORDER BY droit.idDroit,login DESC';
		$stmt = $this->connect->prepare($requete);
		$stmt->execute();
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
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
	/*** METHODES POUR LES UTILISATEURS ****/

	/** Obtenir un utilisateur à partir de son login */
	public function getUtilisateur($login) {
		$requete = 'SELECT * FROM Utilisateur WHERE login = ?';
		return $this->execQuery($requete,array($login),'Utilisateur')[0];
	}

	/** Modifier les données d'un utilisateur. */
	public function updateUtilisateur($utilisateur) {
		$requete = 'UPDATE Utilisateur SET login = ?, mdp = ?, email = ?, actif = ? WHERE idUti = ?';
		return $this->execMaj($requete,array($utilisateur->getLogin(),$utilisateur->getMdp(),$utilisateur->getEmail(),$utilisateur->getActif(),$utilisateur->getIdUti()));
	}

	public function updateUtilisateurDroit($droituti) {
		$this->suppDroitUtilisateur($droituti->getIdUti());
		$this->insertUtilisateurDroit($droituti->getIdUti(), $droituti->getIdDroit());
	}


	/** Supprimer les droits d'un utilisateur. */
	public function suppDroitUtilisateur($iduti) {
		$requete = 'DELETE FROM UtilisateurDroit WHERE idUti = ?';
		return $this->execQuery($requete,array($iduti),'UtilisateurDroit');
	}

	/** Supprimer un utilisateur. */
	public function suppUtilisateur($iduti) {
		$requete = 'DELETE FROM Utilisateur WHERE idUti = ?';
		return $this->execQuery($requete,array($iduti),'Utilisateur');
	}
	
	/** Ajouter un utilisateur uniquement s'il n'existe pas déjà. */
	public function insertUtilisateur($utilisateur) {		
		// Insérer l'utilisateur s'il n'existe pas déjà
		$requete = 'INSERT INTO Utilisateur (login, mdp, email, actif) VALUES (?, ?, ?, ?)';
		return $this->execQuery($requete, array($utilisateur->getLogin(), $utilisateur->getMdp(), $utilisateur->getEmail(), $utilisateur->getActif()), 'Utilisateur');
	}

	/** Ajouter un UtilisateurDroit si l'utilisateur n'a pas déjà de droit */
	public function insertUtilisateurDroit($idUti, $droit) {
		$requete = 'INSERT INTO UtilisateurDroit (idUti, idDroit) VALUES (?, ?)';
		return $this->execQuery($requete, array($idUti, $droit), 'UtilisateurDroit');
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





	/*** METHODES POUR LES CLIENTS ****/

	/** Récuperer les clients. */
	public function getClients() {
		$requete = 'SELECT * FROM Client';
		return $this->execQuery($requete,null,'Client');
	}

	/** Récuperer les clients présents. */
	public function getClientsPresent() {
		$requete = 'SELECT * FROM Client WHERE present = 1';
		return $this->execQuery($requete,null,'Client');
	}
	/** Récuperer le client à l'aide du nom du club */
	public function getClient($nomClub) {
		$requete = 'SELECT * FROM Client WHERE nomClub = ?';
		return $this->execQuery($requete,array($nomClub),'Client');
	}

	/** Modifier les données d'un client. */
	public function updateClient($client) {
		$requete = 'UPDATE Client SET nomClub = ?, email = ?, telephone = ?, present = ? WHERE idCli = ?';
		return $this->execQuery($requete,array($client->getNomClub(),$client->getEmail(),$client->getTelephone(),$client->getPresent(),$client->getIdCli()),'Client');
	}

	/** Ajouter un client. */
	public function insertClient($client) {

		$existingClient = $this->getClient($client->getNomClub());
		if ($existingClient) {
			echo "Le club '{$client->getNomClub()}' est déjà dans la base. <br>";
			return false; // Sortir de la fonction si l'utilisateur existe déjà
		}

		$requete = 'INSERT INTO Client (nomClub, email, telephone, present) VALUES (?, ?, ?, ?)';
		return $this->execQuery($requete,array($client->getNomClub(),$client->getEmail(),$client->getTelephone(),$client->getPresent()),'Client');
	}


	
} //f