<h1>Formulaire de Modification de produits</h1><br><br><br>
<form action="../src/php/other/ModificationProduit.php" method="POST">
	<label for="idProd">idProd :</label>
	<input type="text" id="idProd" name="idProd" required><br><br>
	
	<label for="libProd">libProd :</label>
	<input type="libProd" id="libProd" name="libProd" required><br><br>

	<label for="prixUni">prixUni :</label>
	<input type="prixUni" id="prixUni" name="prixUni"><br><br>

	<label for="categorie">categorie :</label>
	<input type="categorie" id="categorie" name="categorie" required><br><br>
	
	<input type="submit" value="Modif produits">
</form>
