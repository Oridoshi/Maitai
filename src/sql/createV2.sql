-- Suppression des tables de premier niveau de liaison
DROP TABLE IF EXISTS UtilisateurDroit;
DROP TABLE IF EXISTS Historique      ;
DROP TABLE IF EXISTS Ticket          ;
DROP TABLE IF EXISTS Demande         ;

-- Suppression des tables non-lié.
DROP TABLE IF EXISTS Utilisateur;
DROP TABLE IF EXISTS Produit    ;




/*******************************************/
/*                                         */
/*                LIAISON 0                */
/*                                         */
/*******************************************/

-- Création de la table utilisateur
CREATE TABLE Utilisateur
(
	-- Utilisateur
	idUti SERIAL       PRIMARY KEY       ,
	login VARCHAR(20)  NOT NULL UNIQUE   ,
	email VARCHAR(60)  NOT NULL UNIQUE   ,
	mdp   VARCHAR(255) NOT NULL          ,
	actif BOOLEAN      NOT NULL DEFAULT 1,

	-- Partie client
	telephone VARCHAR(10)          ,
	present   BOOLEAN     DEFAULT 1,

	-- Partie droit : Seulement trois possible; 'Client, Maitai, Admin' 
	droit     VARCHAR(6) NOT NULL CHECK (droit IN ("Client", "Maitai", "Admin"))
);


-- Insertion d'un utilisateur admin
INSERT INTO Utilisateur (login, email, mdp, droit) VALUES ('admin1', 'votre.addresse@gmail.fr', '', 'Admin');


-- Création de la table produit
CREATE TABLE Produit
(
	idProd    INTEGER       PRIMARY KEY,
	ref       VARCHAR(255)  NOT NULL   ,
	libProd   VARCHAR(255)  NOT NULL   ,
	prixUni   DECIMAL(12,2)            ,
	prixUniHT DECIMAL(12,2)            ,
	categorie VARCHAR(30)   NOT NULL
);




/*******************************************/
/*                                         */
/*               LIAISON 1                 */
/*                                         */
/*******************************************/

-- Création de la table historique : permet de garder en mémoire les chemins menant au fichier sauvegarder sur le serveur.
CREATE TABLE Historique
(
	idHis  SERIAL       PRIMARY KEY,
	date   DATE         DEFAULT CURRENT_DATE NOT NULL,
	chemin VARCHAR(255) NOT NULL,
	type   VARCHAR(6)   NOT NULL CHECK (type IN ('TICKET', 'SECU')),
	valide BOOLEAN      DEFAULT 0,
	idUti  INTEGER      NOT NULL REFERENCES Utilisateur(idUti)
);

-- Création de la table ticket : permet de garder en mémoire la commande actuellement en cours des gens
CREATE TABLE Ticket
(
	idProd  INTEGER REFERENCES Produit(idProd),
	idUti   INTEGER REFERENCES Utilisateur(idUti),
	qa      INTEGER NOT NULL CHECK (qa >= 0),
	prixTot DECIMAL(12,2) DEFAULT NULL,
	prixSpe DECIMAL(12,2) DEFAULT NULL,
	PRIMARY KEY (idProd, idUti)
);

-- Création de la table demande : permet de savoir les demandes de clients pour un jour précis (permet de prévoir le stock)
CREATE TABLE Demande
(
	idProd   INTEGER REFERENCES Produit(idProd),
	idUti    INTEGER REFERENCES Utilisateur(idUti),
	qa       INTEGER NOT NULL CHECK (qa >0),
	date     DATE    NOT NULL,
	pourMatin BOOLEAN NOT NULL,
	valider  BOOLEAN DEFAULT 1,
	PRIMARY KEY (idProd, idUti)
);