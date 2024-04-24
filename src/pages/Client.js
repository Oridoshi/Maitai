import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';

function Client() {

	const [initialData , setInitialData ] = useState([]);




	useEffect(() => {
		fetch("http://localhost/Maitai/src/php/other/client/GetClients.php", {
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

			console.log(data);

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





	// En-tête de la table
	const initialHeader = [
		{ id: 'id'       , name: 'NB Ligne'             , type:'number'  , required : true , editable : false, show : false },
		{ id: 'nomclub'  , name: 'Nom du Club'          , type:'text'    , required : true , editable : true , show : true  },
		{ id: 'telephone', name: 'Numero de téléphone'  , type:'number'  , required : true , editable : true , show : true  },
		{ id: 'email'    , name: 'Email'                , type:'email'   , required : true , editable : true , show : true  },
		{ id: 'present'  , name: 'Présent sur le site ?', type:'checkbox', required : true , editable : true , show : true  },
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

			const response = await fetch("http://localhost/Maitai/src/php/other/client/SuppressionClient.php", requestOptions);

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


	// Fonction pour l'insertion
	const funInsert = async (nouvItem) => {
		try {

			const formData = new FormData();
			formData.append('nomClub'  , nouvItem.nomclub);
			formData.append('email'    , nouvItem.email);
			formData.append('telephone', nouvItem.telephone);

			if (nouvItem.present) formData.append('present', 1);
			else                  formData.append('present', 0);


			/*
				$client->setNomClub  ($_POST['nomClub']);
				$client->setEmail    ($_POST['email']);
				$client->setTelephone($_POST['telephone']);
				$client->setPresent  ($_POST['present']);
			 */

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch("http://localhost/Maitai/src/php/other/client/CreationClient.php", requestOptions);

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
			formData.append('prevNomClub', oldItem.nomclub   );
			formData.append('nomClub'    , nouvItem.nomclub  );
			formData.append('email'      , nouvItem.email    );
			formData.append('telephone'  , nouvItem.telephone);

			if (nouvItem.present) formData.append('present', 1);
			else                  formData.append('present', 0);

			/*
				$prevNomClub = $_POST['prevNomClub'];
				$nomClub = $_POST['nomClub'];
				$email = $_POST['email'];
				$telephone = $_POST['telephone'];
				$present = $_POST['present'];
			 */

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch("http://localhost/Maitai/src/php/other/client/ModificationClient.php", requestOptions);

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
			console.log(data);
		}
	}



	//Création du tableau
	return (
	<div className="col-sm-12">
	
		<h1 className='titre'>Gestion des clients </h1>

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

export default Client;