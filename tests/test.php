<form action="../src/php/other/client/ModificationClient.php" method="post">
    <label for="prevNomClub">Nom du club</label>
    <input type="text" name="prevNomClub" id="prevNomClub" required>
    

    <label for="nomClub">Nom du club</label>
    <input type="text" name="nomClub" id="nomClub" required>
    
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>
    
    <label for="telephone">Téléphone</label>
    <input type="tel" name="telephone" id="telephone" required>
    
    <label for="present">Présent</label>
    <input type="checkbox" name="present" id="present" required>
    
    <input type="submit" value="Créer le client">
</form>