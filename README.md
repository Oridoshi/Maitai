# Projet MAITAI - Réa Bado.2 - Création des Objets php

## Description
Création des différents Objets en php en fonction des tables de la base de données. Chaque Objet à son propre fichier php dans src/php.
- Pour la table Client on a le fichier Client.inc.php qui contient la classe client.
- Pour la table Droit on a le fichier Droit.inc.php qui contient la classe droit.
- Pour la table Historique on a le fichier Historique.inc.php qui contient la classe historique.
- Pour la table Produit on a le fichier Produit.inc.php qui contient la classe produit.
- Pour la table Ticket on a le fichier Ticket.inc.php qui contient la classe ticket.
- Pour la table Utilisateur on a le fichier Utilisateur.inc.php qui contient la classe utilisateur.
- Pour la table UtilisateurDroit on a le fichier UtilisateurDroit.inc.php qui contient la classe utilisateurDroit.

## Utilisation
### Instanciation
Pour utiliser les objets, il suffit d'instancier un objet de la classe correspondante.
#### Client :
```php
$client = new Client(1, "nomClub", "email", "telephone", true);
```
#### Droit
```php
$droit = new Droit(1, "libDroit");
```
#### Historique
```php
$historique = new Historique(1, "date", "chemin", "type",1);
```
#### Produit
```php
$produit = new Produit(1, "libProd", 1.0, "categorie");
```
#### Ticket
```php
$ticket = new Ticket(1, "date", 1, 1, 1, 1);
```
#### Utilisateur
```php
$utilisateur = new Utilisateur(1, "login", "mdp", "email", true);
```
#### UtilisateurDroit
```php
$utilisateurDroit = new UtilisateurDroit(1, 1);
```
### Getters and Setters
Pour chaque attribut de chaque Objet, il y a un getter (get) qui permet d'accèder à la valeur de l'attribut et un setter qui permet de modifier la valeur de l'attribut (set).

## Informations complémentaire
Pour plus d'informations et de détails vous pouvez aller lire les commentaires qui servent de documentations dans les fichiers php.

## Auteur
Hugo VICENTE