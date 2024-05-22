import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal.js';  

export default function Resume(){
	
	if(sessionStorage.getItem('droit') !== 'Admin' || sessionStorage.getItem('date') === null || sessionStorage.getItem('pourMatin') === null) window.location.href = '/';

	const [initialData , setInitialData ] = useState([]);
	const [filterData  , setFilterData  ] = useState([]);
	const [searchTerm  , setSearchTerm  ] = useState(''); // État pour stocker la valeur de recherche
	const [checked     , setChecked     ] = useState(true); // État pour stocker la valeur de la case à cocher



	
	// Récupérer les données du resume
	useEffect(() => {
		// Créer un objet FormData
		const formData = new FormData();
		formData.append('prod'     , 'prod'); // Signal pour un get spécifique dans le php
		formData.append('date'     , sessionStorage.getItem('date')     );
		formData.append('pourMatin', sessionStorage.getItem('pourMatin'));

		fetch(cheminPHP + "demande/GetDemandes.php", {
			method: 'POST',
			body: formData
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
		})
	}, []);

	

	// En-tête de la table
	const initialHeader = [
		{ id: 'id'       , name: 'NB Ligne'           , type:'number'  , required : true , editable : false, show : false                      },
		{ id: 'idprod'   , name: 'ID Produit'         , type:'number'  , required : true , editable : false, show : false                      },
		{ id: 'ref'      , name: 'Référence'          , type:'text'    , required : true , editable : false, show : true                       },
		{ id: 'libprod'  , name: 'Libellé'            , type:'text'    , required : true , editable : false, show : true                       },
		{ id: 'qa'       , name: 'Quantité demandé'   , type:'number'  , required : true , editable : false, show : true                       },
		{ id: 'valider'  , name: 'Préparer ?'         , type:'checkbox', required : true , editable : true , show : true , fastEditable : true },
	];


	// Fonction pour l'update
	const funUpdate = async (upItem) => {
		try {

			// $pdo->updateValide($_POST['idProd'], $_POST['date'], $_POST['pourMatin'], $_POST['valide']);

			const formData = new FormData();
			formData.append('idProd'   , parseInt(upItem.idprod )           );
			formData.append('date'     , sessionStorage.getItem('date')     );
			formData.append('pourMatin', sessionStorage.getItem('pourMatin'));

			if(upItem.valider) formData.append('valide', 1);
			else               formData.append('valide', 0);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "demande/ModificationDemande.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);

			// Récupérer les nouvelles données du resume après l'insertion réussie
			const newData = await fetchResumeData();
			setInitialData(newData);
			setFilterData(newData);

			return data === ""; // Retourne true si la suppression a réussi, sinon false
		} catch (error) {
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	};


	// Fonction pour récupérer les données des produits
	const fetchResumeData = async () => {

		try {
			
			// Créer un objet FormData
			const formData = new FormData();
			formData.append('prod'     , 'prod'); // Signal pour un get spécifique dans le php
			formData.append('date'     , sessionStorage.getItem('date')     );
			formData.append('pourMatin', sessionStorage.getItem('pourMatin'));

			const response = await fetch(cheminPHP + "demande/GetDemandes.php", {
				method: 'POST',
				body : formData
			});

			if (!response.ok) {
				throw new Error('Erreur de réseau lors de la récupération des données des utilisateurs.');
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




	// Fonction pour afficher les erreurs
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

	const handleChange   = (e) => {setSearchTerm( e.target.value);};
	const handleCbChange = (e) => {setChecked(e.target.checked);};

	const applyFilter = (data, value, checked) => {
		const filteredData = data.filter((element) => {
				// Parcourir les clés de l'en-tête initial
				for (const key of initialHeader) {
					// Vérifier si la clé doit être affichée et si la valeur de l'élément correspond à la valeur de recherche
					if (key.show ) {
						// Vérifier si la valeur de l'élément correspond à la valeur de recherche
						console.log(element)
						console.log("checked : ", checked)
						console.log("valider : ", element.valider)
						if ((element[key.id] +'').toUpperCase().includes(value.toUpperCase()) && (checked !== element.valider || !element.valider)) {
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
	}, [searchTerm, initialData, checked]);




	//Création du tableau
	return (
	<div className="col-sm-12">
	
		<h1 className='titre mt-1'>Resume des produits demande</h1>

		<div className="grpRecherche mt-4 d-flex align-items-center">
			{/* barre de recherche */}
			<div className="col-sm-3">
				<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={handleChange} />
			</div>

			{/* Bouton checkbox avec style CSS pour la marge gauche */}
			<div className="form-check" style={{ marginLeft: '10em' }}>
				<input type='checkbox' className="check form-check-input border-secondary" id="afficherDemandes" checked={checked} onChange={handleCbChange}/>
				<label className="form-check-label" htmlFor="afficherDemandes">Afficher seulement les demandes non validé</label>
			</div>
		</div>



		<Table 
			header={initialHeader} 
			data={filterData} 
			funUpdate={funUpdate}
			keyGrayWhenFalse = '' 
		/>
	</div>
	);
}