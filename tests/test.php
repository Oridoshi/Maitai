<form action="../src/php/other/creationUtilisateur.php" method="POST">
	<label for="login">Login :</label>
	<input type="text" id="login" name="login" required><br><br>
	
	<label for="email">Email :</label>
	<input type="email" id="email" name="email" required><br><br>

    <label for="actif">Actif :</label>
    <input type="checkbox" id="actif" name="actif" checked><br><br>

    <label for="droit">Droit :</label>
    <select id="droit" name="droit">
        <option value="0">Client</option>
        <option value="1">Maitai</option>
        <option value="2">Administrateur</option>
    </select><br><br>
	
	<input type="submit" value="Créer utilisateur">
</form>