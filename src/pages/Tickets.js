import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import Table from '../components/Table';
import Compteur from '../components/Compteur';
import { cheminPHP } from '../components/VarGlobal.js';

import imgNotif from '../img/succes.svg';
import imgNotifError from '../img/refus.svg';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Ticket()
{
	if (sessionStorage.getItem('droit') !== 'Admin' && sessionStorage.getItem('droit') !== 'Maitai') window.location.href = '/';


	//donnée tab
	const [initialData, setInitialData] = useState([]);
	const [tabCateg, setTabCateg] = useState([]);
	const [tabProd, setTabProd] = useState([]);
	//modal ajt prod
	const [modalOpen, setModalOpen] = useState(false);
	const [lblCat, setLblCat] = useState("");
	const [lblProd, setLblProd] = useState("");
	const [lblErreur, setLblErreur] = useState("");
	const [idUti, setIdUti] = useState("");
	const [idProd, setIdProd] = useState("");
	const [prix, setPrix] = useState("");
	//bar de Recherche
	const [filterData, setFilterData] = useState([]);

	const [searchTerm, setSearchTerm] = useState(''); // État pour stocker la valeur de recherche
	const [checked, setChecked] = useState(true); // État pour stocker la valeur de la case à cocher

	const [notification, setNotification] = useState({ message: '', visible: false });
	const [messagehaut,setMessageHaut] = useState('');
	const [notifValid,setNotifValid] = useState(true);


	/*TABLEAU DE CLIENT*/

	// En-tête de la table
	const initialHeader = [
		{ id: 'id', name: 'NB Ligne', type: 'number', required: false, editable: false, show: false },
		{ id: 'login', name: 'Nom du Client', type: 'text', required: false, editable: false, show: true },
		{ id: 'email', name: 'Email', type: 'email', required: false, editable: false, show: true },
		{ id: 'prix', name: 'Total en cours(TTC)', type: 'prix', required: false, editable: false, show: true },
		{ id: 'present', name: 'Présent sur le site', type: 'checkbox', required: true, editable: true, show: false, fastEditable: true },
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
		setIdUti(ligne.id);
		try
		{
			//récupère la ligne qui appel la méthode et celle d'après
			const ligneAppel = document.getElementById('ligne ' + ligne.id);
			const isligneEdit = ligneAppel.nextSibling;

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
		//récupère tous les boutons et les remets dans la position haute
		var buttons = document.getElementsByTagName('button');
		for (var i = 0; i < buttons.length; i++)
		{
			var button = buttons[i];
			button.classList.remove('btnreverse');
		}

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
		button.classList.add('btnreverse');

		/* Bouton Ajout de produit */

		const ligneBtnAdd = document.createElement('tr');//ligne du bouton Ajout
		ligneBtnAdd.id = 'edit';
		const colBtnAdd = document.createElement('td');//colonne du bouton Ajout
		colBtnAdd.colSpan = 4;
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
		colBtnExport.colSpan = 4;
		colBtnExport.classList.add('edit');
		colBtnExport.classList.add('btnEdit');

		//btn d'Export
		const btnExport = document.createElement('button');
		btnExport.textContent = "Export (csv)";
		btnExport.classList.add("btnExport");
		btnExport.classList.add("btn");
		btnExport.addEventListener('click', function ()
		{
			exportation(ligne.id);
		});

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
			prix.colSpan = 2;
			prix.textContent = prod.prixspe + " €";
			prix.classList.add('edit');

			// Création de l'élément compteur
			const compteur = document.createElement('td');
			compteur.colSpan = 1;
			compteur.classList.add('edit');
			compteur.classList.add('cpt');
			const compteurComponent = document.createElement('div');
			compteur.appendChild(compteurComponent); // Ajoute le compteurComponent au td

			// Rendu de l'application React dans l'élément compteurComponent
			const compteurRoot = ReactDOM.createRoot(compteurComponent);
			compteurRoot.render(<Compteur
				valIni={ prod.qa }
				updateTotComm={ (idprod, iduti, qa, prixspe) => updateTotComm(idprod, iduti, qa, prixspe) }
				idprod={ prod.idprod }
				iduti={ ligne.id }
				prixspe={ prod.prixspe }
			/>);

			// Ajout des colonnes à la ligne de produit
			ligneProd.appendChild(nomP);
			ligneProd.appendChild(prix);
			ligneProd.appendChild(compteur);

			// Ajout de la ligne de produit après la ligne d'ajout
			client.parentNode.insertBefore(ligneProd, ligneBtnExport);
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
			<li key={ prod.libprod }><a className="dropdown-item" onClick={ () => { setIdProd(prod.idprod); setLblProd(prod.libprod); setPrix(prod.prixuni); } }>{ prod.libprod }</a></li>
		));
		return elements;
	};

	//Ouvre la pop-up pour ajouter un nouveau produit
	function nvProd()
	{
		setModalOpen(true);
	}

	//met à jour la liste des produits en fonction de la catégorie sélectionnée
	async function activerProd(categorie)
	{
		const produits = await getProduitByCateg(categorie);
		setTabProd(produits);

		setLblProd("");
		setLblErreur("");

		const btnProd = document.getElementById("btnProdCat");
		btnProd.disabled = false;
	}

	//ajoute un produit au ticket
	async function ajtProd()
	{
		if (lblProd !== "" && !(await ticketExist(idProd, idUti)))
		{
			insertProdTicket(idProd, idUti, prix);

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
			compteurRoot.render(<Compteur
				valIni={ 0 }
				updateTotComm={ (idprod, iduti, qa, prixspe) => updateTotComm(idprod, iduti, qa, prixspe) }
				idprod={ idProd }
				iduti={ idUti }
				prixspe={ prix }
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
			setLblErreur("");
			setPrix("");
			setModalOpen(false);

			const newData = await fetchClientData();
			setInitialData(newData);
			setFilterData(newData);
			setTabCateg(await getCategProd());
		}
		else
		{
			setLblErreur("Erreur ce produit existe déjà !");
		}
	}

	////////////////////////////////////////////////// NOTIFICATIONS

	const Notification = ({ message, visible }) =>
	{
		if (!visible) return null;
		let classNotif = "";
		let img = "";
		if(notifValid)
		{
			classNotif = "notif"
			img = imgNotif;
		}
		else
		{
			classNotif ="notifinvalid"
			img = imgNotifError;
		}

		return (
			<div className={classNotif}>
				<img className="imgNotif" src={ img } />
				<div className="notiftxt">
					<div className="messagehaut">
						{messagehaut}
					</div>
					<div className="message">
						{ message }
					</div>
				</div>
			</div>
		);
	};

	const showNotification = (message) =>
	{
		setNotification({message, visible: true });
		setTimeout(() =>
		{
			setNotification({message: '', visible: false });
		}, 5000);
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//EVENEMENTTS

	//gère l'exportation
	async function exportation(iduti)
	{
		//test si il a bien un ticket a export
		if (await ticketCli(iduti))
		{
			//génère le ticket de caisse du client en csv
			await genereCSV(iduti);

			//récupère tous les boutons et les remets dans la position haute
			var buttons = document.getElementsByTagName('button');
			for (var i = 0; i < buttons.length; i++)
			{
				var button = buttons[i];
				button.classList.remove('btnreverse');
			}

			//masque tous les tickets
			removeElementsByID('edit');

			//supprime le tickets dans la bado
			await supprTickets(iduti);
			setNotifValid(true);
			setMessageHaut("EXPORTATION RÉUSSIE");
			showNotification("Retrouvez le dans l'histrorique du client");

			//maj des data
			const newData = await fetchClientData();
			setInitialData(newData);
			setFilterData(newData);
		}
		else
		{
			setNotifValid(false);
			setMessageHaut("EXPORTATION ÉCHOUÉE");
			showNotification("Vous n'avez pas attribué de produit");
		}
	}

	//créer le fichier csv
	async function genereCSV(iduti)
	{
		/* Contenu du fichier*/

		const client = await getClient(iduti);
		const tabDonneExport = await getTabDonneeExport();
		const tabTicket = await getTabTicket(iduti);
		const separateur = await getSeparateur();

		let contenu = "";
		let total = 0;

		//entete
		tabDonneExport.forEach(donnee =>
		{
			contenu += donnee + separateur;
		});
		contenu += "\r\n";

		for (const ticket of tabTicket)
		{
			if (ticket.qa > 0)
			{
				const nomProduit = await getNomP(ticket.idprod);
				tabDonneExport.forEach(donnee =>
				{
					switch (donnee)
					{
						case 'numero de client': contenu += iduti + separateur;
							break;
						case 'nom du client': contenu += client.login + separateur;
							break;
						case 'numero des produits': contenu += ticket.idprod + separateur;
							break;
						case 'nom des produits': contenu += nomProduit + separateur;
							break;
						case 'prix unitaire des produits': contenu += ticket.prixspe + separateur;
							break;
						case 'quantite des produits': contenu += ticket.qa + separateur;
							break;
						case 'prix total des produits': contenu += ticket.prixtot + separateur;
							break;
					}
				})
				contenu += "\r\n";
				total += ticket.prixtot;
			}
		}

		/*Attribut du fichier */
		if (total > 0)
		{
			//ajoute en bado
			const fichier = new Blob([contenu], { type: 'text/csv' });
			exportCSV(fichier, client.login + ".csv", iduti);
		}
	}

	// FILTRES
	const handleChange = (e) => { setSearchTerm(e.target.value); };
	const handleCbChange = (e) => { setChecked(e.target.checked); };

	const applyFilter = (data, value) =>
	{
		const filteredData = data.filter((element) =>
		{
			// Parcourir les clés de l'en-tête initial
			for (const key of initialHeader)
			{
				// Vérifier si la clé doit être affichée et si la valeur de l'élément correspond à la valeur de recherche
				if (key.show)
				{
					// Vérifier si la valeur de l'élément correspond à la valeur de recherche
					if ((element[key.id] + '').toUpperCase().includes(value.toUpperCase()) && (element.present === checked || element.present))
					{
						return true; // Si correspondance, conserver cet élément
					}
				}
			}
			return false; // Si aucune correspondance, exclure cet élément
		});
		setFilterData(filteredData);
	}


	useEffect(() =>
	{
		applyFilter(initialData, searchTerm, checked);
	}, [initialData, searchTerm, checked]);

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
				const prix = await getTotCommCli(item.iduti);
				return { id: item.iduti, login: item.login, email: item.email, prix: prix, present: item.present };
			}));
			return newData;
		} catch (error)
		{
			console.error('Erreur :', error);
			return [];
		}
	};

	async function getFichierConfig()
	{
		try
		{
			const response = await fetch(cheminPHP + "ticket/GetFichierConfig.php", {
				method: 'GET',
				headers: {
					'Content-Type': 'text/plain; charset=UTF-8'
				},
			});

			if (!response.ok)
			{
				throw new Error('Erreur de réseau lors de la récupération des données des clients.');
			}

			const data = await response.text();
			return data;
		} catch (error)
		{
			console.error('Erreur :', error);
			return [];
		}
	}

	//récupère les données du fichier de config et renvoie un tableau de ce qu'on veut mettre dans le ticket
	async function getTabDonneeExport()
	{
		const data = await getFichierConfig()
		const lignes = data.split('\n');
		const tabDonneExport = [];

		//parcours tout les données et stock celles qui sont décommentés
		lignes.forEach(ligne =>
		{
			if (!ligne.startsWith(";") && !ligne.startsWith("~"))
			{
				const trimmedLigne = ligne.trim();
				tabDonneExport.push(trimmedLigne);
			}
		});
		return tabDonneExport;
	}

	//récupère les données du fichier de config et renvoie un tableau de ce qu'on veut mettre dans le ticket
	async function getSeparateur()
	{
		const data = await getFichierConfig()
		const lignes = data.split('\n');
		//parcours tout les données et stock celles qui sont décommentés
		for (const ligne of lignes)
		{
			if (ligne.startsWith("~") && ligne.length > 1)
			{
				return ligne.charAt(1);
			}
		}
		return ";";
	}

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
			formData.append('iduti', ncli);

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

			const formData = new FormData();
			formData.append('categ', nomCateg);

			const response = await fetch(cheminPHP + "produit/GetProduit.php", {
				method: 'POST',
				body: formData
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
			const response = await fetch(cheminPHP + "ticket/GetTicket.php", {
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

	const getClient = async (iduti) =>
	{
		try
		{
			const formData = new FormData();
			formData.append('iduti', iduti);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "client/GetClient.php", requestOptions);

			if (!response.ok)
			{
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.json();
			return data;
		} catch (error)
		{
			return false;
		}
	}

	const ticketExist = async (idprod, iduti) =>
	{
		const tabTicket = await getTickets();
		return tabTicket.some(ticket => ticket.idprod === idprod && ticket.iduti === iduti);
	}

	const ticketCli = async (iduti) =>
	{
		const tabTicket = await getTickets();
		return tabTicket.some(ticket => ticket.iduti === iduti);
	}

	const supprTickets = async (iduti) =>
	{
		try
		{
			const formData = new FormData();
			formData.append('iduti', iduti);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "ticket/SuppressionTicket.php", requestOptions);

			if (!response.ok)
			{
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();

			return data === "";

		} catch (error)
		{
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	}
	//change le prix de la commande quand on modifie le nombre de produit
	const updateTotComm = async (idprod, iduti, qa, prixspe) =>
	{
		try
		{
			const formData = new FormData();
			formData.append('idprod', idprod);
			formData.append('iduti', iduti);
			formData.append('qa', qa);
			formData.append('prixspe', prixspe);

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

	const exportCSV = async (fichier, nomfichier, iduti) =>
	{
		try
		{
			const formData = new FormData();
			formData.append('type', 'TICKET');
			formData.append('iduti', iduti);
			formData.append('file', fichier);
			formData.append('name', nomfichier);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "historique/CreationHistorique.php", requestOptions);

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

	const insertProdTicket = async (idprod, iduti) =>
	{
		try
		{
			const formData = new FormData();
			formData.append('idprod', idprod);
			formData.append('iduti', iduti);
			formData.append('qa', 0);
			formData.append('prixspe', prix);

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
		const regex = /SQLSTATE\[(\d+)\].+?(\d+)(.+?) in/g; // Expression régulière pour capturer le code d'erreur et le texte jusqu'à "in C:\\xampp..."
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

	function submit()
	{
		if (prix === null)
		{
			setLblErreur("Le prix est requis.");
			return;
		}
		ajtProd();
		setLblErreur("");
		setLblCat("");
		setLblProd("");
		setPrix("");
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///code html de la page des tickets
	return (
		<div>
			<Notification message={ notification.message } visible={ notification.visible } />
			<h1 className="titre">Gestion des tickets</h1>
			<div className="grpRecherche mt-4 d-flex align-items-center">
				{/* barre de recherche */ }
				<div className="col-sm-3">
					<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={ handleChange } />
				</div>
				<div className="form-check" style={ { marginLeft: '10em' } }>
					<input type='checkbox' className="check form-check-input border-secondary" id="afficherClients" checked={ checked } onChange={ handleCbChange } />
					<label className="txtcheck form-check-label" htmlFor="afficherClients">Afficher seulement les clients présents</label>
				</div>
			</div>
			<div className='h-25'>
				<Table
					header={ initialHeader }
					data={ filterData }
					keyGrayWhenFalse='present'
					appellerQuandTrier={ removeElementsByID }
				/>
			</div>
			<Modal show={ modalOpen } onHide={ () => { setModalOpen(false); setLblErreur(""); setLblCat(""); setLblProd(""); setPrix(""); } }>
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
					<input id="prix" required defaultValue={ prix } type="number" className="saisieprix" placeholder="Entrez un prix" onChange={ (event) => setPrix(event.target.value) } />
				</Modal.Body>
				<Modal.Footer>
					<label className="Error"> { lblErreur }</label>
					<Button className="btn btnAnnuler" onClick={ () => { setModalOpen(false); setLblErreur(""); setLblCat(""); setLblProd(""); setPrix(""); } }>
						Fermer
					</Button>
					<Button className="btnValidation btn" onClick={ () => submit() }></Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}