import React, { useState, useEffect } from 'react'; // Importez useState ici
import "../style/accueil.css"
import ImageCarousel from "../components/Carousel"
import { cheminPHP } from '../components/VarGlobal.js';

export default function Accueil(){
	const [txt, setTxt] = useState([]);

	useEffect(() => {
		fetch(cheminPHP + "config/GetTxtAcceuil.php")
			.then((response) => {
				return response.text()
			})
			.then((data) => {
				const lignes = data.split("\n").filter(line => !line.startsWith(';'))
				setTxt(lignes.join(" "));
			})
			.catch((error) => {
				console.error("Une erreur s'est produite :", error);
			});
	}, []);
	// const txt = "Maïtaï, Enfin une carrière à ma taille";

	return(
		<div className="allaccueil">
			<div className="accueil">
				<div className="textAccueil">{txt}</div>
				<div className="imgAcceuil">
					<ImageCarousel  />
				</div>
			</div>
		</div>
	)
}