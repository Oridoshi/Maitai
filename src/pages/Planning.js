import React from "react";

export default function Planning() {

	//sotck les droits de l'utilisateur
	const droit = sessionStorage.getItem('droit');

	// Retourne le numéro de la semaine actuelle
	function numeroSemaineActuelle(date) {
		const joursPassesAnnee = (date - new Date(date.getFullYear(), 0, 1)) / 86400000;
		const premierJourAnneeAjuste = (new Date(date.getFullYear(), 0, 1).getDay() + 6) % 7; // Ajustement du premier jour de l'année

		// Calcul du numéro de semaine
		const numeroSemaine = Math.ceil((joursPassesAnnee + premierJourAnneeAjuste + 1) / 7);

		return numeroSemaine;
	}

	//retourne la date passe en parametre au format YYYY-MM-DD
	function formatDate(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	//Affichage du planning en format de tableau
	function genererSemaine() {
		// Stock le nom des jours et des mois
		const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
		const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

		// Récupère le jour et la date actuelle
		const jourActuel = new Date().getDay();
		const dateActuelle = new Date();

		// Réorganise le tableau de jours, si on est mercredi il ira du mercredi au mardi
		const joursSemaine = [...jours.slice(jourActuel - 1), ...jours.slice(0, jourActuel - 1)];

		// Code HTML du tableau
		return (
			<table className="tabSemaine">
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
								const dateJour = new Date(dateActuelle);
								dateJour.setDate(dateActuelle.getDate() + index);

								return (
									//pour ouvrir le planing il faut un date et son horaire ( 1 = matin / 0 = soir)
									<td key={index} onClick={() => ouvrirPlanning(dateJour,1)}> </td>
								);
							})
						}
					</tr>
					<tr>
						{
							// Place chaque jour de la ligne du Soir
							joursSemaine.map((jour, index) => {
								const dateJour = new Date(dateActuelle);
								dateJour.setDate(dateActuelle.getDate() + index);

								return (
									//pour ouvrir le planing il faut un date et son horaire ( 1 = matin / 0 = soir)
									<td key={index} onClick={() => ouvrirPlanning(dateJour,0)}> </td>
								);
							})
						}
					</tr>
				</tbody>
			</table>
		);
	}

	//ouvrir planning
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
			console.log('pop-up ');
		}
	}

	//code html de la page de planning
	return (
		<div>
			<h1 className="titre">Planning semaine {numeroSemaineActuelle(new Date())}</h1>
			<div className='planning-container'>
				<div className="legend">
					<div className="itemlegend">Matin</div>
					<div className="itemlegend">Soir</div>
				</div>
				{genererSemaine()}
			</div>
		</div>
	);
}