	/* eslint-disable jsx-a11y/img-redundant-alt */
	import React from "react";
	import "../style/accueil.css"
	import "../img/image.png"
	import ImageCarousel from "../components/Carousel"

	export default function accueil(){
		return(
			<div className="container">
				<div className="row justify-content-center align-items-center">
					<p className="accueil col-sm-4 ps-3 me-4">Maïtaï, Enfin une carrière à ma taille</p>
					<div className="col-md-4 mx-4">
						<ImageCarousel  />
					</div>
				</div>
			</div>
		) 
	}