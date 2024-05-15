import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal';

function Utilisateur() {
	if (sessionStorage.getItem('droit') !== 'Admin') window.location.href = '/';

	const [initialData, setInitialData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [initialDroit, setInitialDroit] = useState([]);
	const [libDroit, setLibDroit] = useState([]);
	const [searchTerm, setSearchTerm] = useState(''); // État pour stocker la valeur de recherche

	useEffect(() => {
		fetch(cheminPHP + "utilisateur/GetUtilisateurs.php", {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8'
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
				setFilterData(newData);
			})
			.catch(error => {
				console.error('Erreur :', error);
			});
	}, []);

	useEffect(() => {
		fetch(cheminPHP + "GetDroits.php", {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8'
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

	const fetchUtilisateurData = async () => {
		try {
			const response = await fetch(cheminPHP + "utilisateur/GetUtilisateurs.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
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

	const initialHeader = [
		{ id: 'id', name: 'NB Ligne', type: 'number', required: true, editable: false, show: false },
		{ id: 'login', name: 'Login', type: 'text', required: true, editable: true, show: true, maxLength: 30 },
		{ id: 'mdp', name: 'Mots de passe', type: 'text', required: true, editable: false, show: false },
		{ id: 'email', name: 'Adresse email', type: 'email', required: true, editable: true, show: true, maxLength: 60 },
		{ id: 'libdroit', name: 'Droit', type: 'list', required: true, editable: true, show: true, options: libDroit },
		{ id: 'actif', name: 'Actif', type: 'checkbox', required: true, editable: true, show: true },
	];

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
			return data === ""; 
		} catch (error) {
			console.log(error);
			return false; 
		}
	};

	function getIdDroit(libDroit) {
		var id = -1;

		initialDroit.forEach(droit => {
			if (droit.libdroit === libDroit)
				id = droit.iddroit;
		});

		return id;
	}

	const funInsert = async (nouvItem) => {
		try {
			const formData = new FormData();
			formData.append('login', nouvItem.login);
			formData.append('email', nouvItem.email);
			formData.append('actif', nouvItem.actif ? 1 : 0);
			formData.append('droit', getIdDroit(nouvItem.libdroit));

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

			const newData = await fetchUtilisateurData();
			setInitialData(newData);
			setFilterData(newData);

			return data === "";
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const funUpdate = async (nouvItem, oldItem) => {
		try {
			const formData = new FormData();
			formData.append('prevLogin', oldItem.login);
			formData.append('login', nouvItem.login);
			formData.append('mdp', nouvItem.mdp);
			formData.append('email', nouvItem.email);
			formData.append('actif', nouvItem.actif ? 1 : 0);
			formData.append('iddroit', getIdDroit(nouvItem.libdroit));

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

			const newData = await fetchUtilisateurData();
			setInitialData(newData);
			setFilterData(newData);

			return data === "";
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	function afficherError(data) {
		const regex = /SQLSTATE\[(\d+)\].+?(\d+)(.+?) in C:\\xampp/g;
		const match = regex.exec(data);

		if (match) {
			console.log("Erreur SQL connue renvoyé. Retour du fetch ", data);
			const sqlState = match[1];
			const errorCode = match[2];
			const errorMessageText = match[3].trim();

			console.log("Refuse de la base de donnée, raison : ", errorMessageText, "( SQL STATE[", sqlState, "] error code :", errorCode);
			alert(errorMessageText);
		} else {
			console.log("Aucune erreur connue renvoyé. Retour du fetch ", data);
		}
	}

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

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
	};

	useEffect(() => {
		applyFilter(initialData, searchTerm);
	}, [initialData, searchTerm]);

	return (
		<div className="col-sm-12 h-100">
			<h1 className='titre mt-1'>Gestion des utilisateurs </h1>
			<div className="grpRecherche mt-4 d-flex align-items-center">
				<div className="col-sm-3">
					<input id="searchbar" className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={handleChange} />
				</div>
			</div>
			<div className='h-25'>
				<Table
					header={initialHeader}
					data={filterData}
					funInsert={funInsert}
					funUpdate={funUpdate}
					funDelete={funDelete}
					keyGrayWhenFalse='actif'
				/>
			</div>
		</div>
	);
}

export default Utilisateur;
