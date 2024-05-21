import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal.js';  

export default function Resume(){
	if(sessionStorage.getItem('droit') !== 'Admin' || sessionStorage.getItem('date') === null || sessionStorage.getItem('pourMatin') === null) window.location.href = '/';

	const [initialData , setInitialData ] = useState([]);
	const [filterData  , setFilterData  ] = useState([]);
	const [searchTerm  , setSearchTerm  ] = useState(''); // État pour stocker la valeur de recherche



	// Récupérer les données des demandes
	useEffect(() => {
		fetch(cheminPHP + "produit/GetProduit.php", {
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


			const formData = new FormData();
			formData.append('idProd'   , parseInt(upItem.idprod ));
			formData.append('ref'      , upItem.ref);
			formData.append('libProd'  , upItem.libprod);
			formData.append('prixUni'  , upItem.prixuni===""?"":parseFloat(upItem.prixuni));
			formData.append('categorie', upItem.categorie);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "produit/ModificationProduit.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);

			// Récupérer les nouvelles données des produits après l'insertion réussie
			const newData = await fetchProduitData();
			setInitialData(newData);
			setFilterData(newData);
			await fetchCategData();

			return data === ""; // Retourne true si la suppression a réussi, sinon false
		} catch (error) {
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	};


	// Fonction pour récupérer les données des produits
	const fetchProduitData = async () => {
		try {
			const response = await fetch(cheminPHP + "produit/GetProduit.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
			});

			if (!response.ok) {
				throw new Error('Erreur de réseau lors de la récupération des données des produits.');
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



	// Fonction pour recupérer les données pour les datalist
	const fetchCategData = async () => {
		try {
			const response = await fetch(cheminPHP + "produit/GetCateg.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
			});

			if (!response.ok) {
				throw new Error('Erreur de réseau lors de la récupération des données des produits.');
			}

			const data = await response.json();
			let lstTemp = [];
			data.forEach(element => {
				lstTemp.push(element.categorie);
			});
			setDatalistCateg(lstTemp);
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

	const applyFilter = (data, value) => {
		const filteredData = data.filter((element) => {
			for (const key of initialHeader) {
				if (key.show && (element[key.id] + '').toUpperCase().includes(value.toUpperCase())) {
					return true;
				}
			}
			return false;
		});
		setFilterData(filteredData);
	}

	useEffect(() => {
		applyFilter(initialData, searchTerm);
	}, [searchTerm, initialData]);




	//Création du tableau
	return (
	<div className="col-sm-12">
	
		<h1 className='titre mt-1'>Resume des produits demande</h1>

		<div className="grpRecherche mt-4 d-flex align-items-center">
			{/* barre de recherche */}
			<div className="col-sm-3">
				<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={handleChange} />
			</div>
		</div>



		<Table 
			header={initialHeader} 
			data={filterData} 
			funUpdate={funUpdate} 
			keyGrayWhenFalse = 'valider'
		/>
	</div>
	);
}