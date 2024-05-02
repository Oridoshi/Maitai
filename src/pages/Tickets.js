import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Table from '../components/Table';
import Compteur from '../components/Compteur';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Ticket()
{
	const [modalOpen, setModalOpen] = useState(false);
	const [lblCat, setLblCat] = useState();
	const [lblProd, setLblProd] = useState();

	// En-tête de la table
	const initialHeader = [
		{ id: 'id', name: 'NB Ligne', type: 'number', required: false, editable: false, show: false },
		{ id: 'nomcli', name: 'Nom du Client', type: 'text', required: false, editable: false, show: true },
		{ id: 'email', name: 'Email', type: 'email', required: false, editable: false, show: true },
		{ id: 'prix', name: 'Total en cours', type: 'number', required: false, editable: false, show: true },
		{ id: 'present', name: 'Présent sur le site', type: 'checkbox', required: true, editable: true, show: true, fastEditable: true },
		{ id: 'btn', name: 'Bouton', type: 'button', show: true, function: editTickets, btn: '', className: 'btntickets' },
	];

	// En-tête de la table
	const initData = [
		{ id: '1', nomcli: 'test', email: 't', prix: 2 },
		{ id: '2', nomcli: 'test', email: 't', prix: 2 },
		{ id: '3', nomcli: 'test', email: 't', prix: 2 },
		{ id: '4', nomcli: 'test', email: 't', prix: 2 },
	];

	// FILTRES
	const handleChange = (e) => { filter(e.target.value); };
	const handleCbChange = (e) => { filter(e.target.checked); };

	function editTickets(ligne)
	{
		const ligneExist = document.getElementById('edit');
		if (ligneExist)
		{
			ligneExist.remove();
		} else
		{
			const Prod = [
				{ nomP: 'Lampe', prix: 5, qt: 10 },
				{ nomP: 'Combinaison', prix: 25, qt: 5 },
				{ nomP: 'Lunette', prix: 10, qt: 2 },
			];

			// Création de la ligne avec un id edit pour la trouver et la masquer
			const ligneEdit = document.createElement('div');
			ligneEdit.id = 'edit';
			ligneEdit.classList.add("ligneTicket");

			//création du bouton d'ajout
			const btnAdd = document.createElement('button');
			btnAdd.classList.add('btnAjouter');
			btnAdd.classList.add('btnProd');
			btnAdd.classList.add('btn');
			btnAdd.addEventListener('click', ajtProd);
			ligneEdit.appendChild(btnAdd);


			// Création des lignes de produit
			Prod.forEach(prod =>
			{
				const ligneProd = document.createElement('div');
				ligneProd.classList.add('ligneProd');

				// Nom Produit
				const nomP = document.createElement('div');
				nomP.textContent = prod.nomP;

				// Prix Produit
				const prix = document.createElement('div');
				prix.textContent = prod.prix + " €";

				// Compteur
				const compteur = document.createElement('div');
				const compteurComponent = <Compteur valIni={ prod.qt } />;
				ReactDOM.render(compteurComponent, compteur);

				// Positionnement
				ligneProd.appendChild(nomP);
				ligneProd.appendChild(prix);
				ligneProd.appendChild(compteur);

				ligneEdit.appendChild(ligneProd); // Ajout de la ligne de produit à la table
			});

			// Création du bouton d'export
			const btnExport = document.createElement('button');
			btnExport.textContent = "Export (csv)";
			btnExport.classList.add("btnExport");
			btnExport.classList.add("btn");
			btnExport.addEventListener('click', exportation);


			// Ajout du bouton d'export à la ligne edit
			ligneEdit.appendChild(btnExport);

			// Cherche le client dont on veut éditer le ticket et ajoute la ligneEdit en dessous
			const client = document.getElementById('ligne ' + ligne.id);
			client.parentNode.insertBefore(ligneEdit, client.nextSibling);
		}
	}

	function ajtProd()
	{
		setModalOpen(true);
	}

	function exportation()
	{
		console.log("exportation");
	}


	function filter(value)
	{
		/*
		// Filtrer les données en fonction de la valeur de recherche
		const filteredData = initData.filter((element) =>
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
		setFilterData(filteredData);*/
	}

	function activerProd(){
		const btnProd = document.getElementById("btnProd");
		btnProd.disabled=false;
	}
	function activerPrix(){
		const prix = document.getElementById("prix");
	}

	return (
		<div>
			<h1 className="titre">Gestion des Tickets</h1>
			<div className="grpRecherche mt-4 d-flex align-items-center">
				{/* barre de recherche */ }
				<div className="col-sm-3">
					<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={ handleChange } />
				</div>
			</div>
			<div className="form-check" style={ { marginLeft: '10em' } }>
				<input type='checkbox' className="form-check-input border-secondary" id="afficherClients" onChange={()=> handleCbChange } />
				<label className="form-check-label" htmlFor="afficherClients">Afficher seulement clients présents</label>
			</div>
			<div className='h-25'>
				<Table
					header={ initialHeader }
					data={ initData }
				/>
			</div>
			<Modal show={ modalOpen } onHide={ () => setModalOpen(false) }>
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
								<li><a className="dropdown-item"onClick={()=>{setLblCat("Matériel");activerProd()}}>Matériel</a></li>
								<li><a className="dropdown-item"onClick={()=>{setLblCat("Consomation");activerProd()}}>Consomation</a></li>
							</ul>
						</div>
						<label id="lblcat" className="lbl" >{lblCat} </label>
						<div className="dropdown itemModal">
							<button id="btnProd" className="btnProd btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled>
								Produit
							</button>
							<ul className="dropdown-menu">
								<li><a className="dropdown-item" onClick={()=>{setLblProd("Lampe");activerPrix()}}>Lampe</a></li>
								<li><a className="dropdown-item" onClick={()=>{setLblProd("Combinaison");activerPrix()}}>Combinaison</a></li>
								<li><a className="dropdown-item" onClick={()=>{setLblProd("Lunette");activerPrix()}}>Lunette</a></li>
							</ul>
						</div>
						<label id="lblprod" className="lbl"> {lblProd} </label>
					</div>
					<input id="prix" type="number" className="saisieprix" placeholder="Entrez un prix" disabled/>
				</Modal.Body>
				<Modal.Footer>
					<Button className="btnAjouter btn"></Button>
					<Button variant="secondary" onClick={ () => setModalOpen(false) }>
						Fermer
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}