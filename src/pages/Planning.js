import Modal from 'react-bootstrap/Modal';
import PopUpPlanning from '../components/PopUpPlanning';
import { cheminPHP } from '../components/VarGlobal.js'; 
import React, { useState, useEffect } from 'react';


export default function Planning() {
	
	if(sessionStorage.getItem('droit') !== 'Admin'&& sessionStorage.getItem('droit') !== 'Client') window.location.href = '/';

	const [modalOpen, setModalOpen] = useState(false);
	const [data, setData] = useState({}); // Initialiser les données

	//sotck les droits de l'utilisateur
	const droit = sessionStorage.getItem('droit');




	/*****************************************/
	/* */
	/*****************************************/


	/** Use effect pour récupérer les données au début */
	useEffect(() => {

		// Récuperer l'id de l'utilisateur
		const fetchIdUti = async () => {

			const formData = new FormData();
			formData.append('login', sessionStorage.getItem('login'));


			const response = await fetch(cheminPHP + "client/GetIdClient.php", {
				method: 'POST',
				body : formData
			});

			if (!response.ok) {
				throw new Error('Erreur de réseau lors de la récupération des données des demandes.');
			}

			const data = await response.json();
			return data;
		}

		let idUti;
		if (droit === 'Client')
			idUti = fetchIdUti();




		// Récuperer les données de la semaines 
        const fetchData = async () => {
            const dateActuelle = new Date();

            const newData = {};
            await Promise.all([...Array(7).keys()].map(async (i) => {
                const date = new Date(dateActuelle);
                date.setDate(dateActuelle.getDate() + i);

                const matinData = await fetchDemandeData(formatDate(date), 1, idUti);
                const soirData  = await fetchDemandeData(formatDate(date), 0, idUti);

                newData[`${i}1`] = matinData;
                newData[`${i}0`] = soirData;
            }));

            setData(newData);
        };

        fetchData();

    }, []);



	/**
	 * Récupérer les dats d'une demi journée.
	 * @param {*} date 
	 * @param {*} pourMatin 
	 * @returns 
	 */
	const fetchDemandeData = async (date, pourMatin, idUti) => {

		try {
			const formData = new FormData();

			if (droit === "Client")
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
				formData.append('idUti', idUti)
			}



			// Créer un objet FormData avec la date et pourMatin
			formData.append('date'     , date     );
			formData.append('pourMatin', pourMatin);


			const response = await fetch(cheminPHP + "demande/GetDemandes.php", {
				method: 'POST',
				body : formData
			});

			if (!response.ok) {
				throw new Error('Erreur de réseau lors de la récupération des données des demandes.');
			}

			const data = await response.json();

			return data;

		} catch (error) {
			console.error('Erreur :', error);
			return [];
		}
	};



	
	/**
	 * Retourne le numéro de la semaine actuelle
	 * @param {*} date 
	 * @returns 
	 */
	function numeroSemaineActuelle(date) {
		const joursPassesAnnee = (date - new Date(date.getFullYear(), 0, 1)) / 86400000;
		const premierJourAnneeAjuste = (new Date(date.getFullYear(), 0, 1).getDay() + 6) % 7; // Ajustement du premier jour de l'année

		// Calcul du numéro de semaine
		const numeroSemaine = Math.ceil((joursPassesAnnee + premierJourAnneeAjuste + 1) / 7);

		return numeroSemaine;
	}



	/**
	 * Retourne la date passe en parametre au format YYYY-MM-DD
	 * @param {*} date 
	 * @returns 
	 */
	function formatDate(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}



	/**
	 * Affichage du planning en format de tableau
	 * @returns 
	 */
	function genererSemaine() {
		// Stock le nom des jours et des mois
		const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
		const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

		// Récupère le jour et la date actuelle
		const jourActuel = new Date().getDay();
		const dateActuelle = new Date();

		// Réorganise le tableau de jours, si on est mercredi il ira du mercredi au mardi
		const joursSemaine = [...jours.slice(jourActuel - 1), ...jours.slice(0, jourActuel - 1)];

		/** Code HTML du tableau */
		return (
			<table className="tabSemaine mb-5">
				<thead>
					<tr>
						{
							// Place chaque jour de la semaine en entête de colonne
							joursSemaine.map((jour, index) => {
								// Crée une nouvelle date basée sur la date actuelle et ajoute le nombre de jour qu'on a iterre
								const dateJour = new Date(dateActuelle);
								dateJour.setDate(dateActuelle.getDate() + index);

								return (
									<th key={index}>
										<div className="rotate">{jour + " "}{dateJour.getDate() + " "}{mois[dateJour.getMonth()]}</div>
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
							joursSemaine.map((jour, index) => {
								if (droit === 'Admin') return genererDemiJourAdmin(dateActuelle, index, 1)
								else                   return genererDemiJourUti  (dateActuelle, index, 1)
							})
						}
						</tr>
					<tr>
						{
							// Place chaque jour de la ligne du Soir
							joursSemaine.map((jour, index) => {
								if (droit === 'Admin') return genererDemiJourAdmin(dateActuelle, index, 0)
								else                   return genererDemiJourUti  (dateActuelle, index, 0)
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
	function genererDemiJourUti(dateActuelle, index, matinOuSoir)
	{
		const dateJour = new Date(dateActuelle);
		dateJour.setDate(dateActuelle.getDate() + index);

		const obj = data[ "" + index + matinOuSoir] || {}; // Provide a default empty object if undefined

		let qa = 0; // Déclaration de qa en dehors du retour de la fonction

		for (let key in obj) 
			qa += parseInt(obj[key].qa); // Concaténation des valeurs de qa
		
		return (
			//pour ouvrir le planing il faut un date et son horaire ( 1 = matin / 0 = soir)
			
			<td key={index} onClick={() => ouvrirPlanning(dateJour, matinOuSoir)} className={'text-center'} style={Object.keys(obj).length !== 0 ? {background: '#B2DADD'} : {}}> 
				<div className="rotate"> 
					{qa !== 0 && qa + " Produit(s)"} {/* Affiche qa seulement si il n'est pas égal à 0 */}

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
		const dateJour = new Date(dateActuelle);
		dateJour.setDate(dateActuelle.getDate() + index);

		const obj = data[ "" + index + matinOuSoir] || {}; // Provide a default empty object if undefined

		const objVide = Object.keys(obj).length !== 0;

		return (
			//pour ouvrir le planing il faut un date et son horaire ( 1 = matin / 0 = soir)
			
			{ Object.keys(obj).length !== 0 ? (
					<td key={index} onClick={() => ouvrirPlanning(dateJour, matinOuSoir)} className={'text-center'} style={Object.keys(obj).length !== 0 ? {background: '#B2DADD'} : {}}> 
						<div className="rotate"> 
							
							

						</div>
					</td>

				) : (
					<td> </td>
				)
			}
		);
	}

	const [index, setIndex] = useState()



	/**
	 * ouvrir planning
	 * @param {*} date 
	 * @param {*} horaire 
	 */
	function ouvrirPlanning(date,horaire)
	{
		//stock la date et l'horaire selectionne
		sessionStorage.setItem('date',formatDate(date));
		sessionStorage.setItem('pourMatin',horaire);

		//ouvre la page de planning des admin
		if(droit === 'Admin')
		{
			window.location.href = "/resume";
		}

		//ouvre la pop-up de réservation des clients
		if(droit === 'Client')
		{
			setModalOpen(true);
		}
	}

	/** Code html de la page de planning */
	return (
		<div>
			<h1 className="titre">Planning semaine {numeroSemaineActuelle(new Date())}</h1>
			<div className='planning-container mb-5'>
				<div className="legend">
					<div className="itemlegend">Matin</div>
					<div className="itemlegend">Soir</div>
				</div>
				{genererSemaine()}
			</div>
			<Modal show={ modalOpen } onHide={ () => { setModalOpen(false);} }>
				<PopUpPlanning/>
			</Modal>
		</div>
	);
}