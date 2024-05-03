	/* eslint-disable jsx-a11y/img-redundant-alt */
	import React from "react";
	import "../style/accueil.css"
	import "../img/image.png"
	import ImageCarousel from "../components/Carousel"

	export default function accueil(){
		return(
			<div className="container">
				<div className="row justify-content-start align-items-center">
					<p className="accueil col-sm-4 ps-3">Maïtaï, Enfin une carrière à ma taille</p>
					<p className="col"></p>
					<div className="col-md-4">
						<ImageCarousel  />
					</div>
				</div>
				
				{/* <div className="container">
					<div className="row">
						<div className="col-md-4">
							<img src={require("../img/image1.png")} className="img-fluid" alt="Image 1" />
						</div>
						<div className="col-md-4">
							<img src={require("../img/image2.png")} className="img-fluid" alt="Image 2" />
						</div>
					</div>
				</div> */}
			</div>


		) 
	}