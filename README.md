# Classe Produit

La classe Produit est une représentation d'un produit avec ses attributs tels que l'identifiant, le libellé, le prix unitaire et la catégorie.

## Attributs

- **idprod** : *int* - Numéro d'identification du produit.
- **libprod** : *string* - Libellé du produit.
- **prixuni** : *float* - Prix unitaire du produit. Peut être null si le prix n'est pas défini.
- **categorie** : *string* - Catégorie à laquelle le produit appartient.

## Méthodes

### Constructeur

```php
public function __construct(int $idprod = 0, string $libprod = "", ?float $prixuni = null, string $categorie = "")
```
Constructeur de la classe Produit. Permet d'initialiser les attributs de l'objet.

### Getters
```php
public function getIdProd(): int
```
Retourne l'identifiant du produit.

```php
public function getLibProd(): string
```
Retourne le libellé du produit.

```php
public function getPrixUni(): ?float
```
Retourne le prix unitaire du produit. Peut être null si le prix n'est pas défini.

```php
public function getCategorie(): string
```
Retourne la catégorie du produit.

### Setters

```php
public function setIdProd(int $idprod): void
```
Définit l'identifiant du produit.

```php
public function setLibProd(string $libprod): void
```
Définit le libellé du produit.

```php
public function setPrixUni(?float $prixuni): void
```
Définit le prix unitaire du produit.

```php
public function setCategorie(string $categorie): void
```
Définit la catégorie du produit.

## Méthode BD
```php
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
```

# Dev
- [**Tom Dunet**    ](https://github.com/Oridoshi)
