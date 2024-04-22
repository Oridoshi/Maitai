<?php

echo "<form action='../other/utilisateur/ModificationUtilisateur.php' method='post'>";
echo "<label for='prevLogin'>Ancien login</label>";
echo "<input type='text' id='prevLogin' name='prevLogin' required><br>";

echo "<label for='login'>Nouveau login</label>";
echo "<input type='text' id='login' name='login'><br>";

echo "<label for='mdp'>Nouveau mot de passe</label>";
echo "<input type='text' id='mdp' name='mdp'><br>";

echo "<label for='email'>Nouvel email</label>";
echo "<input type='text' id='email' name='email'><br>";

echo "<label for='actif'>Actif</label>";
echo "<input type='checkbox' id='actif' name='actif'><br>";

echo "<label for='iddroit'>ID Droit</label>";
echo "<input type='text' id='iddroit' name='iddroit'><br>";

echo "<input type='submit' value='Modifier l'utilisateur'>";
echo "</form>";