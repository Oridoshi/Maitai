import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import Table from '../components/Table';
import Compteur from '../components/Compteur';
import { cheminPHP } from '../components/VarGlobal.js';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Ticket()
{
	const [modalOpen, setModalOpen] = useState(false);
	const [lblCat, setLblCat] = useState("");
	const [lblProd, setLblProd] = useState("");
	const [prix, setPrix] = useState("");
	const [initialData , setInitialData ] = useState([]);
	const [filterData  , setFilterData  ] = useState([]);

	// En-tête de la table
	const initialHeader = [
		{ id: 'id', name: 'NB Ligne', type: 'number', required: false, editable: false, show: false },
		{ id: 'nomcli', name: 'Nom du Client', type: 'text', required: false, editable: false, show: true },
		{ id: 'email', name: 'Email', type: 'email', required: false, editable: false, show: true },
		{ id: 'prix', name: 'Total en cours', type: 'number', required: false, editable: false, show: true },
		{ id: 'present', name: 'Présent sur le site', type: 'checkbox', required: true, editable: true, show: true, fastEditable: true },
		{ id: 'btn', name: '', type: 'button', show: true, function: editTickets, btn: '', className: 'btntickets' },
	];

	useEffect( async () => {
		const newData = await fetchClientData();
		setInitialData(newData);
		setFilterData (newData);
	}, []);

	//Gestion des tickets
	function editTickets(ligne)
	{
		try
		{
			//récupère la ligne qui appel la méthode et celle qui suit
			const ligneAppel = document.getElementById('ligne ' + ligne.id);
			const isligneEdit = ligneAppel.nextSibling;

			//récupère tous les boutons et kes remets dans la même position
			var buttons = document.getElementsByTagName('button');
			for (var i = 0; i < buttons.length; i++)
			{
				var button = buttons[i];
				button.style.transform = 'rotate(0deg)';
			}

			//masque tous les tickets
			removeElementsByID('edit');

			//si on clique sur le bouton est qu'en dessous il y'avait déjà un ticket, on le supprime
			//sinon on affiche un ticket sous la ligne d'appel
			if (isligneEdit.id !== "edit")
			{
				construitTicket(ligne);
			}
		}
		catch (error) { construitTicket(ligne); }//si on clique sur le dernire élément du tableau on a une erreur
	}

	//supprime toutes les instance de l'élement passé en paramètre
	function removeElementsByID(id)
	{
		const elements = document.querySelectorAll(`[id="${ id }"]`); // Sélectionne tous les éléments avec l'ID donné
		elements.forEach(element =>
		{
			element.remove(); // Supprime chaque élément
		});
	}

	//affcihage du ticket
	function construitTicket(ligne)
	{
		//on récupère la ligne sous laquelle on doit insérer le ticket
		const client = document.getElementById('ligne ' + ligne.id);

		//retourne le bouton du ticket pour montrer qu'on l'edit
		var button = document.getElementById('btn ' + ligne.id);
		button.style.transform = 'rotate(180deg)';

		/* Bouton Ajout de produit */

		const ligneBtnAdd = document.createElement('tr');//ligne du bouton Ajout
		ligneBtnAdd.id = 'edit';
		const colBtnAdd = document.createElement('td');//colonne du bouton Ajout
		colBtnAdd.colSpan = 5;
		colBtnAdd.classList.add('edit');
		colBtnAdd.classList.add('btnEdit');

		//btn Ajout
		const btnAdd = document.createElement('button');
		btnAdd.classList.add('btnAjouter');
		btnAdd.classList.add('btnProd');
		btnAdd.classList.add('btn');
		btnAdd.addEventListener('click', nvProd);

		//potionnement du bouton ajout
		colBtnAdd.appendChild(btnAdd);		//dans sa colonne
		ligneBtnAdd.appendChild(colBtnAdd);	//dans sa ligne
		client.parentNode.insertBefore(ligneBtnAdd, client.nextSibling);//dans le tableau

		/* Bouton Exportation */

		const ligneBtnExport = document.createElement('tr');//ligne du bouton D'export
		ligneBtnExport.id = 'edit';
		ligneBtnExport.classList.add("ligneBtnExport")
		const colBtnExport = document.createElement('td');	//colonne du bouton d'export
		colBtnExport.colSpan = 5;
		colBtnExport.classList.add('edit');
		colBtnExport.classList.add('btnEdit');

		//btn d'Export
		const btnExport = document.createElement('button');
		btnExport.textContent = "Export (csv)";
		btnExport.classList.add("btnExport");
		btnExport.classList.add("btn");
		btnExport.addEventListener('click', exportation);

		//positonnement du bouton d'export
		colBtnExport.appendChild(btnExport);		//dans sa colonne
		ligneBtnExport.appendChild(colBtnExport);	///dans sa ligne
		client.parentNode.insertBefore(ligneBtnExport, ligneBtnAdd.nextSibling);	//dans le tableau


		//récupération des porduits du tickets
		const Prod = [
			{ nomP: 'Lampe', prix: 5, qt: 10 },
			{ nomP: 'Combinaison', prix: 25, qt: 5 },
			{ nomP: 'Lunette', prix: 10, qt: 2 },
		];

		// Création des lignes de produits
		Prod.forEach(prod =>
		{
			//ligne du produit
			const ligneProd = document.createElement('tr');
			ligneProd.id = 'edit';
			ligneProd.classList.add('ligneProd');

			// Nom Produit
			const nomP = document.createElement('td');
			nomP.colSpan = 2;
			nomP.textContent = prod.nomP;
			nomP.classList.add('edit');

			// Prix Produit
			const prix = document.createElement('td');
			prix.colSpan = 2;
			prix.textContent = prod.prix + " €";
			prix.classList.add('edit');

			// Création de l'élément compteur
			const compteur = document.createElement('td');
			compteur.classList.add('edit');
			compteur.classList.add('cpt');
			const compteurComponent = document.createElement('div');
			compteur.appendChild(compteurComponent); // Ajoute le compteurComponent au td

			// Rendu de l'application React dans l'élément compteurComponent
			const compteurRoot = ReactDOM.createRoot(compteurComponent);
			compteurRoot.render(<Compteur valIni={ prod.qt } />);

			// Ajout des colonnes à la ligne de produit
			ligneProd.appendChild(nomP);
			ligneProd.appendChild(prix);
			ligneProd.appendChild(compteur);

			// Ajout de la ligne de produit après la ligne d'ajout
			client.parentNode.insertBefore(ligneProd, ligneBtnExport);
		});
	}


	//gère l'exportation
	function exportation()
	{
		console.log("exportation");
	}


	// FILTRES
	const handleChange = (e) => { filter(e.target.value); };
	const handleCbChange = (e) => { filter(e.target.checked); };

	function filter(value)
	{
		// Filtrer les données en fonction de la valeur de recherche
		const filteredData = initialData.filter((element) =>
		{
			// Parcourir les clés de l'en-tête initial
			for (const key of initialHeader)
			{
				// Vérifier si la clé doit être affichée et si la valeur de l'élément correspond à la valeur de recherche
				if (key.show)
				{
					// Vérifier si la valeur de l'élément correspond à la valeur de recherche
					if ((element[key.id] + '').toUpperCase().includes(value.toUpperCase()))
					{
						return true; // Si correspondance, conserver cet élément
					}
				}
			}
			return false; // Si aucune correspondance, exclure cet élément
		});

		// Mettre à jour les données filtrées
		setFilterData(filteredData);
	}

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
			const newData = [];
			data.forEach((item) =>{
					newData.push({id:item.idcli, nomcli:item.nomclub, email:item.email, prix:0, present:item.present});
			});
			return newData;
		} catch (error) {
			console.error('Erreur :', error);
			return [];
		}
	};


	///code de tous ce que gère la pop up d'ajout de produit

	//Ouvre la pop-up pour ajouter un nouveau produit
	function nvProd()
	{
		setModalOpen(true);
	}
	//met à jour la liste des produits en fonction de la catégorie sélectionnée
	function activerProd()
	{
		const btnProd = document.getElementById("btnProdCat");
		btnProd.disabled = false;
	}

	//ajoute un produit au ticket
	function ajtProd()
	{
		if (lblProd !== "")
		{
			//ligne du produit
			const ligneProd = document.createElement('tr');
			ligneProd.id = 'edit';
			ligneProd.classList.add('ligneProd');

			// Nom Produit
			const nomP = document.createElement('td');
			nomP.colSpan = 2;
			nomP.textContent = lblProd;
			nomP.classList.add('edit');

			// Prix Produit
			const lblprix = document.createElement('td');
			lblprix.colSpan = 2;
			lblprix.textContent = prix + " €";
			lblprix.classList.add('edit');

			// Création de l'élément compteur
			const compteur = document.createElement('td');
			compteur.classList.add('edit');
			compteur.classList.add('cpt');
			const compteurComponent = document.createElement('div');
			compteur.appendChild(compteurComponent); // Ajoute le compteurComponent au td

			// Rendu de l'application React dans l'élément compteurComponent
			const compteurRoot = ReactDOM.createRoot(compteurComponent);
			compteurRoot.render(<Compteur/>);

			// Ajout des colonnes à la ligne de produit
			ligneProd.appendChild(nomP);
			ligneProd.appendChild(lblprix);
			ligneProd.appendChild(compteur);

			// Ajout de la ligne de produit après la ligne d'ajout
			const lignebtnExport = document.getElementsByClassName("ligneBtnExport")[0]
			lignebtnExport.parentNode.insertBefore(ligneProd, lignebtnExport);

			//réinitialise les champs et ferme la pop-up
			setLblCat("");
			setLblProd("");
			setPrix("");
			setModalOpen(false);
		}
	}

	///code html de la page des tickets
	return (
		<div>
			<h1 className="titre">Gestion des Tickets</h1>
			<div className="grpRecherche mt-4 d-flex align-items-center">
				{/* barre de recherche */ }
				<div className="col-sm-3">
					<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={ handleChange } />
				</div>
				<div className="form-check" style={ { marginLeft: '10em' } }>
					<input type='checkbox' className="check form-check-input border-secondary" id="afficherClients" onChange={ handleCbChange } />
					<label className="form-check-label" htmlFor="afficherClients">Afficher seulement clients présents</label>
				</div>
			</div>
			<div className='h-25'>
				<Table
					header={ initialHeader }
					data={ initialData }
				/>
			</div>
			<Modal show={ modalOpen } onHide={ () => { setModalOpen(false); setLblCat(""); setLblProd(""); setPrix(""); } }>
				<Modal.Header closeButton>
					<Modal.Title>Ajouter un Produit</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="Modal">
						<div className="dropdown itemModal">
							<button className="btnProd btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								Catégorie Produit
							</button>
							<ul className="dropdown-menu">
								<li><a className="dropdown-item" onClick={ () => { setLblCat("Matériel"); activerProd() } }>Matériel</a></li>
								<li><a className="dropdown-item" onClick={ () => { setLblCat("Consomation"); activerProd() } }>Consomation</a></li>
							</ul>
						</div>
						<label id="lblcat" className="lbl" >{ lblCat } </label>
						<div className="dropdown itemModal">
							<button id="btnProdCat" className="btnProd btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled>
								Produit
							</button>
							<ul className="dropdown-menu">
								<li><a className="dropdown-item" onClick={ () => { setLblProd("Lampe"); setPrix(5); } }>Lampe</a></li>
								<li><a className="dropdown-item" onClick={ () => { setLblProd("Combinaison"); setPrix(25); } }>Combinaison</a></li>
								<li><a className="dropdown-item" onClick={ () => { setLblProd("Lunette"); setPrix("7"); } }>Lunette</a></li>
							</ul>
						</div>
						<label id="lblprod" className="lbl"> { lblProd } </label>
					</div>
					<input id="prix" defaultValue={ prix } type="number" className="saisieprix" placeholder="Entrez un prix" onChange={ (event) => setPrix(event.target.value) } />
				</Modal.Body>
				<Modal.Footer>
					<Button className="btnAjouter btn" onClick={ () => ajtProd() }></Button>
					<Button className="btn btnAnnuler" onClick={ () => { setModalOpen(false); setLblCat(""); setLblProd(""); setPrix(""); } }>
						Fermer
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}