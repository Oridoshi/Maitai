import React, { useState, useEffect } from 'react'; // Importez useState ici
import Table from '../components/Table';
import { cheminPHP } from '../components/VarGlobal.js';

export default function Produits(){
	if(sessionStorage.getItem('droit') !== 'Admin' && sessionStorage.getItem('droit') !== 'Maitai') window.location.href = '/';

	const [initialData , setInitialData ] = useState([]);
	const [filterData  , setFilterData  ] = useState([]);
	const [datalistCateg,setDatalistCateg] = useState([]);
	const [searchTerm  , setSearchTerm  ] = useState(''); // État pour stocker la valeur de recherche
	const [checkedM    , setCheckedMatin] = useState(false); // État pour stocker la valeur de la case à cocher
	const [checkedS    , setCheckedSoir ] = useState(false); // État pour stocker la valeur de la case à cocher



	// Récupérer les données des produits
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
			  id: index + 1,
			}));
			setInitialData(newData);
			setFilterData (newData);
		})
		.catch(error => {
			console.error('Erreur :', error);
		})
	}, []);


	/*
		idprod    INTEGER       PRIMARY KEY,
		libprod   VARCHAR(255)  NOT NULL   ,
		prixuni   DECIMAL(12,2)            ,
		categorie VARCHAR(30)   NOT NULL
	*/

	//Génération du tableau pour la datalist
	useEffect(() => {
			fetch(cheminPHP + "produit/GetCateg.php", {
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
				let lstTemp = [];
				data.forEach(element => {
					lstTemp.push(element.categorie);
				});
				setDatalistCateg(lstTemp);
			})
			.catch(error => {
				console.error('Erreur :', error);
			}
		);
	}, []);

	// Fonction pour le calcul du prix hors taxe
	const funChange = (input, data) => {
		const nouvValue = input.target.value;
		const id = input.target.id;
		
		//CALCUL TTC : TTC = prixuniht * (tva + 100) / 100
		//CALCUL HT  : HT  = prixuni * 100 / (tva + 100)
		//CALCUL TVA : TVA = (prixuni * 100 / prxuniht) - 100 (pas utilisé ici)
		if (id === 'prixuni') {
			data.prixuni = nouvValue;
			if(nouvValue === ""){
				data.prixuniht = "";
			}
			else if(data.tva !== "" && data.prixuni !== "" && data.tva !== null && data.prixuni !== null)
				data.prixuniht = parseFloat((data.prixuni * 100 / (parseFloat(data.tva) + 100)).toFixed(2));
		} else if (id === 'prixuniht') {
			data.prixuniht = nouvValue;
			if(nouvValue === ""){
				data.prixuni = "";
			}
			else if(data.tva !== "" && data.prixuniht !== "" && data.tva !== null && data.prixuniht !== null)
				data.prixuni = parseFloat((data.prixuniht * (parseFloat(data.tva) + 100) / 100).toFixed(2));
		} else if (id === 'tva') {
			data.tva = nouvValue;
			if(nouvValue === ""){
				data.prixuni = "";
			}
			else if(data.tva !== "" && data.prixuniht !== "" && data.tva !== null && data.prixuniht !== null)
				data.prixuni = parseFloat((data.prixuniht * (parseFloat(data.tva) + 100) / 100).toFixed(2));
		}
	}

	// En-tête de la table
	const initialHeader = [
		{ id: 'id'        , name: 'NB Ligne'           , type:'number'  ,              required : true , editable : false, show : false                                            },
		{ id: 'idprod'    , name: 'ID du produit'      , type:'number'  ,              required : true , editable : false, show : false                                            },
		{ id: 'ref'       , name: 'Référence'          , type:'text'    ,              required : true , editable : true , show : true , maxLength : 50                            },
		{ id: 'libprod'   , name: 'Libellé'            , type:'text'    ,              required : true , editable : true , show : true , maxLength : 100                           },
		{ id: 'tva'       , name: 'Taux TVA'           , type:'number'  , step:'0.01', required : false, editable : true , show : false, maxLength : 12  , onChange: funChange     },
		{ id: 'prixuni'   , name: 'Prix TTC'           , type:'prix'    , step:'0.01', required : false, editable : true , show : true , maxLength : 12  , onChange: funChange     },
		{ id: 'prixuniht' , name: 'Prix Hors Taxe'     , type:'prix'    , step:'0.01', required : false, editable : true , show : false, maxLength : 12  , onChange: funChange     },
		{ id: 'dispomatin', name: 'Disponible le matin', type:'checkbox',              required : true , editable : true , show : true , maxLength : 12  , fastEditable : true     },
		{ id: 'disposoir' , name: 'Disponible le soir' , type:'checkbox',              required : true , editable : true , show : true , maxLength : 12  , fastEditable : true     },
		{ id: 'categorie' , name: 'Catégorie'          , type:'text'    ,              required : true , editable : true , show : true , maxLength : 100 , datalist : datalistCateg}
	];




	// Fonction pour l'insertion
	const funInsert = async (nouvItem) => {
		if(nouvItem.prixuniht !== "" && nouvItem.tva !== "" && nouvItem.prixuni !== "" && nouvItem.prixuniht !== null && nouvItem.tva !== null && nouvItem.prixuni !== null)
		{
			try {
				const formData = new FormData();
				formData.append('ref'      , nouvItem.ref);
				formData.append('libProd'  , nouvItem.libprod);
				if(nouvItem.prixuniht !== "" && nouvItem.tva !== "" && nouvItem.prixuni !== "" && nouvItem.prixuniht !== null && nouvItem.tva !== null && nouvItem.prixuni !== null){
					formData.append('prixUni'  , parseFloat(nouvItem.prixuni));
					formData.append('prixUniHT', parseFloat(nouvItem.prixuniht));
					formData.append('tva'      , parseFloat(nouvItem.tva));
				}
				formData.append('dispoMatin', nouvItem.dispomatin ? 1 : 0); // 1 si vrai, 0 si faux
				formData.append('dispoSoir' , nouvItem.disposoir  ? 1 : 0); // 1 si vrai, 0 si faux
				formData.append('categorie', nouvItem.categorie);

				const requestOptions = {
					method: 'POST',
					body: formData
				};

				const response = await fetch(cheminPHP + "produit/CreationProduit.php", requestOptions);

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
		}
		else
		{
			alert("Veuillez remplir les champs Prix TTC, Prix Hors Taxe et Taux TVA, ou tous les vidé si vous ne voulez pas les remplir");
		}
	};


	// Fonction pour l'update
	const funUpdate = async (upItem/*, oldItem*/) => {
		if(upItem.prixuniht !== "" && upItem.tva !== "" && upItem.prixuni !== "" && upItem.prixuniht !== null && upItem.tva !== null && upItem.prixuni !== null)
		{
			try {
				const formData = new FormData();
				formData.append('idProd'    , parseInt(upItem.idprod ));
				formData.append('ref'       , upItem.ref);
				formData.append('libProd'   , upItem.libprod);
				if(upItem.prixuniht !== "" && upItem.tva !== "" && upItem.prixuni !== "" && upItem.prixuniht !== null && upItem.tva !== null && upItem.prixuni !== null){
					formData.append('prixUni'  , parseFloat(upItem.prixuni));
					formData.append('prixUniHT', parseFloat(upItem.prixuniht));
					formData.append('tva'      , parseFloat(upItem.tva));
				}
				formData.append('dispoMatin', upItem.dispomatin);
				formData.append('dispoSoir' , upItem.disposoir );
				formData.append('categorie' , upItem.categorie);

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
		}
		else
		{
			alert("Veuillez remplir les champs Prix TTC, Prix Hors Taxe et Taux TVA, ou tous les vidé si vous ne voulez pas les remplir");
		}
	}

	// Fonction pour la suppression
	const funDelete = async (item) => {
		try {
			const formData = new FormData();
			formData.append('idProd', parseInt(item.idprod));

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "produit/SuppressionProduit.php", requestOptions);

			if (!response.ok) {
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);

			// Récupérer les nouvelles données des produits après la suppression réussie
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
				id: index + 1,
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


	const handleChange  = (e) => {setSearchTerm(e.target.value);  };

	const applyFilter = (data, value, checkedM, checkedS) => {
		const filteredData = data.filter((element) => {
				// Parcourir les clés de l'en-tête initial
				for (const key of initialHeader) {
					// Vérifier si la clé doit être affichée et si la valeur de l'élément correspond à la valeur de recherche
					if (key.show ) {
						if ((element[key.id] +'').toUpperCase().includes(value.toUpperCase()) && (element.dispomatin === checkedM || !checkedM) && (element.disposoir === checkedS || !checkedS)) {
							return true; // Si correspondance, conserver cet élément
						}
					}
				}
				return false; // Si aucune correspondance, exclure cet élément
		});
		setFilterData(filteredData);
	}


	useEffect(() => {
		applyFilter(initialData, searchTerm, checkedM, checkedS);
	}, [initialData, searchTerm, checkedM, checkedS]);




	//Création du tableau
	return (
	<div className="col-sm-12">

		<h1 className='titre mt-1'>Gestion des produits </h1>

		<div className="grpRecherche mt-4 d-flex align-items-center">
			{/* barre de recherche */}
			<div className="col-sm-3">
				<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={handleChange} />
			</div>

			{/* Bouton checkbox avec style CSS pour la marge gauche */}
			<div className="form-check" style={{ marginLeft: '10em' }}>
				<input type='checkbox' className="check form-check-input border-secondary" id="afficherClients" onChange={(e) => setCheckedMatin(!checkedM)}/>
				<label className="txtcheck form-check-label" htmlFor="afficherClients">Afficher les produits du matin</label>
			</div>

			{/* Bouton checkbox avec style CSS pour la marge gauche */}
			<div className="form-check" style={{ marginLeft: '10em' }}>
				<input type='checkbox' className="check form-check-input border-secondary" id="afficherProd" onChange={(e) => setCheckedSoir(!checkedS)}/>
				<label className="txtcheck form-check-label" htmlFor="afficherProd">Afficher les produits du soir</label>
			</div>
		</div>



		<Table
			header={initialHeader}
			data={filterData}
			funInsert={funInsert}
			funUpdate={funUpdate}
			funDelete={funDelete}
			keyGrayWhenFalse = 'present'
		/>
	</div>
	);
}