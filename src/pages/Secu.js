import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal.js';

function Secu() {
	if(sessionStorage.getItem('droit') !== 'Client') window.location.href = '/';

	const [initialData , setInitialData ] = useState([]);
	const [idCli       , setIdClient    ] = useState();




	useEffect(() => {

		// Récupérer le login depuis le sessionStorage
		const login = sessionStorage.getItem('login');

		// Créer un objet FormData pour envoyer les données
		const formData = new FormData();
		formData.append('login', login); // Ajouter le login au FormData

		// Envoyer la requête au script PHP pour obtenir l'ID du client
		fetch(cheminPHP + "client/GetIdClient.php", {
			method: 'POST',
			body: formData, // Envoyer les données incluant le login
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Erreur de réseau !');
			}
			return response.text();
		})
		.then(idCli => {

			// Maintenant que nous avons l'ID du client, nous pouvons envoyer la deuxième requête
			formData.append('idcli', parseInt(idCli)); // Ajouter l'ID du client au FormData

			// Envoyer la deuxième requête pour obtenir les historiques du client
			return fetch(cheminPHP + "historique/GetHistoriquesClientSecu.php", {
				method: 'POST',
				body: formData,
			});
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Erreur de réseau !');
			}
			return response.json();
		})
		.then(data => {
			
			const newData = data.filter(item => !item.valide).map((item, index) => {
				const matchResult = item.chemin.match(/\d{1,}_\d{4}-\d{2}-\d{2}_\w+_(.+)_FICHESECU\.xlsx/);
				const nouveauChemin = matchResult ? matchResult[1].replace(/[-\s]+/g, ' ') : item.chemin;
				
				return {
					...item,
					chemin: nouveauChemin,
					id: index + 1
				};
			});

			setInitialData(newData);
		})
		.catch(error => {
			console.error('Erreur :', error);
		});

	}, []);


	const modifFiche = (item) => {
		sessionStorage.setItem('idHis', item.idhis);
		sessionStorage.setItem('nomFic', item.chemin);
		window.location.href = '/fiche-de-securite';
	};


	// En-tête de la table
	const initialHeader = [
		{ id: 'id'       , name: 'NB Ligne'             , type:'number'  , required : true , editable : false, show : false                     },
		{ id: 'chemin'   , name: 'Nom du fichier'       , type:'text'    , required : true , editable : false, show : true                      },
		{ id: 'date'     , name: 'Date de création'     , type:'text'    , required : true , editable : false, show : true                      },
		{ id: 'btnHisto' , name: 'Historique'           , type:'button'  , required : true , editable : false, show : true, function : modifFiche, btn : 'Modifier', className:'btnSauvegarder'},
	];



	//Création du tableau
	return (
	<div className="col-sm-12">

		<h1 className='titre mt-1'>Fiches de securité</h1>

		<Table
			header={initialHeader}
			data={initialData}
			keyGrayWhenFalse={''}
		/>

		<div className="mx-4">
			<button className="btn btn-primary btnSauvegarder" onClick={() => {sessionStorage.removeItem('idHis');sessionStorage.removeItem('nomFic'); window.location.href = '/fiche-de-securite'}}>Créer une nouvelle fiche</button>
		</div>
	</div>
	);
}

export default Secu;