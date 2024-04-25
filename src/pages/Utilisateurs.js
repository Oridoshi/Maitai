import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal';

function Utilisateur() {


	const [initialData , setInitialData ] = useState([]);
	const [filterData  , setFilterData  ] = useState([]);
	const [initialDroit, setInitialDroit] = useState([]);
	const [libDroit    , setLibDroit    ] = useState([]);




	useEffect(() => {
		fetch(cheminPHP + "utilisateur/GetUtilisateurs.php", {
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

	useEffect(() => {
		fetch(cheminPHP + "GetDroits.php", {
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

			const response = await fetch(cheminPHP + "utilisateur/SuppressionUtilisateur.php", requestOptions);

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

			const response = await fetch(cheminPHP + "utilisateur/CreationUtilisateur.php", requestOptions);

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

			const response = await fetch(cheminPHP + "utilisateur/ModificationUtilisateur.php", requestOptions);

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
			console.log("Aucune erreur connue renvoyé. Retour du fetch ", data);
		}
	}


	// FILTRES
	const handleChange   = (e) => {filter( e.target.value);};

	function filter (value)
	{
		console.log(value)
		// Filtrer les données en fonction de la valeur de recherche
		const filteredData = initialData.filter((element) => {
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
		});

		// Mettre à jour les données filtrées
		setFilterData(filteredData);
	}



	//Création du tableau
	return (
		<div className="col-sm-12">
	
			<h1 className='titre mt-1'>Gestion des utilisateurs </h1>

			<div className="grpRecherche mt-4 d-flex align-items-center">
				{/* barre de recherche */}
				<div className="col-sm-3">
					<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={handleChange} />
				</div>
			</div>

			<Table 
				header={initialHeader} 
				data={filterData} 
				funInsert={funInsert} 
				funUpdate={funUpdate} 
				funDelete={funDelete} 
			/>
		</div>
	);
}

export default Utilisateur;