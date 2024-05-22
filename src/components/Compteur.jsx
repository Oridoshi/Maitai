import React, { useState } from "react";
import '../style/compteur.css';

const Compteur = ({ valIni = 0, updateTotComm, idprod,iduti,prixspe}) =>
{
	const [valeur, setVal] = useState(valIni);

	// Fonction pour incrémenter le score
	const augmente = () =>{
		if(valeur < 1000){
			setVal(val => val + 1);
			updateTotComm(idprod,iduti,valeur+1,prixspe);
		}
	};

	// Fonction pour décrémenter le score
	const diminue = () =>{
		if(valeur > 0){
			setVal(val => val - 1);
			updateTotComm(idprod,iduti,valeur-1,prixspe);
		}
	};

	return (
		<div className="compteur">
			<button className="inc"onClick={()=> {diminue();} }>-</button>
				<div className="valeur">{ valeur }</div>
			<button className="inc"onClick={()=>{augmente();} }>+</button>
		</div>
	);
};

export default Compteur