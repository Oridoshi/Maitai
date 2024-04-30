import React, { useState, useEffect } from 'react';

function FicheSecu() {





	/**********************************************************************/
	/*                                                                    */
	/*                           INITIALISATION                           */
	/*                                                                    */
	/**********************************************************************/

	const etapesLib = ['En tête', 'Avant-plongée', 'Après-plongée'];
	const [etape, setEtape] = useState(0);
	const [formData, setFormData] = useState({});

	// Get the stored form data from sessionStorage when the component mounts
	useEffect(() => {
		const storedFormData = sessionStorage.getItem('formData');
		if (storedFormData) {
			setFormData(JSON.parse(storedFormData));
		}
	}, []);

	function getCurrentDate() {
		const today = new Date();
		const year = today.getFullYear();
		let month = today.getMonth() + 1;
		let day = today.getDate();

		// Format the month and day to have leading zeros if necessary
		if (month < 10) {
			month = '0' + month;
		}
		if (day < 10) {
			day = '0' + day;
		}

		return `${year}-${month}-${day}`;
	}
	





	/**********************************************************************/
	/*                                                                    */
	/*                     GENERATION DE FORUMULAIRE                      */
	/*                                                                    */
	/**********************************************************************/


	/**
	 * Genere le formulaire pour l'en tête.
	 * @returns 
	 */
	function GeneratehtmlFormEnTete()
	{
		return (
			<div className='mt-5'>

				<div className="row ms-4">
					<div className="col col-sm-3 m-2 ">
						<div className="d-flex align-items-center">
							<label htmlFor="date" className="me-2 fw-bold">Date</label>
							<input type="date" className="form-control" name='date' id="date" defaultValue={getCurrentDate()} required/>
						</div>
					</div>

					<div className="col col-sm-6 m-2 ms-5">
						<div className="d-flex align-items-center">
							<label htmlFor="lieu" className="me-2 fw-bold">Lieu</label>
							<input type="text" className="form-control" name='lieu' id="lieu" readOnly value="CARRIERE DE BECON LES GRANITS . chemin des coteaux, 49370 BECON LES GRANITS"/>
						</div>
					</div>

					<div className="col col-sm-7 m-2 mt-3">
						<div className="d-flex align-items-center">
							<label htmlFor="club" className="me-2 fw-bold">Club</label>
							<input type="text" className="form-control" name='club' id="club" readOnly value={sessionStorage.getItem('login')}/>
						</div>
					</div>
				</div>



				<div className="row ms-4">
					<div className="col-sm-5 ms-4 mt-5 me-5">
						<div className="d-flex">
							<label className="fw-bold col-sm-3 ms-1">Role</label>
							<label className="fw-bold col-sm-3"     >Nom</label>
							<label className="fw-bold col-sm-3"     >Prenom</label>
							<label className="fw-bold col-sm-3"     >Niveau</label>
						</div>

						<div className="d-flex align-items-center">
							<input type="text" className="form-control p-1 m-1"                   id="dp"       value="DP"                                                               required readOnly/>
							<input type="text" className="form-control p-1 m-1" name="dpnom"     id="dpnom"    defaultValue={sessionStorage.getItem("dpnom")}    placeholder="Nom"      required         />
							<input type="text" className="form-control p-1 m-1" name="dpprenom"  id="dpprenom" defaultValue={sessionStorage.getItem("dpprenom")} placeholder="Prenom"   required         />
							<input type="text" className="form-control p-1 m-1" name="dpniveau"  id="dpniveau" defaultValue={sessionStorage.getItem("dpniveau")} placeholder="Niveau"   required         />
						</div>
						<div className="d-flex align-items-center">
							<input type="text" className="form-control p-1 m-1"                  id="ss1"       value="SECU.SURF"                                                        required  readOnly/>
							<input type="text" className="form-control p-1 m-1" name="ss1nom"    id="ss1nom"    placeholder="Nom"    defaultValue={sessionStorage.getItem("ss1nom")}     required          />
							<input type="text" className="form-control p-1 m-1" name="ss1prenom" id="ss1prenom" placeholder="Prenom" defaultValue={sessionStorage.getItem("ss1prenom")}  required          />
							<input type="text" className="form-control p-1 m-1" name="ss1niveau" id="ss1niveau" placeholder="Niveau" defaultValue={sessionStorage.getItem("ss1niveau")}  required          />
						</div>
						<div className="d-flex align-items-center">
							<input type="text" className="form-control p-1 m-1"                  id="ss2"       value="SECU.SURF"                                                        required readOnly/>
							<input type="text" className="form-control p-1 m-1" name="ss2nom"    id="ss2nom"    placeholder="Nom"    defaultValue={sessionStorage.getItem("ss2nom")}     required         />
							<input type="text" className="form-control p-1 m-1" name="ss2prenom" id="ss2prenom" placeholder="Prenom" defaultValue={sessionStorage.getItem("ss2prenom")}  required         />
							<input type="text" className="form-control p-1 m-1" name="ss2niveau" id="ss2niveau" placeholder="Niveau" defaultValue={sessionStorage.getItem("ss2niveau")}  required         />
						</div>
						<div className="d-flex align-items-center">
							<input type="text" className="form-control p-1 m-1"                  id="tel"       value="TELEPHONE"                                                        required readOnly/>
							<input type="text" className="form-control p-1 m-1" name="telnom"    id="telnom"    placeholder="Nom"    defaultValue={sessionStorage.getItem("telnom")}     required         />
							<input type="text" className="form-control p-1 m-1" name="telprenom" id="telprenom" placeholder="Prenom" defaultValue={sessionStorage.getItem("telprenom")}  required         />
							<input type="text" className="form-control p-1 m-1" name="telniveau" id="telniveau" placeholder="Niveau" defaultValue={sessionStorage.getItem("telniveau")}  required         />
						</div>
					</div>


					<div className="col-sm-5 ms-4 mt-4 ms-5">
						<div className="d-flex align-items-center mt-5">
							<label htmlFor="pa12" className="fw-bold col-sm-4 m-1">PA12 : NON AUTORISE</label>
							<input type="text"    className="form-control p-1 m-1" name='pa12' id="pa12" required />
						</div>

						<div className="d-flex align-items-center">
							<label htmlFor="secu" className="fw-bold col-sm-4 m-1">Bloc de secu</label>
							<input type="text"    className="form-control p-1 m-1" name='secu' id="secu" required />
						</div>

						<div className="d-flex align-items-center">
							<label htmlFor="o2" className="fw-bold col-sm-4 m-1">O2</label>
							<input type="text"  className="form-control p-1 m-1" name='o2' id="o2" required />
						</div>
					</div>
				</div>
			</div>
		);
	}

	


	/**
	 * Genere le formulaire pour le formulaire d'avant plongee.
	 * @returns 
	 */
	function GeneratehtmlFormAvantPlongee() { return (<div>GeneratehtmlFormAvantPlongee</div>)}

	


	/**
	 * Genere le formulaire pour le formulaire d'après plongee.
	 * @returns 
	 */
	function GeneratehtmlFormApresPlongee() { return (<div>GeneratehtmlFormApresPlongee</div>)}






	/**********************************************************************/
	/*                                                                    */
	/*                    GESTION DES FORMULAIRES                         */
	/*                                                                    */
	/**********************************************************************/

	// Function to handle going to the next step
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		// Créer un objet pour stocker les valeurs du formulaire
		const formValues = {};

		// Parcourir toutes les entrées du formulaire
		for (let [key, value] of formData.entries()) {
			sessionStorage.setItem(key, value);
			formValues[key] = value;
		}

		// Afficher les valeurs du formulaire dans la console
		console.log("Form Data:", formValues);
		setEtape(etape + 1);
	};



	// Function to handle going to the previous step
	function etapePrecedente() {
		setEtape(etape - 1);
	}

	return (
		<div className="col-sm-12" style={{ overflowX: 'hidden' }}>
			<h1 className='titre mt-1'>Création d'une fiche de sécurité - {etapesLib[etape]}</h1>

			<form onSubmit={handleSubmit}>
				{/* Pass formData and setFormData to the GeneratehtmlForm component */}
				{etapesLib[etape] === 'En tête'       && <GeneratehtmlFormEnTete />}
				{etapesLib[etape] === 'Avant-plongée' && <GeneratehtmlFormAvantPlongee />}
				{etapesLib[etape] === 'Après-plongée' && <GeneratehtmlFormApresPlongee />}

				<div className="m-5 d-flex justify-content-end">
					{etape !== 0 &&
						<button className="mx-2 col-sm-1 btn btn-secondary" onClick={etapePrecedente}>Précédent</button>
					}
					{etape < etapesLib.length - 1 &&
						<button className="mx-2 col-sm-1 btn btn-primary" type="submit">Suivant</button>
					}
				</div>
			
			
			
			</form>
		</div>
	);
}

export default FicheSecu;
