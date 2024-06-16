import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal.js';  

export default function Resume(){
	
	if(sessionStorage.getItem('droit') !== 'Admin') window.location.href = '/';

	const [initialData , setInitialData ] = useState([]);
	const [filterData  , setFilterData  ] = useState([]);
	const [searchTerm  , setSearchTerm  ] = useState(''); // État pour stocker la valeur de recherche

	// Rafraîchir la page toutes les minutes
	useEffect(() => {
		const interval = setInterval(() => {
			window.location.reload();
		}, 60000); // 60000 milliseconds = 1 minute

		return () => {
			clearInterval(interval);
		};
	}, []);
	
	function dureePrev(item){
		const tabHeure = item.hd.split(':');
		const tempsEnSeconde = (parseInt(tabHeure[0]) * 3600) + (parseInt(tabHeure[1]) * 60) + parseInt(item.duree * 60);
		const heure = Math.floor(tempsEnSeconde / 3600);
		const minute = Math.floor((tempsEnSeconde - (heure * 3600)) / 60);
		const minuteFormattee = minute < 10 ? '0' + minute : minute;
		return heure + ':' + minuteFormattee;
	}

	let tropDeTemps = false;

	function tempsPlongee(item){
		const tabHeure = item.hd.split(':');
		const maintenant = new Date();
		const tempsEnSeconde = (maintenant.getHours() * 3600 + maintenant.getMinutes() * 60) - (parseInt(tabHeure[0]) * 3600 + parseInt(tabHeure[1]) * 60);
		const duree = Math.floor(tempsEnSeconde / 60);

		if(duree > item.duree)
		{
			tropDeTemps = true;
		}
		else
		{
			tropDeTemps = false;
		}

		return duree + " min";
	}

	function formatageNomPlongeurs(item){
		let nomPlongeurs = '';
		const tabPlongeurs = item.nomplongeurs.split(',');
		tabPlongeurs.forEach((plongeur, index) => {
			nomPlongeurs += plongeur + (index === tabPlongeurs.length - 1 ? '' : "<br>");
		});
		return nomPlongeurs;
	}

	// Récupérer les données du resume
	useEffect(() => {
		// Créer un objet FormData
		const formData = new FormData();
		formData.append('prod'     , 'prod'); // Signal pour un get spécifique dans le php
		formData.append('date'     , sessionStorage.getItem('date')     );
		formData.append('pourMatin', sessionStorage.getItem('pourMatin'));

		fetch(cheminPHP + "palanquee/GetPalanquees.php", {
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
				id: index + 1,
				nomplongeurs: formatageNomPlongeurs(item),
				duree: item.duree + " min",
				hs: dureePrev(item),
				plongee: tempsPlongee(item),
				class: tropDeTemps ? 'dangerPlongee' : ''
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
		{ id: 'id'          , name: 'NB Ligne'                    , type:'number'       , show : false},
		{ id: 'idpalanquee' , name: 'ID Produit'                  , type:'number'       , show : false},
		{ id: 'nomplongeurs', name: 'Nom des plongeurs'           , type:'txtInterprete', show : true },
		{ id: 'hd'          , name: 'Heure d\'entrée'             , type:'number'       , show : true },
		{ id: 'hs'          , name: 'Heure de sortie prévue'      , type:'number'       , show : true },
		{ id: 'duree'       , name: 'Durée prévue'                , type:'number'       , show : true },
		{ id: 'plongee'     , name: 'Durée de la plongée en cours', type:'number'       , show : true }
	];

	const handleChange   = (e) => {setSearchTerm( e.target.value);};

	const applyFilter = (data, value, checked) => {
		const filteredData = data.filter((element) => {
				// Parcourir les clés de l'en-tête initial
				for (const key of initialHeader) {
					// Vérifier si la clé doit être affichée et si la valeur de l'élément correspond à la valeur de recherche
					if (key.show ) {
						// Vérifier si la valeur de l'élément correspond à la valeur de recherche
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
		applyFilter(initialData, searchTerm);
	}, [searchTerm, initialData]);




	//Création du tableau
	return (
	<div className="col-sm-12">
	
		<h1 className='titre mt-1'>Palanquée en cours de plongée</h1>

		<div className="grpRecherche mt-4 d-flex align-items-center">
			{/* barre de recherche */}
			<div className="col-sm-3">
				<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={handleChange} />
			</div>
		</div>



		<Table 
			header={initialHeader} 
			data={filterData}
			keyGrayWhenFalse = '' 
		/>
	</div>
	);
}