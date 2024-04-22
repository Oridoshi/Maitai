import React, { useState } from "react";
import '../style/compteur.css';

const Compteur = ({ valIni = 0 }) =>
{
	const [valeur, setVal] = useState(valIni);

	// Fonction pour incrémenter le score
	const augmente = () =>{
		if(valeur < 1000){
			setVal(val => val + 1);
		}
	};

	// Fonction pour décrémenter le score
	const diminue = () =>{
		if(valeur > 0){
			setVal(val => val - 1);
		}
	};

	const getVal = () =>{
		return valeur;
	};

	return (
		<div className="compteur">
			<button className="inc"onClick={ diminue }>-</button>
				<div className="valeur">{ valeur }</div>
			<button className="inc"onClick={ augmente }>+</button>
		</div>
	);
};

export default Compteur