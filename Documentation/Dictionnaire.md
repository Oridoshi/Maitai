# DICTIONNAIRE DES DONNEES

Dictionnaire des données de la base de données pour le STAGE projet Maitai.
Ces tables utiliseront la base de données "MAITAI".
Tous droits sont résérvés à ses créateurs et au groupes de plongés.




## Table de Liaison 0 (Indépendante)


### Table : Utilisateur
**Description :** Table contenant les informations sur les utilisateurs du site.

**Données :**
- login  [ VARCHAR (20) ] : Login de l'utilisateur.                                                   (**NOT NULL**)
- mdp    [ VARCHAR (20) ] : Mot de passe encrypté de l'utilisateur.                                   (**NOT NULL**)
- email  [ VARCHAR (40) ] : Email de récupération du compte (encryptès).                              (**UNIQUE | NOT NULL**)
- actif  [ BOOLEAN      ] : Si le compte est actif ou non. Peut être activer ou désactiver à volonter (**DEFAULT true | NOT NULL**)

CLE PRIMAIRE : (login,pwd)
UNIQUE       : email


### Table : Droit
**Description :** Table contenant les différent droit disponible du site.

**Données :**
- idDroit  [ INTEGER      ] : Numéro d'identification du droit.                    (**NOT NULL**)
- libDroit [ VARCHAR (30) ] : Libellé du droit afin de faciliter l'identification. (**NOT NULL**)

CLE PRIMAIRE : idDroit


### Table : Client
**Description :** Table contenant les différent clients stockés dans l'application.

**Données :**
- idCli     [ INTEGER      ] : Numéro d'identification du client.                        (**NOT NULL**)
- prenom    [ VARCHAR (30) ] : Prenom du client.                                         (**NOT NULL**)
- nom       [ VARCHAR (30) ] : Nom du client.                                            (**NOT NULL**)
- email     [ VARCHAR (60) ] : Email du client (encryptés).                              (**NOT NULL**)
- telephone [ VARCHAR (60) ] : Telephone du client (encryptés).                          (**NOT NULL**)
- present   [ BOOLEAN      ] : Si le client est actuellement present sur le site ou non. (**DEFAULT FALSE | NOT NULL**)

CLE PRIMAIRE : idClient


### Table : Produit
**Description :** Table contenant les différent produits stockés dans l'application.

**Données :**
- idProd    [ INTEGER      ] : Numéro d'identification du produit. (**NOT NULL**)
- libProd   [ VARCHAR (30) ] : Libellé du produit.                 (**NOT NULL**)
- prixUni   [ FLOAT        ] : Prix unitaire du produit.
- categorie [ VARCHAR (30) ] : Categorie du produit.               (**NOT NULL**)

CLE PRIMAIRE : idProd




## Table de Liaison 1 (Dépendante)


### Table : Historique
**Description :** Table contenant les différentes fichiers (pour l'instant uniquement Ticket) exporter précédemment.

**Données :**
- idHis  [ INTEGER       ] : Numéro d'identification du fichier stockés. (**NOT NULL**)
- date   [ DATE          ] : Date a laquelle le fichier a était généré.  (**NOT NULL**)
- chemin [ VARCHAR (255) ] : Chemin pour retrouver le fichier.           (**NOT NULL**)
- idCli  [ INTEGER       ] : Client attachés au fichiers générés.        (**NOT NULL**)

CLE PRIMAIRE : idHis
CLE ETRANGERE : idClient (Client)


### Table : Ticket
**Description :** Table contenant les différentes commandes fait par l'utilisateur.

**Données :**
- idProd   [ INTEGER      ] : Numéro d'identification du produits commandés.   (**NOT NULL**)
- idClient [ INTEGER      ] : Numéro d'identification du client qui commande.  (**NOT NULL**)
- qa       [ INTEGER      ] : Quantité du produit acheté.                      (**NOT NULL | qa > 0**)
- prixTot  [ INTEGER      ] : Prix totaux de la commande (car certain produit) (**NOT NULL | DEFAULT qa * idProd.prixUni**)

CLE PRIMAIRE : idProd, idClient
CLE ETRANGERE : idClient (Client), idProd (Produit)


### Table : UtilisateursDroit
**Description :** Table contenant les différentes commandes fait par l'utilisateur.

**Données :**
- login   [ VARCHAR(20) ] : Login de l'utilisateur.           (**NOT NULL**)
- mdp     [ VARCHAR(20) ] : Mots de passe de l'utilisateur.   (**NOT NULL**)
- idDroit [ INTEGER     ] : Numéro d'identification du droit. (**NOT NULL**)

CLE PRIMAIRE : login, mdp, idDroit
CLE ETRANGERE : idDroit (Droit), login (Utlisateur), mdp (Utlisateur)
