import React, { useState } from 'react';
import "../style/popupPlanning.css";
import Modal from 'react-bootstrap/Modal';
import Compteur from './Compteur';

export default function PopUpPlanning()
{
	//stockage des variables
	const [lblCat, setLblCat] = useState("");
	const [lblProd, setLblProd] = useState("");
	const [lblErreur, setLblErreur] = useState("");
	const [qt, setQt] = useState(0);
	const [produits, setProduits] = useState([]);

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

	function regexQt(e) {
		const value = e.target.value;
		e.target.value = value.replace(/[^0-9]/g, '');
	}

	/*--------------------------------------------------------------------------------------*/
	//gestion des produits
	function activerProd(categorie)
	{
		setLblProd("");
		setLblErreur("");
		const btnProd = document.getElementById("btnProdCat");
		btnProd.disabled = false;
	}

	function ajtProd()
	{
		if (lblProd !== "" && lblCat !== "" && qt > 0)
		{
			// Créer un nouveau produit et l'ajouter dans le tableau de produits
			const newProduit = { categorie: lblCat, produit: lblProd, quantite: qt };
			setProduits([...produits, newProduit]);

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

	function updateTabProd(index, value)
	{
		const updatedProduits = produits.map((produit, i) => {
			if (i === index) {
				return { ...produit, quantite: parseInt(value, 10) || 0 };
			}
			return produit;
		});
		setProduits(updatedProduits);
	}

	function supprimerProd(index)
	{
		setProduits(produits.filter((_, i) => i !== index));
	}
	/*---------------------------------------------------------------------------------------------------------------------------*/
	//envoie à la bado les modifications du front

	async function getProduits()
	{

	}

	async function insertProduit()
	{

	}

	async function updateProduit()
	{

	}

	async function supprProduit()
	{

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
							<li key="plongée">
								<a className="dropdown-item" onClick={ () => { setLblCat("plongée"); activerProd("plongée"); } }>
									plongée
								</a>
								<a className="dropdown-item" onClick={ () => { setLblCat("livre"); activerProd("livre"); } }>
									livre
								</a>
							</li>
						</ul>
						<label id="lblcat" className="lbl lblpopup">{ lblCat }</label>
					</div>
					<div className="dropdown itemModal">
						<button id="btnProdCat" className="btnProduit btn btn-secondary dropdown-toggle" type="button"
							data-bs-toggle="dropdown" aria-expanded="false" disabled>
							Produit
						</button>
						<ul className="dropdown-menu">
							<li key="plongée">
								<a className="dropdown-item" onClick={ () => { setLblProd("plongée"); setLblErreur(""); } }>
									plongée
								</a>
								<a className="dropdown-item" onClick={ () => { setLblProd("livre"); setLblErreur(""); } }>
									livre
								</a>
							</li>
						</ul>
						<label id="lblcat " className="lbl lblpopup">{ lblProd }</label>
					</div>
					<div className="panelbas">
						<Compteur valIni={ qt } setVal={ setQt } />
						<button className='btnAjouter btn btn-primary m-3' onClick={ () => ajtProd() }></button>
					</div>
				</div>
				<div className="paneldroit">
					<h2 className="titredroit">Résumé</h2>
					{
						produits.map((produit, index) => (
							<div key={ index } className="produitResume">
								<div>- { produit.produit }</div>
								<input type="number" min="1" value={ produit.quantite } onChange={ (e) => updateTabProd(index, e.target.value) }  onInput={ regexQt } className="qt"/>
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
