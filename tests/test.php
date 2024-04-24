<h1>Modif Produit au Ticket avec Prix Total</h1>
<form action="../src/php/other/ticket/ModificationTicket.php" method="post">
	<label for="idprod">idprod:</label>
	<input type="idprod" name="idprod" id="idprod" required><br>

	<label for="idcli">idcli:</label>
	<input type="idcli" name="idcli" id="idcli" required><br>

	<label for="qa">qa:</label>
	<textarea name="qa" id="qa" required></textarea><br>

	<label for="prixtot">qa:</label>
	<textarea name="prixtot" id="prixtot" required></textarea><br>

	<input type="submit" value="Envoyer">
</form>

<h1>Modif Produit au Ticket sans Prix Total</h1>
<form action="../src/php/other/ticket/ModificationTicket.php" method="post">
	<label for="idprod">idprod:</label>
	<input type="idprod" name="idprod" id="idprod" required><br>

	<label for="idcli">idcli:</label>
	<input type="idcli" name="idcli" id="idcli" required><br>

	<label for="qa">qa:</label>
	<textarea name="qa" id="qa" required></textarea><br>

	<input type="submit" value="Envoyer">
</form>
