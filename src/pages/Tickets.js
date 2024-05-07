import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import Table from '../components/Table';
import Compteur from '../components/Compteur';
import { cheminPHP } from '../components/VarGlobal.js';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllByRole } from '@testing-library/react';

export default function Ticket()
{
	//donnée tab
	const [initialData, setInitialData] = useState([]);
	const [tabCateg, setTabCateg] = useState([]);
	const [tabProd, setTabProd] = useState([]);
	//modal ajt prod
	const [modalOpen, setModalOpen] = useState(false);
	const [lblCat, setLblCat] = useState("");
	const [lblProd, setLblProd] = useState("");
	const [idCli,setIdCli] = useState("");
	const [idProd,setIdProd] = useState("");
	const [prix, setPrix] = useState("");
	//bar de Recherche
	const [filterData, setFilterData] = useState([]);


	/*TABLEAU DE CLIENT*/

	// En-tête de la table
	const initialHeader = [
		{ id: 'id', name: 'NB Ligne', type: 'number', required: false, editable: false, show: false },
		{ id: 'nomcli', name: 'Nom du Client', type: 'text', required: false, editable: false, show: true },
		{ id: 'email', name: 'Email', type: 'email', required: false, editable: false, show: true },
		{ id: 'prix', name: 'Total en cours', type: 'number', required: false, editable: false, show: true },
		{ id: 'present', name: 'Présent sur le site', type: 'checkbox', required: true, editable: true, show: true, fastEditable: true },
		{ id: 'btn', name: '', type: 'button', show: true, function: editTickets, btn: '', className: 'btntickets' },
	];

	useEffect(() =>
	{
		async function fetchData()
		{
			const newData = await fetchClientData();
			setInitialData(newData);
			setFilterData(newData);
			setTabCateg(await getCategProd());
		}
		fetchData();
	}, []);

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*TICKET QUAND ON CLIQUE SUR LE BOUTON DEROULANT*/
	//Gestion des tickets
	function editTickets(ligne)
	{
		try
		{
			//récupère la ligne qui appel la méthode et celle d'après
			const ligneAppel = document.getElementById('ligne ' + ligne.id);
			const isligneEdit = ligneAppel.nextSibling;

			//récupère tous les boutons et les remets dans la position haute
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
	const construitTicket = async (ligne) =>
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
		const tabTicket = await getTabTicket(ligne.id);

		// Création des lignes de produits
		for (const prod of tabTicket)
		{
			//ligne du produit
			const ligneProd = document.createElement('tr');
			ligneProd.id = 'edit';
			ligneProd.classList.add('ligneProd');

			// Nom Produit
			const nomP = document.createElement('td');
			nomP.colSpan = 1;
			nomP.textContent = await getNomP(prod.idprod);
			nomP.classList.add('edit');

			// Prix Produit
			const prix = document.createElement('td');
			prix.colSpan = 3;
			prix.textContent = (prod.prixtot / prod.qa).toFixed(2) + " €";
			prix.classList.add('edit');

			// Création de l'élément compteur
			const compteur = document.createElement('td');
			compteur.classList.add('edit');
			compteur.classList.add('cpt');
			const compteurComponent = document.createElement('div');
			compteur.appendChild(compteurComponent); // Ajoute le compteurComponent au td

			// Rendu de l'application React dans l'élément compteurComponent
			const compteurRoot = ReactDOM.createRoot(compteurComponent);
			compteurRoot.render(<Compteur
				valIni={ prod.qa }
				updateTotComm={ (idprod, idcli, qa) => updateTotComm(idprod, idcli, qa) }
				idprod={ prod.idprod }
				idcli={ ligne.id }
			/>);

			// Ajout des colonnes à la ligne de produit
			ligneProd.appendChild(nomP);
			ligneProd.appendChild(prix);
			ligneProd.appendChild(compteur);

			// Ajout de la ligne de produit après la ligne d'ajout
			client.parentNode.insertBefore(ligneProd, ligneBtnExport);
			setIdCli(ligne.id);
		};
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///code de tous ce que gère la pop up d'ajout de produit
	const renderCateg = () =>
	{
		const elements = tabCateg.map(categ => (
			<li key={ categ.categorie }>
				<a className="dropdown-item" onClick={ () => { setLblCat(categ.categorie); activerProd(categ.categorie); } }>
					{ categ.categorie }
				</a>
			</li>
		));
		return elements;
	};

	const renderProd = () =>
	{
		const elements = tabProd.map(prod => (
			<li key={ prod.libprod}><a className="dropdown-item" onClick={ () => {setIdProd(prod.idprod); setLblProd(prod.libprod); setPrix(prod.prixuni); } }>{ prod.libprod }</a></li>
		));
		return elements;
	};

	//Ouvre la pop-up pour ajouter un nouveau produit
	function nvProd()
	{
		setModalOpen(true);
	}

	//met à jour la liste des produits en fonction de la catégorie sélectionnée
	async function activerProd(categorie) {
		const produits = await getProduitByCateg(categorie);
		setTabProd(produits);

		const btnProd = document.getElementById("btnProdCat");
		btnProd.disabled = false;
	}

	//ajoute un produit au ticket
	async function ajtProd()
	{
		if (lblProd !== "" && !(await ticketExist(idProd,idCli)))
		{
			insertProdTicket(idProd,idCli,prix);

			//ligne du produit
			const ligneProd = document.createElement('tr');
			ligneProd.id = 'edit';
			ligneProd.classList.add('ligneProd');

			// Nom Produit
			const nomP = document.createElement('td');
			nomP.colSpan = 1;
			nomP.textContent = lblProd;
			nomP.classList.add('edit');

			// Prix Produit
			const lblprix = document.createElement('td');
			lblprix.colSpan = 3;
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
			compteurRoot.render(<Compteur
				valIni={ 1 }
				updateTotComm={ (idprod, idcli, qa) => updateTotComm(idprod, idcli, qa) }
				idprod={ idProd }
				idcli={ idCli }
			/>);

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

			const newData = await fetchClientData();
			setInitialData(newData);
			setFilterData(newData);
			setTabCateg(await getCategProd());
		}
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//EVENEMENTTS

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

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*METHODE BADO*/

	//récupère tous les Clients
	const fetchClientData = async () =>
	{
		try
		{
			const response = await fetch(cheminPHP + "client/GetClients.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
			});

			if (!response.ok)
			{
				throw new Error('Erreur de réseau lors de la récupération des données des clients.');
			}

			const data = await response.json();
			const newData = await Promise.all(data.map(async (item) =>
			{
				const prix = await getTotCommCli(item.idcli) + " €";
				return { id: item.idcli, nomcli: item.nomclub, email: item.email, prix: prix, present: item.present };
			}));
			return newData;
		} catch (error)
		{
			console.error('Erreur :', error);
			return [];
		}
	};

	//retourne le prix total de la commande d'un client
	const getTotCommCli = async (ncli) =>
	{
		const tabTicket = await getTabTicket(ncli);
		let prixTot = 0;
		tabTicket.forEach(prod =>
		{
			prixTot += prod.prixtot;
		})
		return prixTot.toFixed(2);
	};

	//récupère tous les tickets pour un client
	const getTabTicket = async (ncli) =>
	{
		try
		{
			const formData = new FormData();
			formData.append('idcli', ncli);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "ticket/GetTicket.php", requestOptions);

			if (!response.ok)
			{
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.json();
			return data;
		} catch (error)
		{
			console.log(error);
			return false;
		}
	};

	//récupère toutes les catégories
	const getCategProd = async () =>
	{
		try
		{
			const response = await fetch(cheminPHP + "produit/GetCateg.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
			});

			if (!response.ok)
			{
				throw new Error('Erreur de réseau lors de la récupération des données des clients.');
			}

			const data = await response.json();
			return data;
		} catch (error)
		{
			console.error('Erreur :', error);
			return [];
		}
	}

	//récupère tous les produits d'une Catégorie
	const getProduitByCateg = async (nomCateg) =>
	{
		try
		{
			const response = await fetch(cheminPHP + "produit/GetProduit.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
			});

			if (!response.ok)
			{
				throw new Error('Erreur de réseau lors de la récupération des données des clients.');
			}

			const data = await response.json();
			const tabProd = [];
			data.forEach(prod =>
			{
				if (prod.categorie === nomCateg)
				{
					tabProd.push(prod);
				}
			})
			return tabProd;
		} catch (error)
		{
			console.error('Erreur :', error);
			return [];
		}
	}

	//récupère le nom du produit idprod
	const getNomP = async (idprod) =>
	{
		const prod = await getProduit(idprod);
		return prod.libprod;
	}

	const getProduit = async (idprod) =>
	{
		try
		{
			const formData = new FormData();
			formData.append('idprod', idprod);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "produit/GetProduit.php", requestOptions);
			if (!response.ok)
			{
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.json();
			return data;
		} catch (error)
		{
			console.log(error);
			return false;
		}
	}

	const getTickets = async () =>
	{
		try
		{
			const response = await fetch(cheminPHP + "client/GetClients.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
			});

			if (!response.ok)
			{
				throw new Error('Erreur de réseau lors de la récupération des données des clients.');
			}

			const data = await response.json();
			return data;
		} catch (error)
		{
			console.error('Erreur :', error);
			return [];
		}
	}

	const ticketExist = async (idprod,idcli)=>
	{
		const tabTicket = await getTickets();
		return tabTicket.some(ticket => ticket.idprod === idprod && ticket.idcli === idcli);
	}

	//change le prix de la commande quand on modifie le nombre de produit
	const updateTotComm = async (idprod, idcli, qa) =>
	{
		try
		{
			const formData = new FormData();
			formData.append('idprod', idprod);
			formData.append('idcli', idcli);
			formData.append('qa', qa);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "ticket/ModificationTicket.php", requestOptions);

			if (!response.ok)
			{
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);

			// Récupérer les nouvelles données des clients après l'insertion réussie
			const newData = await fetchClientData();
			setInitialData(newData);
			setFilterData(newData);

			return data === ""; // Retourne true si la suppression a réussi, sinon false
		} catch (error)
		{
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}

	};

	const insertProdTicket = async (idprod,idcli) =>
	{
		try
		{
			const formData = new FormData();
			formData.append('idprod', idprod);
			formData.append('idcli', idcli);
			formData.append('qa', 1);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "ticket/CreationTicket.php", requestOptions);

			if (!response.ok)
			{
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();


			return data === ""; // Retourne true si la insert a réussi, sinon false
		} catch (error)
		{
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	}

	function afficherError(data)
	{
		const regex = /SQLSTATE\[(\d+)\].+?(\d+)(.+?) in C:\\xampp/g; // Expression régulière pour capturer le code d'erreur et le texte jusqu'à "in C:\\xampp..."
		const match = regex.exec(data);

		if (match)
		{
			const sqlState = match[1]; // État SQL
			const errorCode = match[2]; // Code d'erreur
			const errorMessageText = match[3].trim(); // Texte du message d'erreur

			console.log("Refuse de la base de donnée, raison : ", errorMessageText, "( SQL STATE[", sqlState, "] error code :", errorCode);
			alert(errorMessageText);

		} else
		{
			if (data !== "")
				alert(data.replace('<br>', ''));
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
					data={ filterData }
				/>
			</div>
			<Modal show={ modalOpen } onHide={ () => { setModalOpen(false); setLblCat(""); setLblProd(""); setPrix("");} }>
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
								{ renderCateg() }
							</ul>
						</div>
						<label id="lblcat" className="lbl" >{ lblCat } </label>
						<div className="dropdown itemModal">
							<button id="btnProdCat" className="btnProd btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled>
								Produit
							</button>
							<ul className="dropdown-menu">
								{ renderProd() }
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