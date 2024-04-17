	<?php

	// Inclure la classe DB
	require_once 'DB.inc.php';

	// Créer une instance de la classe DB
	$db = DB::getInstance();

	// Tester les méthodes pour les utilisateurs
	echo "Liste des utilisateurs :<br>";
	$utilisateurs = $db->getUtilisateurs();
	foreach ($utilisateurs as $utilisateur) {
		echo $utilisateur->getLogin() . "<br>";
	}

	// Créer un nouvel utilisateur
	$newUser = new Utilisateur();
	$newUser->setLogin('nouvel_utilisateur');
	$newUser->setMdp('mot_de_passe');
	$newUser->setEmail('nouvel_utilisateur@example.com');
	$newUser->setActif(true);
	$db->insertUtilisateur($newUser);

	// Afficher la liste des utilisateurs après l'ajout
	echo "<br>Liste des utilisateurs après ajout :<br>";
	$utilisateurs = $db->getUtilisateurs();
	foreach ($utilisateurs as $utilisateur) {
		echo $utilisateur->getLogin() . "<br>";
	}

	// Modifier les données d'un utilisateur existant
	$utilisateurToModify = $utilisateurs[1];
	$utilisateurToModify->setEmail('nouvelle_adresse@example.com');

	var_dump ($utilisateurToModify);
	$db->updateUtilisateur($utilisateurToModify);

	// Afficher la liste des utilisateurs après la modification
	echo "<br>Liste des utilisateurs après modification :<br>";
	$utilisateurs = $db->getUtilisateurs();
	foreach ($utilisateurs as $utilisateur) {
		echo $utilisateur->getEmail() . "<br>";
	}

	// Supprimer un utilisateur
	$utilisateurToDelete = $utilisateurs[1];
	$db->suppUtilisateur($utilisateurToDelete);

	// Afficher la liste des utilisateurs après la suppression
	echo "<br>Liste des utilisateurs après suppression :<br>";
	$utilisateurs = $db->getUtilisateurs();
	foreach ($utilisateurs as $utilisateur) {
		echo $utilisateur->getLogin() . "<br>";
	}

	?>
