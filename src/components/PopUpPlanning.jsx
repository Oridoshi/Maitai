import React, { useState, useEffect } from 'react';
import "../style/popupPlanning.css";
import Modal from 'react-bootstrap/Modal';
import Compteur from './Compteur';
import { cheminPHP } from '../components/VarGlobal.js';

export default function PopUpPlanning({ tabProd })
{
	//stockage des variables
	const [lblCat, setLblCat] = useState("");
	const [lblProd, setLblProd] = useState("");
	const [lblErreur, setLblErreur] = useState("");
	const [tabCateg, setTabCateg] = useState([]);
	const [tabProduit, setTabProduit] = useState([]);
	const [idProd,setIdProd] = useState("");

	const [qt, setQt] = useState(0);
	const [produits, setProduits] = useState(tabProd);

	useEffect(() =>
	{
		async function fetchData()
		{
			setTabCateg(await getCategProd());
		}
		fetchData();
	}, []);

	//récupère la date et l'horaire passé par la page de planning
	const date = sessionStorage.getItem('date');
	const horaire = sessionStorage.getItem('pourMatin') === '1' ? 'Matin' : 'Soir';


	function formatDate(dateString)
	{
		const date = new Date(dateString);
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		const formatter = new Intl.DateTimeFormat('fr-FR', options);
		let formattedDate = formatter.format(date);
		formattedDate = formattedDate.replace(/^\w| \w/g, function (c)
		{
			return c.toUpperCase();
		});
		return formattedDate;
	}

	function regexQt(e)
	{
		const value = e.target.value;
		e.target.value = value.replace(/[^0-9]/g, '');
	}

	/*--------------------------------------------------------------------------------------*/
	//chargement des catégories et du produits

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
		const elements = tabProduit.map(prod => (
			<li key={ prod.libprod }>
				<a className="dropdown-item" onClick={ () => {setIdProd(prod.idprod); setLblProd(prod.libprod); setLblErreur(""); } }>
					{ prod.libprod }
				</a>
			</li>
		));
		return elements;
	}
	/*--------------------------------------------------------------------------------------*/
	//gestion des produits
	async function activerProd(categorie)
	{
		setLblProd("");
		setLblErreur("");

		const produits = await getProduitByCateg(categorie);
		setTabProduit(produits);

		const btnProd = document.getElementById("btnProdCat");
		btnProd.disabled = false;
	}

	function produitExist(produit) {

		return produits.some(prod => produit.idprod === prod.idprod);
	}

	function ajtProd()
	{
		const newProduit = {idprod:idProd, categorie: lblCat, produit: lblProd, quantite: qt };
		if(produitExist(newProduit))
		{
			setLblErreur("Ce produit existe déjà !");
		}
		else
		{
			if (lblProd !== "" && lblCat !== "" && qt > 0)
			{
				// Créer un nouveau produit et l'ajouter dans le tableau de produits
				const newProduit = {idprod:idProd, categorie: lblCat, produit: lblProd, quantite: qt };
				setProduits([...produits, newProduit]);
				insertProduit(newProduit);

				// Reset les champs
				const btnProd = document.getElementById("btnProdCat");
				btnProd.disabled = true;
				setLblCat("");
				setLblProd("");
				setLblErreur("");
				setQt(0);
			} else
			{
				setLblErreur("Il manque des éléments pour ajouter un produit !");
			}
		}
	}

	function updateTabProd(index, value)
	{
		const updatedProduits = [...produits];
		updatedProduits[index].quantite = parseInt(value, 10) || 0;
		setProduits(updatedProduits);
		updateProduit(updatedProduits[index]);
	}

	function supprimerProd(index)
	{
		const prod = [...produits];
		setProduits(produits.filter((_, i) => i !== index));
		supprProduit(prod[index]);
	}

	/*---------------------------------------------------------------------------------------------------------------------------*/
	//envoie à la bado les modifications du front

	async function insertProduit(produit)
	{
		const idcli = await getIdCli();
		try
		{
			const formData = new FormData();
			formData.append('idProd', produit.idprod);
			formData.append('idUti', idcli);
			formData.append('qa', produit.quantite);
			formData.append('date', date);
			formData.append('pourMatin', sessionStorage.getItem('pourMatin'));
			formData.append('valider', false);

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "demande/CreationDemande.php", requestOptions);
			if (!response.ok)
			{
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);
			return data;
		} catch (error)
		{
			console.log(error);
			return false;
		}
	}

	async function updateProduit(produit)
	{
		const idcli = await getIdCli();
		try
		{
			const formData = new FormData();
			formData.append('idProd', produit.idprod);
			formData.append('idUti', idcli);
			formData.append('qa', produit.quantite);
			formData.append('date', date);
			formData.append('pourMatin', sessionStorage.getItem('pourMatin'));

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "demande/ModificationDemande.php", requestOptions);
			if (!response.ok)
			{
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);
			return data;
		} catch (error)
		{
			console.log(error);
			return false;
		}
	}

	async function supprProduit(produit)
	{
		const idcli = await getIdCli();
		try
		{
			const formData = new FormData();
			formData.append('idProd', produit.idprod);
			formData.append('idUti', idcli);
			formData.append('date', date);
			formData.append('pourMatin', sessionStorage.getItem('pourMatin'));

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "demande/SuppressionDemande.php", requestOptions);

			if (!response.ok)
			{
				throw new Error('Une erreur s\'est produite.');
			}

			const data = await response.text();
			afficherError(data);

			return data === ""; // Retourne true si la insert a réussi, sinon false

		} catch (error)
		{
			console.log(error);
			return false; // Retourne false en cas d'erreur
		}
	}

	//récupère toutes les catégories
	const getCategProd = async () =>
	{
		try
		{
			const formData = new FormData();
			formData.append('pourMatin', sessionStorage.getItem('pourMatin'));

			const requestOptions = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(cheminPHP + "produit/GetCateg.php", requestOptions);
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
			formData.append('dispo', horaire);

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
		}
		catch (error)
		{
			console.error('Erreur :', error);
			return [];
		}
	}

	//récupère l'identifiant en fonction du login
	async function getIdCli()
	{
		const formDataBis = new FormData();
		formDataBis.append('login', sessionStorage.getItem('login'));


		const response = await fetch(cheminPHP + "client/GetIdClient.php", {
			method: 'POST',
			body : formDataBis
		});

		if (!response.ok) {
			throw new Error('Erreur de réseau lors de la récupération des données des demandes.');
		}

		const idUti = await response.json();
		return idUti;
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

	/*---------------------------------------------------------------------------------------------------------------------------*/
	//code html de la popup

	return (
		<div>
			<Modal.Header className="titrepopup">
				<Modal.Title className="fonttitre">{ formatDate(date) + " - " + horaire }</Modal.Title>
			</Modal.Header>
			<Modal.Body className="popup">
				<div className="panelgauche">
					<label className="ErrorPopUp">{ lblErreur }</label>
					<div className="dropdown itemModal">
						<button className="btnProduit dropdown-toggle" type="button" data-bs-toggle="dropdown"
							aria-expanded="false">
							Catégorie Produit
						</button>
						<ul className="dropdown-menu">
							{renderCateg()}
						</ul>
						<label id="lblcat" className="lbl lblpopup">{ lblCat }</label>
					</div>
					<div className="dropdown itemModal">
						<button id="btnProdCat" className="btnProduit btn btn-secondary dropdown-toggle" type="button"
							data-bs-toggle="dropdown" aria-expanded="false" disabled>
							Produit
						</button>
						<ul className="dropdown-menu">
							{renderProd()}
						</ul>
						<label id="lblcat " className="lbl lblpopup">{ lblProd }</label>
					</div>
					<div className="panelbas">
						<Compteur valIni={ qt } setVal={ setQt } />
						<button className='btnValidation btn btn-primary m-3' onClick={ () => ajtProd() }></button>
					</div>
				</div>
				<div className="paneldroit">
					<h2 className="titredroit">Résumé</h2>
					{
						produits.map((produit, index) => (
							<div key={ index } className="produitResume">
								<div>- { produit.produit }</div>
								<input type="number" min="1" value={ produit.quantite } onChange={ (e) => updateTabProd(index, e.target.value) } onInput={ regexQt } className="qt" />
								<div className="grpbtn">
									<button className='btnSuppr btnResume' onClick={ () => supprimerProd(index) }></button>
								</div>
							</div>
						))
					}
				</div>
			</Modal.Body>
		</div>
	);
}
