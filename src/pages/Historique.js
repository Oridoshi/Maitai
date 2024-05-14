import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal.js';

export default function Historique(){
	
	if(sessionStorage.getItem('droit') !== 'Admin') window.location.href = '/';


	const [initialData  , setInitialData  ] = useState([]);
	const [filterData   , setFilterData   ] = useState([]);
	const [initialHeader, setInitialHeader] = useState([]);
	const [type         , setType         ] = useState('Ticket');
	
	// Récupérer l'ID de l'utilisateur au quelle on veut afficher les historiques
	// console.log(sessionStorage.getItem('idCli'));
	const idCli = parseInt(sessionStorage.getItem('idCli'));

	
	// Récupérer les données des produits
	useEffect(() => {
		// Créer un objet FormData
		const formData = new FormData();
		console.log(idCli);
		formData.append('idcli', idCli);

		fetch(cheminPHP + "historique/GetHistoriquesClientTicket.php", {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Erreur de réseau !');
			}
			// console.log(response.text());
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
	}, [idCli]);

	const funGetFile = async (item) => {
		try {
			const formData = new FormData();
			formData.append('idhist', parseInt(item.idhis));

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "historique/GetFilesIdHist.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			// console.log(await response.text());
			// Convertir la réponse en blob
			const blob = await response.blob();
			
			// Créer une URL pour le blob
			const url = URL.createObjectURL(blob);

			// Créer un lien <a> pour télécharger le fichier
			const link = document.createElement('a');
			link.href = url;
			link.download = item.chemin; // Spécifiez le nom de fichier souhaité ici

			// Ajouter le lien à la page
			document.body.appendChild(link);

			// Simuler le clic sur le lien pour déclencher le téléchargement
			link.click();

			// Supprimer le lien de la page une fois le téléchargement terminé
			document.body.removeChild(link);

			return true;
		} catch (error) {
				console.log(error);
				return false; // Retourne false en cas d'erreur
		}
	};

	/*
		idHis  SERIAL       PRIMARY KEY,
		date   DATE         DEFAULT CURRENT_DATE NOT NULL,
		chemin VARCHAR(255) NOT NULL,
		type   VARCHAR(6)   NOT NULL CHECK (type IN ('TICKET', 'SECU')),
		idCli  INTEGER      NOT NULL REFERENCES Client(idCli)
	*/
	// En-tête de la table
	useEffect(() => {
		setInitialHeader([
			{ id: 'id'     , name: 'NB Ligne'           , type:'number'  , required : true, editable : false, show : false},
			{ id: 'idHis'  , name: 'ID de l\'historique', type:'number'  , required : true, editable : false, show : false},
			{ id: 'idCli'  , name: 'ID du client'       , type:'number'  , required : true, editable : false, show : false},
			{ id: 'date'   , name: 'Date'               , type:'date'    , required : true, editable : true , show : true },
			{ id: 'chemin' , name: 'Nom du fichier'     , type:'text'    , required : true, editable : true , show : true },
			{ id: 'type'   , name: 'Type'               , type:'text'    , required : true, editable : true , show : true },
			// { id: 'valide', name: 'Fiche valide'       , type:'checkbox', required : true, editable : true , show : true, fastEditable : true },
			{ id: 'btnGet' , name: 'Télécharger'        , type:'button'  , required : true, editable : false, show : true, function : funGetFile, btn : 'Export (CSV)', className:'btnExport'}
		]);
	}, []);


	// Fonction pour récupérer les données des produits
	const fetchHistoriqueData = async () => {
		const formData = new FormData();
		formData.append('idcli', idCli);

		if(type === 'Ticket') {
			fetch(cheminPHP + "historique/GetHistoriquesClientTicket.php", {
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
			});
		} else {
			fetch(cheminPHP + "historique/GetHistoriquesClientSecu.php", {
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
			});
		}
	};

	const funDelete = async (item) => {

		console.log(item)
		if(item.valide === true || item.valide === 1) return false;

		try {
			const formData = new FormData();
			formData.append('idhist', parseInt(item.idhis));

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "historique/SuppressionHistorique.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);

			// Récupérer les nouvelles données des produits après la suppression réussie
			await fetchHistoriqueData();

			return data === ""; // Retourne true si la suppression a réussi, sinon false
		} catch (error) {
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	};

	const funUpdate = async (item) => {
		if(item.valide === false) return false;

		const formData = new FormData();
		formData.append('idhist', parseInt(item.idhis));

		const requestOptions = {
			method: 'POST',
			body: formData
		};

		const response = await fetch(cheminPHP + "historique/ModificationHistorique.php", requestOptions);

		if (!response.ok) {
			throw new Error('Une erreur s\'est produite.');
		}

		await fetchHistoriqueData();

		return true;
	};
			

	// Fonction pour afficher les erreurs
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
			if (data !== "")
				alert(data.replace('<br>', ''));
		}
	}

	const handleChange   = (e) => {filter( e.target.value);};


	function filter (value)
	{
		// Filtrer les données en fonction de la valeur de recherche
		const filteredData = initialData.filter((element) => {

			if (typeof value === 'boolean')
			{
				if(element.present === value || element.present) return true;
				else                          return false;
			}
			else
			{
				// Parcourir les clés de l'en-tête initial
				for (const key of initialHeader) {
					// Vérifier si la clé doit être affichée et si la valeur de l'élément correspond à la valeur de recherche
					if (key.show) {
						// Vérifier si la valeur de l'élément correspond à la valeur de recherche
						if ((element[key.id] +'').toUpperCase().includes(value.toUpperCase())) {
							return true; // Si correspondance, conserver cet élément
						}
					}
				}
				return false; // Si aucune correspondance, exclure cet élément
			}
		});

		// Mettre à jour les données filtrées
		setFilterData(filteredData);
	}

	const affichageAutreFiche = async () => {
		document.getElementById('btnChangerAffichage').innerHTML = 'Afficher fiche ' + type;
		if(type === 'Ticket') {
			setType('Secu');

			setInitialHeader([
				{ id: 'id'     , name: 'NB Ligne'           , type:'number'  , required : true, editable : false, show : false},
				{ id: 'idHis'  , name: 'ID de l\'historique', type:'number'  , required : true, editable : false, show : false},
				{ id: 'idCli'  , name: 'ID du client'       , type:'number'  , required : true, editable : false, show : false},
				{ id: 'date'   , name: 'Date'               , type:'date'    , required : true, editable : false , show : true },
				{ id: 'chemin' , name: 'Nom du fichier'     , type:'text'    , required : true, editable : false , show : true },
				{ id: 'type'   , name: 'Type'               , type:'text'    , required : true, editable : false , show : true },
				{ id: 'valide' , name: 'Fiche valide'       , type:'checkbox', required : true, editable : true , show : true, fastEditable : true },
				{ id: 'btnGet' , name: 'Télécharger'        , type:'button'  , required : true, editable : false, show : true, function : funGetFile, btn : 'Export (CSV)', className:'btnExport'}
			]);

			const formData = new FormData();
			formData.append('idcli', idCli);

			fetch(cheminPHP + "historique/GetHistoriquesClientSecu.php", {
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
			});
		} else {
			setType('Ticket');

			setInitialHeader([
				{ id: 'id'     , name: 'NB Ligne'           , type:'number'  , required : true, editable : false, show : false},
				{ id: 'idHis'  , name: 'ID de l\'historique', type:'number'  , required : true, editable : false, show : false},
				{ id: 'idCli'  , name: 'ID du client'       , type:'number'  , required : true, editable : false, show : false},
				{ id: 'date'   , name: 'Date'               , type:'date'    , required : true, editable : true , show : true },
				{ id: 'chemin' , name: 'Nom du fichier'     , type:'text'    , required : true, editable : true , show : true },
				{ id: 'type'   , name: 'Type'               , type:'text'    , required : true, editable : true , show : true },
				// { id: 'valide', name: 'Fiche valide'       , type:'checkbox', required : true, editable : true , show : true, fastEditable : true },
				{ id: 'btnGet' , name: 'Télécharger'        , type:'button'  , required : true, editable : false, show : true, function : funGetFile, btn : 'Export (CSV)', className:'btnExport'}
			]);

			const formData = new FormData();
			formData.append('idcli', idCli);

			fetch(cheminPHP + "historique/GetHistoriquesClientTicket.php", {
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
			});
		}
		// console.log(type);
	}

	//Création du tableau
	return (
	<div className="col-sm-12">
	
		<h1 className='titre mt-1'>Gestion des historiques - {sessionStorage.getItem('nomClub')}</h1>

		<div className="grpRecherche mt-4 d-flex align-items-center">
			{/* barre de recherche */}
			<div className="col-sm-3">
				<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={handleChange} />
			</div>
			{/* Bouton décoché */}
			<button id='btnChangerAffichage' className='btnSauvegarder btn-primary btn mx-2' onClick={affichageAutreFiche}>Afficher fiche SECU</button>
		</div>


		<Table 
			header={initialHeader} 
			data={filterData}
			funDelete={type === 'Ticket' ? undefined : funDelete}
			funUpdate={type === 'Ticket' ? undefined : funUpdate}
			keyGrayWhenFalse='present'
		/>

	</div>
	);
}