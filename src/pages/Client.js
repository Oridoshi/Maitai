import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal.js';

function Client() {
	if(sessionStorage.getItem('droit') !== 'Admin' && sessionStorage.getItem('droit') !== 'Maitai') window.location.href = '/';

	const [initialData , setInitialData ] = useState([]);
	const [filterData  , setFilterData  ] = useState([]);
	const [searchTerm  , setSearchTerm  ] = useState(''); // État pour stocker la valeur de recherche
	const [checked     , setChecked     ] = useState(false); // État pour stocker la valeur de la case à cocher



	useEffect(() => {
		fetch(cheminPHP + "client/GetClients.php", {
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
			setFilterData (newData);
		})
		.catch(error => {
			console.error('Erreur :', error);
		});
	}, []);

	const funHisto = (item) => {
		sessionStorage.setItem('idUti', item.iduti);
		sessionStorage.setItem('nomClub', item.login);
		window.location.href = '/historique';
	};

	// En-tête de la table
	const initialHeader = [
		{ id: 'id'       , name: 'NB Ligne'             , type:'number'  , required : true , editable : false, show : false                     },
		{ id: 'login'    , name: 'Nom du Club'          , type:'login'   , required : true , editable : true , show : true, maxLength : 20      },
		{ id: 'telephone', name: 'Numero de téléphone'  , type:'tel'     , required : true , editable : true , show : true                      },
		{ id: 'email'    , name: 'Email'                , type:'email'   , required : true , editable : true , show : true, maxLength : 60      },
		{ id: 'btnHisto' , name: 'Historique'           , type:'button'  , required : true , editable : false, show : true, function : funHisto, btn : 'Historique', className:'btnSauvegarder'},
		{ id: 'present'  , name: 'Présent sur le site'  , type:'checkbox', required : true , editable : true , show : true, fastEditable : true },
	];

	// Fonction pour l'insertion
	const funInsert = async (nouvItem) => {
		try {
			const formData = new FormData();
			formData.append('login'  , nouvItem.login);
			formData.append('email'    , nouvItem.email);
			formData.append('tel', nouvItem.telephone);


			if (nouvItem.present) formData.append('present', 1);
			else                  formData.append('present', 0);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "client/CreationClient.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);

			// Récupérer les nouvelles données des clients après l'insertion réussie
			const newData = await fetchClientData();
			setInitialData(newData);
			setFilterData(newData);

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
			formData.append('prevLogin', oldItem.login   );
			formData.append('login'    , nouvItem.login  );
			formData.append('email'    , nouvItem.email    );
			formData.append('tel'      , nouvItem.telephone);

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

			const response = await fetch(cheminPHP + "client/ModificationClient.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);

			// Récupérer les nouvelles données des clients après l'insertion réussie
			const newData = await fetchClientData();
			setInitialData(newData);
			setFilterData(newData);

			return data === ""; // Retourne true si la suppression a réussi, sinon false
		} catch (error) {
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	};


	// Fonction pour récupérer les données des clients
	const fetchClientData = async () => {
		try {
			const response = await fetch(cheminPHP + "client/GetClients.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
			});

			if (!response.ok) {
				throw new Error('Erreur de réseau lors de la récupération des données des clients.');
			}

			const data = await response.json();
			return data.map((item, index) => ({
				...item,
				id: index + 1
			}));
		} catch (error) {
			console.error('Erreur :', error);
			return [];
		}
	};


	const presentFalseAll = async () => {
		try {
			const response = await fetch(cheminPHP + "client/DesactiverClients.php");

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			// Requête pour obtenir les données mises à jour après la désactivation de tous les clients
			const newDataResponse = await fetch(cheminPHP + "client/GetClients.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
			});

			if (!newDataResponse.ok) {
				throw new Error('Erreur lors de la récupération des données mises à jour.');
			}

			const newData = await newDataResponse.json();

			// Mettre à jour les données initiales et filtrées avec les nouvelles données
			const updatedData = newData.map((item, index) => ({
				...item,
				id: index + 1
			}));
			setInitialData(updatedData);
			setFilterData(updatedData);
			setChecked(false);
			document.getElementById('afficherClients').checked = false;
		} catch (error) {
			console.log(error);
		}
	};



	function afficherError(data) {
		const regex = /SQLSTATE\[(\d+)\].+?(\d+)(.+?) in/g; // Expression régulière pour capturer le code d'erreur et le texte jusqu'à "in C:\\xampp..."
		const match = regex.exec(data);

		if (match) {
			const sqlState = match[1]; // État SQL
			const errorCode = match[2]; // Code d'erreur
			const errorMessageText = match[3].trim(); // Texte du message d'erreur

			console.log("Refuse de la base de donnée, raison : ", errorMessageText, "( SQL STATE[", sqlState,"] error code :", errorCode);
			alert(errorMessageText);

		} else {
			if (data !== "")
				alert(data.replace('<br>', ''));
		}
	}




	const handleChange   = (e) => {setSearchTerm(e.target.value);};
	const handleCbChange = (e) => {setChecked(e.target.checked);};

	const applyFilter = (data, value, checked) => {
		const filteredData = data.filter((element) => {
				// Parcourir les clés de l'en-tête initial
				for (const key of initialHeader) {
					// Vérifier si la clé doit être affichée et si la valeur de l'élément correspond à la valeur de recherche
					if (key.show ) {
						// Vérifier si la valeur de l'élément correspond à la valeur de recherche
						if ((element[key.id] +'').toUpperCase().includes(value.toUpperCase()) && (element.present === checked || element.present)) {
							return true; // Si correspondance, conserver cet élément
						}
					}
				}
				return false; // Si aucune correspondance, exclure cet élément
		});
		setFilterData(filteredData);
	}


	useEffect(() => {
		applyFilter(initialData, searchTerm, checked);
	}, [initialData, searchTerm, checked]);


	//Création du tableau
	return (
	<div className="col-sm-12">

		<h1 className='titre mt-1'>Gestion des clients </h1>

		<div className="grpRecherche mt-4 d-flex align-items-center">
			{/* barre de recherche */}
			<div className="col-sm-3">
				<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={handleChange} />
			</div>

			{/* Bouton décoché */}
			<button className='btnSauvegarder btn-primary btn mx-2' onClick={presentFalseAll}>Tous décoché</button>

			{/* Bouton checkbox avec style CSS pour la marge gauche */}
			<div className="form-check" style={{ marginLeft: '10em' }}>
				<input type='checkbox' className="check form-check-input border-secondary" id="afficherClients" onChange={handleCbChange}/>
				<label className="txtcheck form-check-label" htmlFor="afficherClients">Afficher seulement les clients présents</label>
			</div>
		</div>



		<Table
			header={initialHeader}
			data={filterData}
			funInsert={funInsert}
			funUpdate={funUpdate}
			keyGrayWhenFalse = 'present'
		/>
	</div>
	);
}

export default Client;