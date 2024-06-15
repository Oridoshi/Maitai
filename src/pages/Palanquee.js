import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal.js';  

export default function Resume(){
	
	if(sessionStorage.getItem('droit') !== 'Admin' || sessionStorage.getItem('date') === null || sessionStorage.getItem('pourMatin') === null) window.location.href = '/';

	const [initialData , setInitialData ] = useState([]);
	const [filterData  , setFilterData  ] = useState([]);
	const [searchTerm  , setSearchTerm  ] = useState(''); // État pour stocker la valeur de recherche
	const [checked     , setChecked     ] = useState(true); // État pour stocker la valeur de la case à cocher

	// Rafraîchir la page toutes les minutes
	useEffect(() => {
		const interval = setInterval(() => {
			window.location.reload();
		}, 60000); // 60000 milliseconds = 1 minute

		return () => {
			clearInterval(interval);
		};
	}, []);
	

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
				temps: item => {
					const tabHeure = item.temps.split(':');
					const heure = (tabHeure[0] * 60 + tabHeure[1] + item.duree)/60
					const minutes = (heure - Math.floor(heure)) * 60;
					return Math.floor(heure) + 'h' + (minutes < 10 ? '0' + minutes : minutes);
				}
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
		{ id: 'id'          , name: 'NB Ligne'           , type:'number'  , required : true , editable : false, show : false                      },
		{ id: 'idpalanquee' , name: 'ID Produit'         , type:'number'  , required : true , editable : false, show : false                      },
		{ id: 'nomPlongeurs', name: 'Nom des plongeurs'  , type:'text'    , required : true , editable : false, show : true                       },
		{ id: 'hd'          , name: 'Heurs d\'entrée'    , type:'text'    , required : true , editable : false, show : true                       },
		{ id: 'duree'       , name: 'Durée prévue'       , type:'number'  , required : true , editable : false, show : true                           },
		{ id: 'temps'       , name: 'Sortie Prévue'      , type:'number'  , required : true , editable : false, show : true                           }
	];

	const handleChange   = (e) => {setSearchTerm( e.target.value);};
	const handleCbChange = (e) => {setChecked(e.target.checked);};

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
		applyFilter(initialData, searchTerm, checked);
	}, [searchTerm, initialData, checked]);




	//Création du tableau
	return (
	<div className="col-sm-12">
	
		<h1 className='titre mt-1'>Resume des produits demandés pour le {sessionStorage.getItem('pourMatin') == 1 ? 'matin' : 'soir'} du {sessionStorage.getItem('date')}</h1>

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
			keyGrayWhenFalse = '' 
		/>
	</div>
	);
}