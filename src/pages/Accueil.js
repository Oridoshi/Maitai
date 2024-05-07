	/* eslint-disable jsx-a11y/img-redundant-alt */
	import React from "react";
	import "../style/accueil.css"
	import ImageCarousel from "../components/Carousel"

	export default function accueil(){
		return(
			<div className="container">
				<div className="row justify-content-center align-items-center">
					<p className="accueil col-sm-4 espacement">Maïtaï, Enfin une carrière à ma taille</p>
					<div className="col-md-4">
						<ImageCarousel  />
					</div>
				</div>
			</div>
		) 
	}