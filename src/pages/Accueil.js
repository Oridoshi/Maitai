import React from "react";
import "../style/accueil.css"
import "../img/image.png"

export default function accueil(){
	return(
		<div className="container">
			<div class="row justify-content-start">
				<h1 className="accueil col-sm-4">Maïtaï, Enfin une carrière à ma taille</h1>
	
				<img src={require("../img/image.png")} alt="carrière" className="img-fluid col-sm-8"/>
			</div>		
		</div>
	) 
}