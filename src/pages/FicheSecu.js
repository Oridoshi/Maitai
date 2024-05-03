import React, { useState } from 'react';
import { nivEncadrant,nivGeneral } from '../components/VarGlobal.js';  


function FicheSecu() {





	/**********************************************************************/
	/*                                                                    */
	/*                           INITIALISATION                           */
	/*                                                                    */
	/**********************************************************************/

	const etapesLib = ['En tête', 'Palanquée', 'Réalisé', 'Appercue final'];
	const [etape, setEtape] = useState(0);

	const [nombrePlaques    , setNombrePlaques    ] = useState(1);
	const [encadreOuNon     , setEncadre          ] = useState({});
	const [peutValide       , setValide           ] = useState(false);


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
	function generatehtmlFormEnTete()
	{
		return (
			<div className='mt-5'>

				<div className="row ms-4">
					<div className="col col-sm-3 m-2 ">
						<div className="d-flex align-items-center">
							<label htmlFor="date" className="me-2 fw-bold">Date</label>
							<input type="date" className="form-control" name='date' id="date" readOnly defaultValue={getCurrentDate()} required/>
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
							<input type="text" className="form-control p-1 m-1"                  id="dp"       value="DP"                                                 readOnly/>
							<input type="text" className="form-control p-1 m-1" name="dpnom"     id="dpnom"    placeholder="Nom"    onChange={() => handleChangeEnTete()}         />
							<input type="text" className="form-control p-1 m-1" name="dpprenom"  id="dpprenom" placeholder="Prenom" onChange={() => handleChangeEnTete()}         />
							<input type="text" className="form-control p-1 m-1" name="dpniveau"  id="dpniveau" placeholder="Niveau" onChange={() => handleChangeEnTete()}         />
						</div>
						<div className="d-flex align-items-center">
							<input type="text" className="form-control p-1 m-1"                  id="ss1"       value="SECU.SURF"                                           readOnly/>
							<input type="text" className="form-control p-1 m-1" name="ss1nom"    id="ss1nom"    placeholder="Nom"    onChange={() => handleChangeEnTete()}          />
							<input type="text" className="form-control p-1 m-1" name="ss1prenom" id="ss1prenom" placeholder="Prenom" onChange={() => handleChangeEnTete()}          />
							<input type="text" className="form-control p-1 m-1" name="ss1niveau" id="ss1niveau" placeholder="Niveau" onChange={() => handleChangeEnTete()}          />
						</div>
						<div className="d-flex align-items-center">
							<input type="text" className="form-control p-1 m-1"                  id="ss2"       value="SECU.SURF"                                          readOnly/>
							<input type="text" className="form-control p-1 m-1" name="ss2nom"    id="ss2nom"    placeholder="Nom"    onChange={() => handleChangeEnTete()}         />
							<input type="text" className="form-control p-1 m-1" name="ss2prenom" id="ss2prenom" placeholder="Prenom" onChange={() => handleChangeEnTete()}         />
							<input type="text" className="form-control p-1 m-1" name="ss2niveau" id="ss2niveau" placeholder="Niveau" onChange={() => handleChangeEnTete()}         />
						</div>
						<div className="d-flex align-items-center">
							<input type="text" className="form-control p-1 m-1"                  id="tel"       value="TELEPHONE"                                          readOnly/>
							<input type="text" className="form-control p-1 m-1" name="telnom"    id="telnom"    placeholder="Nom"    onChange={() => handleChangeEnTete()}         />
							<input type="text" className="form-control p-1 m-1" name="telprenom" id="telprenom" placeholder="Prenom" onChange={() => handleChangeEnTete()}         />
							<input type="text" className="form-control p-1 m-1" name="telniveau" id="telniveau" placeholder="Niveau" onChange={() => handleChangeEnTete()}         />
						</div>
					</div>


					<div className="col-sm-5 ms-4 mt-4 ms-5">
						<div className="d-flex align-items-center mt-5">
							<label htmlFor="pa12" className="fw-bold col-sm-4 m-1">PA12 : NON AUTORISE</label>
							<input type="text"    className="form-control p-1 m-1" onChange={() => handleChangeEnTete()} name='pa12' id="pa12" required/>
						</div>

						<div className="d-flex align-items-center">
							<label htmlFor="secu" className="fw-bold col-sm-4 m-1">Bloc de secu</label>
							<input type="text"    className="form-control p-1 m-1" onChange={() => handleChangeEnTete()} name='secu' id="secu" required/>
						</div>

						<div className="d-flex align-items-center">
							<label htmlFor="o2" className="fw-bold col-sm-4 m-1">O2</label>
							<input type="text"  className="form-control p-1 m-1" onChange={() => handleChangeEnTete()} name='o2' id="o2" required/>
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
	function generatehtmlFormPalanquee() 
	{
		
		return (
			<div className='mt-5'>
				{
					//Pour chaque plaque on les génère.
					Array(nombrePlaques).fill().map((_, index) => generatePalanquee(index + 1))
				}
			</div>
		);
	}




	function generatePalanquee (num)
	{
		return (
			<div id={`palanque${num}`} className='row ms-4 mb-5'>

				<div className='d-flex'>
					<h3 className='col-sm-6'             > Palanquée {num} </h3>
					<h5 className='fw-bold col-sm-1 ms-5'> Cocher      </h5>
					<h5 className='fw-bold col-sm-2 ms-3'> Prevu       </h5>
				</div>


				<div className='ms-3'>
					<div className="d-flex">
						<label className="col-sm-2 ms-1">Nom          </label>
						<label className="col-sm-2"     >Prenom       </label>
						<label className="col-sm-2"     >Aptitude     </label>
						<label className="col-sm-1 ms-4">Tech | Explo </label>
						<label className="col-sm-1 ms-4">Profondeur   </label>
						<label className="col-sm-1 ms-2">Durée        </label>
					</div>



					<div className="d-flex align-items-center col-sm-12">
						<div className="d-flex align-items-center col-sm-6">
							<input type="text" className={`form-control p-1 m-1 ${encadreOuNon[num] ? 'bg-secondary text-light' : ''}`} name={`p${num}Anom`}    id={`p${num}Anom`}    onChange={() => handleChangePlaquee(num)} placeholder="Nom"   />
							<input type="text" className={`form-control p-1 m-1 ${encadreOuNon[num] ? 'bg-secondary text-light' : ''}`} name={`p${num}Aprenom`} id={`p${num}Aprenom`} onChange={() => handleChangePlaquee(num)} placeholder="Prénom"/>
							{encadreOuNon[num] ? generateList(nivEncadrant, num, 'A') : generateList(nivGeneral, num, 'A')}
						</div>

						
						<div className='d-flex align-items-center col-sm-1 ms-5'>
							<input className='me-2'         type="radio" name={`p${num}type`} onChange={() => handleChangePlaquee(num)} value="tech" ></input> |
							<input className='ms-2'         type="radio" name={`p${num}type`} onChange={() => handleChangePlaquee(num)} value="explo"></input> 
						</div>
						
						<div className='d-flex align-items-center col-sm-2'>
							<input type="number" min="0" className="form-control p-1 me-3" name={`prof${num}`}  id={`prof${num}`} onChange={() => handleChangePlaquee(num)} placeholder="En mètre" />
							<input type="number" min="0" className="form-control p-1 ms-1" name={`temp${num}`}  id={`temp${num}`} onChange={() => handleChangePlaquee(num)} placeholder="En minute"/>
						</div>
					</div>



					<div className="d-flex align-items-center col-sm-12 mt-3">
						<div className="d-flex align-items-center col-sm-6">
							<input type="text" className="form-control p-1 m-1" name={`p${num}Bnom`}    id={`p${num}Bnom`}    onChange={() => handleChangePlaquee(num)} placeholder="Nom"   />
							<input type="text" className="form-control p-1 m-1" name={`p${num}Bprenom`} id={`p${num}Bprenom`} onChange={() => handleChangePlaquee(num)} placeholder="Prénom"/>
							{generateList(nivGeneral, num, 'B')}
						</div>
						
						<div className='d-flex align-items-center col-sm-1 ms-5'>
						</div>
						
						<div className='d-flex align-items-center col-sm-2'>
						</div>
					</div>



					<div className="d-flex align-items-center col-sm-12">
						<div className="d-flex align-items-center col-sm-6">
							<input type="text" className="form-control p-1 m-1" name={`p${num}Cnom`}    id={`p${num}Cnom`}    onChange={() => handleChangePlaquee(num)} placeholder="Nom"   />
							<input type="text" className="form-control p-1 m-1" name={`p${num}Cprenom`} id={`p${num}Cprenom`} onChange={() => handleChangePlaquee(num)} placeholder="Prénom"/>
							{generateList(nivGeneral, num, 'C')}
						</div>
						
						<div className='d-flex align-items-center col-sm-1 ms-5'>
						</div>
					</div>
				</div>
			</div>
		);
	}


	function generateList(datas, num, cat)
	{
		return (
			<select name={`p${num}${cat}niv`} id={`p${num}${cat}niv`} className={`form-select ${encadreOuNon[num] && cat ==='A' ? 'bg-secondary text-light' : ''}`} onChange={() => handleChangePlaquee(num)}>
				{datas.map((niveau) => (
					<option key={niveau}>{niveau}</option>
				))}
			</select>
		);
	}

	


	/**
	 * Genere le formulaire pour le formulaire d'après plongee.
	 * @returns 
	 */
	function generatehtmlFormApresPlongee() 
	{ 
		return (
			<div>
				{
					//Pour chaque plaque on les génère.
					Array(nombrePlaques - 1).fill().map((_, index) => generatePalanqueeAP(index + 1))
				}
			</div>
		)
	}



	function generatePalanqueeAP(num) 
	{
		return (
			<div className='ms-4 mt-4'>
				<h3>Palanquée {num}</h3>
				
				<div className='ms-3'>
					<div className='d-flex mb-3'>
						<div className='align-items-center col-sm-1'>
							<label htmlFor={`profRea${num}`} className="me-2">Profondeur</label>
							<input type="number" min="0" className="form-control w-75" name={`profRea${num}`} id={`profRea${num}`} defaultValue={sessionStorage.getItem(`prof${num}`)} onChange={() => handleChangeRea()}/>
						</div>
						
						<div className='align-items-center col-sm-1 me-3'>
							<label htmlFor={`tempsRea${num}`} className="me-2">Temps</label>
							<input type="number" min="0" className="form-control w-75" name={`tempsRea${num}`} id={`tempsRea${num}`} defaultValue={sessionStorage.getItem(`prof${num}`)} onChange={() => handleChangeRea()}/>
						</div>

						<div className='align-items-center me-3'>
							<label htmlFor={`palier3m${num}`} className="me-2">Palier 3m</label>
							<input type="number" min="0" className="form-control" name={`palier3m${num}`} id={`palier3m${num}`} placeholder='En minute' onChange={() => handleChangeRea()}/>
						</div>
						
						<div className='align-items-center me-5'>
							<label htmlFor={`palier6m${num}`} className="me-2">Palier 5m</label>
							<input type="number" min="0" className="form-control" name={`palier6m${num}`} id={`palier6m${num}`} placeholder='En minute' onChange={() => handleChangeRea()}/>
						</div>

						<div className='align-items-center me-3'>
							<label htmlFor={`HD${num}`} className="me-2">HD</label>
							<input type="time" className="form-control" name={`HD${num}`} id={`HD${num}`} onChange={() => handleChangeRea()}/>
						</div>
						
						<div className='align-items-center me-5'>
							<label htmlFor={`HS${num}`} className="me-2">HS</label>
							<input type="time" className="form-control" name={`HS${num}`} id={`HS${num}`} onChange={() => handleChangeRea()}/>
						</div>
						
						<div className='align-items-center '>
							<label htmlFor={`gaz${num}`} className="me-2">Gaz</label>
							<input type="text" className="form-control" name={`gaz${num}`} id={`gaz${num}`} onChange={() => handleChangeRea()}/>
						</div>
					</div>

					<div className='col-sm-6 mt-3'>
						<label htmlFor={`remarque${num}`} className="me-2">Remarque</label>
						<textarea type="textarea" className="form-control" name={`remarque${num}`} id={`remarque${num}`} onChange={() => handleChangeRea()}/>
					</div>
				</div>

			</div>
		);
	}

	


	/**
	 * Genere le formulaire pour le formulaire d'après plongee.
	 * @returns 
	 */
	function generatehtmlAppercue() 
	{ 
		const chemin = generateCSV()
		console.log(chemin)

		return (
			<div>
				<object type="application/vnd.ms-excel" data={chemin} width="300" height="200">
					alt : <a href={chemin}>{chemin}</a>
				</object>
			</div>
		)
	}

	function generateCSV() {
		console.log("Imagine c'est les bonnes info okay ?")
		return "/src/doc/FicheSecuVierge.xlsx"
	}






	/**********************************************************************/
	/*                                                                    */
	/*                    GESTION DES FORMULAIRES                         */
	/*                                                                    */
	/**********************************************************************/

	// Function to handle going to the next step
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!peutValide) return;

		const formData = new FormData(e.target);
		saveInformations(formData)

		// Afficher les valeurs du formulaire dans la console
		setEtape(etape + 1);
		setValide(false)
	};


	/**
	 * Sauvegarde les informations du form dans les cookie de sessions
	 * @param {*} formData 
	 */
	function saveInformations(formData)
	{
		// Créer un objet pour stocker les valeurs du formulaire
		const formValues = {};

		// Parcourir toutes les entrées du formulaire
		for (let [key, value] of formData.entries()) {
			sessionStorage.setItem(key, value);
			if (value !== '')
				formValues[key] = value;
		}

	}


	/**
	 * Fonction qui gère les changement du formulaire des palanquées.
	 * @param {*} num 
	 */
	function handleChangePlaquee (num)
	{
		//On verifie si on nécessite un encadreur
		setEncadre(prevState => ({
			...prevState,
			[num]: needEncadrant(num)
		}));


		// Vérification de remplissage pour crée un autre palanquee
		var tousRemplis = lignePalanqueeComplete(num, 'A') && lignePalanqueeComplete(num, 'B') && lignePalanqueeComplete(num, 'C');

		if (tousRemplis && num === nombrePlaques)
			setNombrePlaques(nombrePlaques+1)

		if (nombrePlaques > 1 && nombrePlaques !== num && !tousRemplis && ((lignePalanqueeVide(nombrePlaques, 'A') && lignePalanqueeVide(nombrePlaques, 'B') && lignePalanqueeVide(nombrePlaques, 'C'))))
			setNombrePlaques(nombrePlaques - 1)

		//On met setValide a si tout est remplis.
		setValide(tousRemplis);

		if (num === nombrePlaques && num > 1 && lignePalanqueeVide(num, 'A') && lignePalanqueeVide(num, 'B') && lignePalanqueeVide(num, 'C') && lignePalanqueeComplete(num - 1, 'A') && lignePalanqueeComplete(num - 1, 'B') && lignePalanqueeComplete(num - 1, 'C'))
			setValide(true);


		
		//Verifie si tout est valide
		for (let nb = 1; nb <= nombrePlaques; nb++)
		{
			//Si tous n'est pas complet mais que tous n'est pa vide
			if (!(lignePalanqueeComplete(nb, 'A') && lignePalanqueeComplete(nb, 'B') && lignePalanqueeComplete(nb, 'C')) && 
				!(lignePalanqueeVide    (nb, 'A') && lignePalanqueeVide    (nb, 'B') && lignePalanqueeVide    (nb, 'C')))
				setValide (false);
		}
	}


	function handleChangeEnTete() {
		setValide(formEstRempli());
	}


	function formEstRempli() {
		
		// Get reference to the form
		const form = document.querySelector('form');

		// Check if the form exists
		if (form) {
			// Initialize a flag to track form validity
			let estRempli = true;

			// Recursively check for non-empty input fields
			const checkNonEmpty = (element) => {
				// Check if the element is an input field
				if (element.tagName === 'INPUT' && element.value === '' && !element.readOnly ) {
					estRempli = false;
				}

				// Iterate over child nodes of the element
				if (element.childNodes && element.childNodes.length > 0) {
					for (let i = 0; i < element.childNodes.length; i++) {
						checkNonEmpty(element.childNodes[i]);
					}
				}
			};

			// Call checkNonEmpty for each child node of the form
			form.childNodes.forEach((child) => {
				checkNonEmpty(child);
			});

			// Update the state based on form validity
			return estRempli;
		}

		return true;
	}



	function handleChangeRea(num)
	{
		setValide(formEstRempli());
	}
	


	function getValueRB(id) {
		// On regarde quelle valeur a été cochée.
		let radioButtons = document.getElementsByName(id);

		// Parcourez tous les boutons radio pour trouver celui qui est sélectionné
		for (let i = 0; i < radioButtons.length; i++) {
			if (radioButtons[i].checked) {
				// Si le bouton radio est sélectionné, retournez sa valeur
				return radioButtons[i].value;
			}
		}

		return '';
		
	}




	function needEncadrant(num) {

		let value = getValueRB(`p${num}type`)

		return value === 'tech' ||
			( document.getElementById(`p${num}Aniv`).value === 'N1-PE20'     || document.getElementById(`p${num}Bniv`).value === 'N1-PE20'     || document.getElementById(`p${num}Cniv`).value === 'N1-PE20') ||
			((document.getElementById(`p${num}Aniv`).value === 'N2-PA20PE40' || document.getElementById(`p${num}Bniv`).value === 'N2-PA20PE40' || document.getElementById(`p${num}Cniv`).value === 'N2-PA20PE40') && parseInt(document.getElementById(`prof${num}`).value) > 20);
	}






	/**
	 * Savoir si la ligne du palanquee est complet (nom prenom niv)
	 * @param {*} num 
	 * @param {*} car 
	 * @returns 
	 */
	function lignePalanqueeComplete(num, car)
	{
		return document.getElementById(`p${num}${car}nom`).value !== '' && document.getElementById(`p${num}${car}prenom`).value !== '' && document.getElementById(`p${num}${car}niv`).value !== '' && document.getElementById(`temp${num}`).value !== '' && document.getElementById(`prof${num}`).value !== '' && getValueRB(`p${num}type`) !== '' ;
	}

	/**
	 * Savoir si la ligne du palanquee est vide (nom prenom niv)
	 * @param {*} num 
	 * @param {*} car 
	 * @returns 
	 */
	function lignePalanqueeVide(num, car)
	{
		return document.getElementById(`p${num}${car}nom`).value === '' && document.getElementById(`p${num}${car}prenom`).value === '' && document.getElementById(`p${num}${car}niv`).value === '' && document.getElementById(`temp${num}`).value === '' && document.getElementById(`prof${num}`).value === '' ;
	}



	return (
		<div className="col-sm-12" style={{ overflowX: 'hidden' }}>
			<h1 className='titre mt-1'>Création d'une fiche de sécurité - {etapesLib[etape]}</h1>

			<form onSubmit={handleSubmit}>
				{/* Pass formData and setFormData to the GeneratehtmlForm component */}
				{/* {etapesLib[etape] === 'En tête'        && generatehtmlFormEnTete()      }
				{etapesLib[etape] === 'Palanquée'      && generatehtmlFormPalanquee()   }
				{etapesLib[etape] === 'Réalisé'        && generatehtmlFormApresPlongee()}
				{etapesLib[etape] === 'Appercue final' && generatehtmlAppercue()} */}

				{generatehtmlAppercue()}

				<div className="m-5 d-flex justify-content-end">
					{/* {etape !== 0 &&
						<button className="mx-2 col-sm-1 btn btn-secondary" onClick={etapePrecedente}>Précédent</button>
					} */}
					{etape < etapesLib.length - 1 &&
						<button className={`mx-2 col-sm-1 btn  ${peutValide ? 'btnSauvegarder' : 'btn-secondary'}`} type="submit">Suivant</button>
					}
					{etape === etapesLib.length - 1 &&
						<button className={`mx-2 col-sm-1 btn  ${peutValide ? 'btnAnnuler' : 'btn-secondary'}`} type="submit">Appercue</button>
					}
				</div>
			
			
			
			</form>
		</div>
	);
}

export default FicheSecu;
