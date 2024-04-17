	<?php

	// Inclure la classe DB
	require_once 'DB.inc.php';

	// Créer une instance de la classe DB
	$db = DB::getInstance();

	// Tester les méthodes pour les utilisateurs
	echo "Liste des utilisateurs :\n";
	$utilisateurs = $db->getUtilisateurs();
	foreach ($utilisateurs as $utilisateur) {
		echo $utilisateur->getLogin() . "\n";
	}

	// Créer un nouvel utilisateur
	$newUser = new Utilisateur();
	$newUser->setLogin('nouvel_utilisateur');
	$newUser->setMdp('mot_de_passe');
	$newUser->setEmail('nouvel_utilisateur@example.com');
	$newUser->setActif(true);
	$db->insertUtilisateur($newUser);

	// Afficher la liste des utilisateurs après l'ajout
	echo "\nListe des utilisateurs après ajout :\n";
	$utilisateurs = $db->getUtilisateurs();
	foreach ($utilisateurs as $utilisateur) {
		echo $utilisateur->getLogin() . "\n";
	}

	// Modifier les données d'un utilisateur existant
	$utilisateurToModify = $utilisateurs[0];
	$utilisateurToModify->setEmail('nouvelle_adresse@example.com');
	$db->updateUtilisateur($utilisateurToModify);

	// Afficher la liste des utilisateurs après la modification
	echo "\nListe des utilisateurs après modification :\n";
	$utilisateurs = $db->getUtilisateurs();
	foreach ($utilisateurs as $utilisateur) {
		echo $utilisateur->getEmail() . "\n";
	}

	// Supprimer un utilisateur
	$utilisateurToDelete = $utilisateurs[1];
	$db->suppUtilisateur($utilisateurToDelete);

	// Afficher la liste des utilisateurs après la suppression
	echo "\nListe des utilisateurs après suppression :\n";
	$utilisateurs = $db->getUtilisateurs();
	foreach ($utilisateurs as $utilisateur) {
		echo $utilisateur->getLogin() . "\n";
	}

	?>
