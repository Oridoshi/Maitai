import React from "react";
import Compteur from "../components/Compteur";

export default function accueil(){
	return(
		<div className="container">
			<h1>C'est l'accueil</h1>
			<h2>ici je test mes composants</h2>
			<Compteur />
		</div>
	)
}