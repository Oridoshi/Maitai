import Modal from 'react-bootstrap/Modal';
import PopUpPlanning from '../components/PopUpPlanning';
import { cheminPHP } from '../components/VarGlobal.js';
import React, { useState, useEffect } from 'react';


export default function Planning()
{

	if (sessionStorage.getItem('droit') !== 'Admin' && sessionStorage.getItem('droit') !== 'Client') window.location.href = '/';

	const [modalOpen, setModalOpen] = useState(false);
	const [data, setData] = useState({}); // Initialiser les données
	const [indexNav, setIndex] = useState({}); // Index de page pour l'admin
	const [tabProd, setTabProd] = useState();
	const [currentDate, setCurrentDate] = useState(formatDate(getLundiDeLaSemaine(new Date())));

	//sotck les droits de l'utilisateur
	const droit = sessionStorage.getItem('droit');


	/*****************************************/
	/* */
	/*****************************************/


	/** Use effect pour récupérer les données au début */
	useEffect(() =>
	{

		// Récuperer l'id de l'utilisateur
		const fetchIdUti = async () =>
		{

			const formData = new FormData();
			formData.append('login', sessionStorage.getItem('login'));


			const response = await fetch(cheminPHP + "client/GetIdClient.php", {
				method: 'POST',
				body: formData
			});

			if (!response.ok)
			{
				throw new Error('Erreur de réseau lors de la récupération des données des demandes.');
			}

			const data = await response.json();
			return data;
		}

		let idUti;
		if (droit === 'Client')
			idUti = fetchIdUti();

		// Récuperer les données de la semaines
		const fetchData = async () =>
		{

			const dateActuelle = getLundiDeLaSemaine(new Date(currentDate));

			const newData = {};
			const newIndex = {};
			await Promise.all([...Array(7).keys()].map(async (i) =>
			{
				const date = new Date(dateActuelle);
				date.setDate(dateActuelle.getDate() + i);

				const matinData = await fetchDemandeData(formatDate(date), 1, idUti);
				const soirData = await fetchDemandeData(formatDate(date), 0, idUti);

				newData[`${ i }1`] = matinData;
				newData[`${ i }0`] = soirData;

				newIndex[`${ i }1`] = 0;
				newIndex[`${ i }0`] = 0;

			}));

			setData(newData);
			setIndex(newIndex);
		};

		fetchData();
		genererSemaine();
	},[modalOpen, currentDate]);


	/**
	 * Récupérer les dats d'une demi journée.
	 * @param {*} date
	 * @param {*} pourMatin
	 * @returns
	 */
	const fetchDemandeData = async (date, pourMatin, idUti) =>
	{

		try
		{
			const formData = new FormData();

			if (droit === "Client")
			{
				const formDataBis = new FormData();
				formDataBis.append('login', sessionStorage.getItem('login'));


				const response = await fetch(cheminPHP + "client/GetIdClient.php", {
					method: 'POST',
					body: formDataBis
				});

				if (!response.ok)
				{
					throw new Error('Erreur de réseau lors de la récupération des données des demandes.');
				}

				const idUti = await response.json();
				formData.append('idUti', idUti)
			}



			// Créer un objet FormData avec la date et pourMatin
			formData.append('date', date);
			formData.append('pourMatin', pourMatin);


			const response = await fetch(cheminPHP + "demande/GetDemandes.php", {
				method: 'POST',
				body: formData
			});

			if (!response.ok)
			{
				throw new Error('Erreur de réseau lors de la récupération des données des demandes.');
			}

			const data = await response.json();

			return data;

		} catch (error)
		{
			console.error('Erreur :', error);
			return [];
		}
	};


	/*-------------------------------------------------------------------------------------------------------------------------------*/

	/**
	 * Retourne le numéro de la semaine actuelle
	 * @param {*} date
	 * @returns
	 */
	function genererTitre()
	{
		if(currentDate === "NaN-NaN-NaN"){
			setCurrentDate(formatDate(getLundiDeLaSemaine(new Date())))
		}
		const date = new Date(currentDate);

		//Calculer la date de fin de semaine (7 jours après la date actuelle)
		const finSemaine = new Date(currentDate);
		finSemaine.setDate(finSemaine.getDate() + 6);

		const today = new Date().toISOString().split('T')[0];


		return (
			<h1 className="titre">
				Planning du
				<input className="datetitre" type="date" value={ formatDate(new Date(currentDate)) } onChange={ (e) =>{ setCurrentDate(formatDate(getLundiDeLaSemaine(new Date (e.target.value)))) }} />
				<label>{ "au " + formatDateUsuel(formatDate(finSemaine)) }</label>
			</h1>
		);
	}

	/**
	 * Retourne la date passe en parametre au format YYYY-MM-DD
	 * @param {*} date
	 * @returns
	 */
	function formatDate(date)
	{
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
		const day = String(date.getDate()).padStart(2, '0');

		return `${ year }-${ month }-${ day }`;
	}

	function formatDateUsuel(inputDate)
	{
		const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
		const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

		const dateParts = inputDate.toString().split('-');
		const year = dateParts[0];
		const monthIndex = parseInt(dateParts[1]) - 1;
		const day = parseInt(dateParts[2]);

		const dateObject = new Date(inputDate);
		const dayIndex = dateObject.getDay();

		const formattedDate = `${ days[dayIndex] } ${ day } ${ months[monthIndex] } ${ year }`;

		return formattedDate;
	}


	/**
	 * Retourne la date du lundi de la semaine actuelle
	 * @param {*} date
	 * @returns
	 */
	function getLundiDeLaSemaine(date)
	{
		const jourActuel = date.getDay();
		const diff = jourActuel === 0 ? 6 : jourActuel - 1; // Si c'est dimanche (0), remonter à lundi (6 jours)
		const lundi = new Date(date);
		lundi.setDate(date.getDate() - diff);
		return lundi;
	}

	/**
	 * Affichage du planning en format de tableau
	 * @returns
	 */
	function genererSemaine()
	{
		// Stock le nom des jours et des mois
		const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
		const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];


		// Obtenez la date du lundi de la semaine actuelle
		const lundiDeLaSemaine = getLundiDeLaSemaine(new Date(currentDate));

		/** Code HTML du tableau */
		return (
			<table className={ droit === 'Admin' ? "tabSemaine mb-5" : "tabSemaine tabSemaineClient mb-5" }>
				<thead>
					<tr>
						{
							// Place chaque jour de la semaine en entête de colonne
							jours.map((jour, index) =>
							{
								// Crée une nouvelle date basée sur le lundi de la semaine actuelle et ajoute le nombre de jours qu'on a itéré
								const dateJour = new Date(lundiDeLaSemaine);
								dateJour.setDate(lundiDeLaSemaine.getDate() + index);

								return (
									<th key={ index }>
										<div className="rotate">{ jour + " " }{ dateJour.getDate() + " " }{ mois[dateJour.getMonth()] }</div>
									</th>
								);
							})
						}
					</tr>
				</thead>
				<tbody>
					<tr>
						{
							// Place chaque jour de la ligne du Matin
							jours.map((jour, index) =>
							{
								if (droit === 'Admin') return genererDemiJourAdmin(lundiDeLaSemaine, index, 1);
								else return genererDemiJourUti(lundiDeLaSemaine, index, 1);
							})
						}
					</tr>
					<tr>
						{
							// Place chaque jour de la ligne du Soir
							jours.map((jour, index) =>
							{
								if (droit === 'Admin') return genererDemiJourAdmin(lundiDeLaSemaine, index, 0);
								else return genererDemiJourUti(lundiDeLaSemaine, index, 0);
							})
						}
					</tr>
				</tbody>
			</table>
		);
	}


	/**
	 * Generer la demi journée (vue utilisateur)
	 * @param {*} dateActuelle
	 * @param {*} index
	 * @param {*} matinOuSoir
	 * @returns
	 */
	function genererDemiJourUti(date, index, matinOuSoir)
	{
		const dateJour = new Date(date);
		dateJour.setDate(date.getDate() + index);

		const obj = data["" + index + matinOuSoir] || {}; // Provide a default empty object if undefined

		let qa = 0; // Déclaration de qa en dehors du retour de la fonction

		for (let key in obj)
		{
			qa += parseInt(obj[key].qa); // Concaténation des valeurs de qa
		}

		const style = matinOuSoir === 0 ? 'matin' : 'soir';

		// Comparer la date de la case avec la date actuelle
		const dateActuelle = new Date();
		dateActuelle.setHours(0, 0, 0, 0); // Réinitialiser l'heure de la date actuelle pour ne comparer que les dates

		const estPasse = dateJour < dateActuelle;
		const classeGris = estPasse ? 'grisee' : '';

		return (
			// Pour ouvrir le planning, il faut une date et son horaire (1 = matin / 0 = soir)
			<td key={ index } onClick={ estPasse ? null : () => ouvrirPlanning(dateJour, matinOuSoir, index) } className={ `${ Object.keys(obj).length !== 0 ? style : '' } ${ classeGris }` }>
				<div className="rotate">
					{ qa !== 0 && "(" + qa + " produit.s)" }
				</div>
			</td>
		);
	}


	/**
	 * Generer la demi journée (vue administrateur)
	 * @param {*} dateActuelle
	 * @param {*} index
	 * @param {*} matinOuSoir
	 * @returns
	 */
	function genererDemiJourAdmin(dateActuelle, index, matinOuSoir)
	{
		const dateJour = new Date(currentDate);
		dateJour.setDate(dateActuelle.getDate() + index);

		const obj = data["" + index + matinOuSoir] || {}; // Provide a default empty object if undefined

		// Récupèrer dans objet l'objet a l'index correpondant
		const objTaille = Object.keys(obj).length;
		const indexObj = indexNav["" + index + matinOuSoir];
		const style = matinOuSoir === 0 ? 'matin' : 'soir';

		// Récupèrer dans objet l'objet a l'index correpondant
		const cellContent = objTaille !== 0 && (
			<div className='rotate d-flex justify-content-center align-items-center mx-2 text-center' style={ { height: '100%' } }>
				{ objTaille !== 1 && (
					<button className="btn" onClick={ (e) => { e.stopPropagation(); changerIndex(-1, "" + index + matinOuSoir); } }>
						{ "<" }
					</button>
				) }

				<div>
					{ obj[indexObj]?.login } <br />
					({ obj[indexObj]?.qa } produit.s)
				</div>

				{ objTaille !== 1 && (
					<button className="btn" onClick={ (e) => { e.stopPropagation(); changerIndex(1, "" + index + matinOuSoir); } }>
						{ ">" }
					</button>
				) }
			</div>
		);




		return (
			//pour ouvrir le planing il faut un date et son horaire ( 1 = matin / 0 = soir)

			<td key={ index } className={ Object.keys(obj).length !== 0 ? style : '' } onClick={ objTaille !== 0 ? () => ouvrirPlanning(dateJour, matinOuSoir) : undefined }>
				{ cellContent && <div>{ cellContent }</div> }
			</td>
		);
	}


	/**
	 * Changer l'index
	 * @param {*} delta
	 * @param {*} index
	 */
	function changerIndex(delta, index)
	{
		let nouvIndex = indexNav["" + index] + delta;

		const obj = data["" + index] || {}; // Provide a default empty object if undefined
		let taille = Object.keys(obj).length - 1;

		// On verifie si c'est trop grand ou trop bas
		if (nouvIndex > taille) nouvIndex = 0;
		if (nouvIndex < 0) nouvIndex = taille;

		console.log("Taille", taille)
		console.log("Index nom", index)
		console.log("Delta", delta)
		console.log("old index", indexNav["" + index])
		console.log("Nou index", nouvIndex)


		setIndex(prevIndex => ({ ...prevIndex, ["" + index]: nouvIndex }))
	}

	function ajouterSemaine()
	{
		const date = new Date(currentDate);
		date.setDate(date.getDate() + 7);
		setCurrentDate(date);
	}

	function retirerSemaine()
	{
		if(droit === 'Client')
		{
			const date = new Date(currentDate);
			date.setDate(date.getDate() - 7);

			const dateAct = new Date(getLundiDeLaSemaine(new Date()));
			dateAct.setDate(dateAct.getDate() -1 );

			if(dateAct <= date)
			{
				setCurrentDate(date);
			}
		}
		else
		{
			const date = new Date(currentDate);
			date.setDate(date.getDate() - 7);
			setCurrentDate(date);
		}
	}


	/**
	 * ouvrir planning
	 * @param {*} date
	 * @param {*} horaire
	*/
	async function ouvrirPlanning(date, horaire, index)
	{
		//stock la date et l'horaire selectionne
		sessionStorage.setItem('date', formatDate(date));
		sessionStorage.setItem('pourMatin', horaire);

		//ouvre la page de planning des admin
		if (droit === 'Admin')
		{
			window.location.href = "/resume";
		}

		//ouvre la pop-up de réservation des clients
		if (droit === 'Client')
		{
			const tab = data[index + "" + horaire];
			const newTabProd = [];
			tab.forEach(elt =>
			{
				const prod = {
					idprod: elt.idprod,
					categorie: elt.categorie,
					produit: elt.libprod,
					quantite: elt.qa
				};
				newTabProd.push(prod);
			});
			setTabProd(newTabProd);
			setModalOpen(true);
		}
	}

	let classbtn = 'btnSprec';
	if(new Date(currentDate) < new Date() && droit != "Admin")
	{
		classbtn = 'btnSprecGris' ;
	}
	/** Code html de la page de planning */
	return (
		<div>
			{ genererTitre() }
			<div className="blocksemaine">
				<button className={classbtn} onClick={retirerSemaine}></button>
				<div className='planning-container mb-5 block'>
					<div className="legend">
						<div className="itemlegend">Matin</div>
						<div className="itemlegend">Soir</div>
					</div>
					{ genererSemaine() }
				</div>
				<button className="btnSsuiv" onClick={ajouterSemaine} ></button>
			</div>
			<Modal className="pop" show={ modalOpen } onHide={ () => { setModalOpen(false); } }>
				<PopUpPlanning tabProd={ tabProd } />
			</Modal>
		</div>
	);
}