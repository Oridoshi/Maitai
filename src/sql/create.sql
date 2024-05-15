DROP TABLE IF EXISTS UtilisateurDroit;
DROP TABLE IF EXISTS Historique      ;
DROP TABLE IF EXISTS Ticket          ;

DROP TABLE IF EXISTS Client     ;
DROP TABLE IF EXISTS Utilisateur;
DROP TABLE IF EXISTS Droit      ;
DROP TABLE IF EXISTS Produit    ;


CREATE TABLE Utilisateur
(
	idUti SERIAL       PRIMARY KEY,
	login VARCHAR(30)  NOT NULL UNIQUE,
	mdp   VARCHAR(255) NOT NULL,
	email VARCHAR(60)  UNIQUE,
	actif BOOLEAN      NOT NULL DEFAULT 1
);

CREATE TABLE Droit
(
	idDroit  SERIAL      PRIMARY KEY,
	libDroit VARCHAR(40) NOT NULL
);

CREATE TABLE Client
(
	idCli     SERIAL      PRIMARY KEY,
	nomClub   VARCHAR(30) UNIQUE NOT NULL,
	email     VARCHAR(60) NOT NULL   ,
	telephone VARCHAR(10) NOT NULL   ,
	present   BOOLEAN     DEFAULT 1
);

CREATE TABLE Produit
(
	idProd    SERIAL        PRIMARY KEY,
	ref       VARCHAR(255)  NOT NULL   ,
	libProd   VARCHAR(255)  NOT NULL   ,
	prixUni   DECIMAL(12,2)            ,
	categorie VARCHAR(30)   NOT NULL
);

CREATE TABLE Historique
(
	idHis  SERIAL       PRIMARY KEY,
	date   DATE         DEFAULT CURRENT_DATE NOT NULL,
	chemin VARCHAR(255) NOT NULL,
	type   VARCHAR(6)   NOT NULL CHECK (type IN ('TICKET', 'SECU')),
	valide BOOLEAN      DEFAULT 0,
	idCli  INTEGER      NOT NULL REFERENCES Client(idCli)
);

CREATE TABLE Ticket
(
	idProd  INTEGER REFERENCES Produit(idProd),
	idCli   INTEGER REFERENCES Client(idCli),
	qa      INTEGER NOT NULL CHECK (qa >= 0),
	prixTot DECIMAL(12,2) DEFAULT NULL,
	prixSpe DECIMAL(12,2) DEFAULT NULL,
	PRIMARY KEY (idProd, idCli)
);

CREATE TABLE UtilisateurDroit
(
	idUti   INTEGER REFERENCES Utilisateur(idUti)  ,
	idDroit INTEGER REFERENCES Droit      (idDroit),
	PRIMARY KEY (idUti,idDroit)
);
