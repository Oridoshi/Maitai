import React from "react";
import "../style/accueil.css"
import "../img/image.png"

export default function accueil(){
	return(
		<div className="container">
	<div className="row justify-content-start align-items-center">
		<h1 className="accueil col-sm-4 ps-3">Maïtaï, Enfin une carrière à ma taille</h1>
		<p className="col"></p>
		<img src={require("../img/image.png")} alt="carrière" className="custom-img col" />
	</div>
	</div>


	) 
}