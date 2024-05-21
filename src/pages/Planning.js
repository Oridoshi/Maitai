import React from "react";

export default function Planning()
{
	const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
	const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	function genererSemaine()
	{
		const jourActuel = new Date().getDay(); // Récupérer le jour actuel (0: Dimanche, 1: Lundi, ..., 6: Samedi)
		const dateActuelle = new Date();
		const joursSemaine = [...jours.slice(jourActuel), ...jours.slice(0, jourActuel)]; // Réorganiser les jours pour commencer par le jour actuel

		return (
			<table className="tabSemaine">
				<thead>
					<tr>
						{ joursSemaine.map((jour, index) =>
						{
							const dateJour = new Date(dateActuelle);
							dateJour.setDate(dateJour.getDate() + index); // Ajouter l'index pour obtenir la date de chaque jour de la semaine
							return (
								<th key={ index }>
									<div className="rotate">{ jour + " "}{ dateJour.getDate() +" "} { mois[dateJour.getMonth()] }</div>
								</th>
							);
						}) }
					</tr>
				</thead>
				<tbody>
					<tr>
						{ joursSemaine.map((jour, index) => (
							<td key={ index }> </td>
						)) }
					</tr>
					<tr>
						{ joursSemaine.map((jour, index) => (
							<td key={ index }></td>
						)) }
					</tr>
				</tbody>
			</table>
		);
	}

	//retourne le numéro de la semaine actuelle
	function numeroSemaineActuelle(date)
	{
		const joursPassesAnnee = (date - new Date(date.getFullYear(), 0, 1)) / 86400000;
		const premierJourAnneeAjuste = (new Date(date.getFullYear(), 0, 1).getDay() + 6) % 7; // Ajustement du premier jour de l'année

		// Calcul du numéro de semaine
		const numeroSemaine = Math.ceil((joursPassesAnnee + premierJourAnneeAjuste + 1) / 7);

		return numeroSemaine;
	}

	return (
		<div>
			<h1 className="titre">Planning semaine { numeroSemaineActuelle(new Date()) }</h1>
			<div className='planning-container'>
				<div className="legend">
					<div className="itemlegend">Matin</div>
					<div className="itemlegend">Soir</div>
				</div>
				{ genererSemaine() }
			</div>
		</div>
	);
}
