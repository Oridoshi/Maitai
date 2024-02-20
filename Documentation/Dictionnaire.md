# DICTIONNAIRE DES DONNEES

Dictionnaire des données de la base de données pour le STAGE projet Maitai.
Ces tables utiliseront la base de données "MAITAI".
Tous droits sont résérvés à ses créateurs et au groupes de plongés.




## Table de Liaison 0 (Indépendante)


### Table : Utilisateur
**Description :** Table contenant les informations sur les utilisateurs du site.

**Données :**
- emailUser  [ VARCHAR (40) ] : Email de récupération du compte.                                          (**UNIQUE | NOT NULL**)
- loginUser  [ VARCHAR (20) ] : Login de l'utilisateur.                                                   (**NOT NULL**)
- pwdUser    [ VARCHAR (20) ] : Mot de passe encrypté de l'utilisateur.                                   (**NOT NULL**)
- adminUser  [ BOOLEAN      ] : Si l'utilisateur est administrateur ou non.                               (**DEFAULT true | NOT NULL**)
- activeUser [ BOOLEAN      ] : Si le compte est actif ou non. Peut être activer ou désactiver à volonter (**DEFAULT true | NOT NULL**)

CLE PRIMAIRE : emailUser.


### Table : Client
**Description :** Table des catégories des produits.

**Données :** 
- idCli     [ INTEGER      ] : Numéro d'identification (auto incrémenter). (**NOT NULL | UNIQUE**) 
- nomCli    [ VARCHAR (20) ] : Nom du client.                              (**NOT NULL**)
- prenomCli [ VARCHAR (50) ] : Prénom du client.                           (**NOT NULL**)

CLE PRIMAIRE : idCli.


### Table : CategProd
**Description :** Table des catégories des produits.

**Données :** 
- idCateg   [ INTEGER      ] : Numéro d'identification (auto incrémenter). (**NOT NULL | UNIQUE**) 
- nomCateg  [ VARCHAR (20) ] : Nom de la catégorie.                        (**NOT NULL**)
- descCateg [ VARCHAR (50) ] : Descriptions de la catégorie.               (**NOT NULL**)

CLE PRIMAIRE : idCateg.




## Table de Liaison 1 (Dépendant)


### Table : Produit
**Description :** Table contenant les informations sur les diFférents produit.

**Données :**
- idProd   [ INTEGER      ] : Numéro d'identification (auto incrémenter). (**NOT NULL | UNIQUE**) 
- libProd  [ VARCHAR (20) ] : Libéllé du produit.                         (**NOT NULL**)
- descProd [ VARCHAR (20) ] : Description du produit.                     (**NOT NULL**)
- qsProd   [ INTEGER      ] : Quantite en stock                           (**[0;+inf] | NOT NULL**)
- prix     [ FLOAT        ] : Prix à l'unité du produit.                  (**[0;+inf] | NOT NULL**)
- idCateg  [ INTEGER      ] : Catégorie du produit.                       (**NOT NULL**)

CLE PRIMAIRE : idProd.
CLE ETRANGERE : idCateg --> idCateg(CategProd)




## Table de Liaison 2 (Dépendant)


### Table : Commande
**Description :** Table contenant les informations sur les différentes commandes passé par les clients.

**Données :**
- idComm  [ INTEGER ] : Numéro d'identification (auto incrémenter). (**NOT NULL | UNIQUE**) 
- idProd  [ INTEGER ] : Numéro du produit.                          (**NOT NULL**) 
- idCli   [ INTEGER ] : Numéro du client.                           (**NOT NULL**) 
- qaComm  [ INTEGER ] : Quantite commandé                           (**[0;+inf] | NOT NULL | DEFAULT 1**)

CLE PRIMAIRE : idComm
CLE ETRANGERE : idProd --> idProd(Produit)
                idCli  -->  idCli(Client )




## Table de Liaison 3 (Dépendant)


### Table : Ticket
**Description :** Table contenant les informations sur les différents produit..

**Données :**
- idTicket   [ INTEGER ] : Numéro d'identification (auto incrémenter). (**NOT NULL | UNIQUE**) 
- idComm     [ INTEGER ] : Numéro de la commande                       (**NOT NULL**)
- dateTicket [ DATE    ] : Catégorie du produit.

CLE PRIMAIRE  : (idTicket, idComm)
CLE ETRANGERE : idComm --> idComm(Commande)