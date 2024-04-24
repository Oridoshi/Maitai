import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';

function Utilisateur() {

	const [initialData , setInitialData ] = useState([]);
	const [initialDroit, setInitialDroit] = useState([]);
	const [libDroit    , setLibDroit    ] = useState([]);




	useEffect(() => {
		fetch("http://localhost/Maitai/php/other/utilisateur/GetUtilisateurs.php", {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8' // Spécifiez l'encodage ici
			},
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Erreur de réseau !');
			}
			return response.json();
		})
		.then(data => {
			const newData = data.map((item, index) => ({
				...item,
				id: index + 1
			}));
			setInitialData(newData);
		})
		.catch(error => {
			console.error('Erreur :', error);
		});
	}, []);

	useEffect(() => {
		fetch("http://localhost/Maitai/php/other/GetDroits.php", {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8' // Spécifiez l'encodage ici
			},
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Erreur de réseau !');
			}
			return response.json();
		})
		.then(data => {
			const newLibDroit = data.map(item => item.libdroit);
			const droit = [...data];
			setLibDroit(newLibDroit);
			setInitialDroit(droit);
		})
		.catch(error => {
			console.error('Erreur :', error);
		});
	}, []);





	// En-tête de la table
	const initialHeader = [
		{ id: 'id'      , name: 'NB Ligne'     , type:'number'  , required : true , editable : false, show : false },
		{ id: 'login'   , name: 'Login'        , type:'text'    , required : true , editable : true , show : true  },
		{ id: 'mdp'     , name: 'Mots de passe', type:'text'    , required : true , editable : false, show : false },
		{ id: 'email'   , name: 'Adresse email', type:'email'   , required : false, editable : true , show : true  },
		{ id: 'libdroit', name: 'Droit'        , type:'list'    , required : true , editable : true , show : true  , options:libDroit},
		{ id: 'actif'   , name: 'Actif'        , type:'checkbox', required : true , editable : true , show : true  },
	];







	// Fonction pour la suppression
	const funDelete = async (suppItem) => {
		try {
			const formData = new FormData();
			formData.append('login', suppItem.login);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch("http://localhost/Maitai/php/other/utilisateur/SuppressionUtilisateur.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);
			return data === ""; // Retourne true si la suppression a réussi, sinon false
		} catch (error) {
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	};


	function getIdDroit(libDroit) {

		var id = -1;

		initialDroit.forEach(droit => {
			if(droit.libdroit === libDroit)
				id = droit.iddroit;
		});
		
		return id;
	}


	// Fonction pour l'insertion
	const funInsert = async (nouvItem) => {
		try {

			const formData = new FormData();
			formData.append('login', nouvItem.login);
			formData.append('email', nouvItem.email);

			if (nouvItem.actif) formData.append('actif', 1);
			else                formData.append('actif', 0);

			formData.append('droit', getIdDroit(nouvItem.libdroit));


			/*
				$login = $_POST['login'];
				$email = $_POST['email'];
				$actif = $_POST['actif'];
				$droit = $_POST['droit'];
			 */

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch("http://localhost/Maitai/php/other/utilisateur/CreationUtilisateur.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);
			return data === ""; // Retourne true si la suppression a réussi, sinon false
		} catch (error) {
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	};


	// Fonction pour l'update
	const funUpdate = async (nouvItem, oldItem) => {
		try {

			const formData = new FormData();
			formData.append('prevLogin', oldItem.login );
			formData.append('login'    , nouvItem.login);
			formData.append('mdp'      , nouvItem.mdp  );
			formData.append('email'    , nouvItem.email);
			if (nouvItem.actif) formData.append('actif', 1);
			else                formData.append('actif', 0);
			formData.append('iddroit'  , getIdDroit(nouvItem.libdroit));


			/*
				$prevLogin = $_POST['prevLogin'];
				$login     = $_POST['login'];
				$mdp       = $_POST['mdp'];
				$email     = $_POST['email'];
				$actif     = isset($_POST['actif'])?true:false;
				$iddroit   = $_POST['iddroit'];
			 */

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch("http://localhost/Maitai/php/other/utilisateur/ModificationUtilisateur.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);
			return data === ""; // Retourne true si la suppression a réussi, sinon false
		} catch (error) {
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	};


	function afficherError(data) {
		const regex = /SQLSTATE\[(\d+)\].+?(\d+)(.+?) in C:\\xampp/g; // Expression régulière pour capturer le code d'erreur et le texte jusqu'à "in C:\\xampp..."
		const match = regex.exec(data);

		if (match) {
			const sqlState = match[1]; // État SQL
			const errorCode = match[2]; // Code d'erreur
			const errorMessageText = match[3].trim(); // Texte du message d'erreur

			console.log("Refuse de la base de donnée, raison : ", errorMessageText, "( SQL STATE[", sqlState,"] error code :", errorCode);
			alert(errorMessageText);
			
		} else {
			console.log("Aucune correspondance trouvée.");
		}
	}



	//Création du tableau
	return (
	<div className="App">
	<Table 
		header={initialHeader} 
		data={initialData} 
		funInsert={funInsert} 
		funUpdate={funUpdate} 
		funDelete={funDelete} 
	/>
	</div>
	);
}

export default Utilisateur;