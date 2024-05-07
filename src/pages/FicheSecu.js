import React, { useState, useEffect } from 'react';
import { nivEncadrant,nivGeneral, cheminPHP } from '../components/VarGlobal.js';  
import ExcelJS from 'exceljs';


function FicheSecu() {





	/**********************************************************************/
	/*                                                                    */
	/*                           INITIALISATION                           */
	/*                                                                    */
	/**********************************************************************/

	const etapesLib = ['En tête', 'Palanquée', 'Réalisé', 'Aperçu final'];
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

						<div className="d-flex align-items-center mt-3">
							<label type="text" className="fw-bold" htmlFor="tel"> Nombre plongeurs </label>
							<input type="number" min="1" className="form-control p-1 m-1" name="nbplong"   id="nbplong"   placeholder="Nombre"    onChange={() => handleChangeEnTete()}/>
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
							<input type="number" min="0" className="form-control p-1 me-3" name={`p${num}prof`}  id={`p${num}prof`} onChange={() => handleChangePlaquee(num)} placeholder="En mètre" />
							<input type="number" min="0" className="form-control p-1 ms-1" name={`p${num}temp`}  id={`p${num}temp`} onChange={() => handleChangePlaquee(num)} placeholder="En minute"/>
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
							<input type="number" min="0" className="form-control w-75" name={`p${num}profrea`} id={`p${num}profrea`} defaultValue={sessionStorage.getItem(`p${num}prof`)} onChange={() => handleChangeRea()}/>
						</div>
						
						<div className='align-items-center col-sm-1 me-3'>
							<label htmlFor={`tempsRea${num}`} className="me-2">Temps</label>
							<input type="number" min="0" className="form-control w-75" name={`p${num}tempsrea`} id={`p${num}tempsrea`} defaultValue={sessionStorage.getItem(`p${num}temp`)} onChange={() => handleChangeRea()}/>
						</div>

						<div className='align-items-center me-3'>
							<label htmlFor={`palier3m${num}`} className="me-2">Palier 3m</label>
							<input type="number" min="0" className="form-control" name={`p${num}3m`} id={`p${num}3m`} placeholder='En minute' onChange={() => handleChangeRea()}/>
						</div>
						
						<div className='align-items-center me-5'>
							<label htmlFor={`palier6m${num}`} className="me-2">Palier 6m</label>
							<input type="number" min="0" className="form-control" name={`p${num}6m`} id={`p${num}6m`} placeholder='En minute' onChange={() => handleChangeRea()}/>
						</div>

						<div className='align-items-center me-3'>
							<label htmlFor={`HD${num}`} className="me-2">HD</label>
							<input type="time" className="form-control" name={`p${num}HD`} id={`p${num}HD`} onChange={() => handleChangeRea()}/>
						</div>
						
						<div className='align-items-center me-5'>
							<label htmlFor={`HS${num}`} className="me-2">HS</label>
							<input type="time" className="form-control" name={`p${num}HS`} id={`p${num}HS`} onChange={() => handleChangeRea()}/>
						</div>
						
						<div className='align-items-center '>
							<label htmlFor={`gaz${num}`} className="me-2">Gaz</label>
							<input type="text" className="form-control" name={`p${num}gaz`} id={`p${num}gaz`} onChange={() => handleChangeRea()}/>
						</div>
					</div>

					<div className='col-sm-6 mt-3'>
						<label htmlFor={`remarque${num}`} className="me-2">Remarque</label>
						<textarea type="textarea" className="form-control" name={`p${num}rem`} id={`p${num}rem`} onChange={() => handleChangeRea()}/>
					</div>
				</div>

			</div>
		);
	}

	


	/**
	 * Genere le formulaire pour le formulaire d'après plongee.
	 * @returns 
	 */
	function generatehtmlAppercue() {

		// remplirFiche();
		generateExcel()
		return (
			<div className='m-5'>
				La fiche à était générer et envoyé a l'administration. <br></br>
				Vous pouvez la modifié jusqu'à sa validation par le.s administateur.euse.s. <br></br>

				<button className='btnSauvegarder'></button>
			</div>
		);
	}





	const ExcelJS = require('exceljs');


	async function generateExcel() {
		// Créer un nouveau classeur Excel
		const workbook = new ExcelJS.Workbook();

		// Ajouter une feuille de calcul
		const worksheet = workbook.addWorksheet('Sheet1');

		const borderAll = { top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}};


		//TAILLE COLONNE
		worksheet.getColumn('A').width = 5;
		worksheet.getColumn('B').width = 25;
		worksheet.getColumn('C').width = 20;
		worksheet.getColumn('D').width = 18;
		worksheet.getColumn('E').width = 7;
		worksheet.getColumn('F').width = 7;
		worksheet.getColumn('G').width = 12;
		worksheet.getColumn('H').width = 12;
		worksheet.getColumn('I').width = 12;
		worksheet.getColumn('J').width = 12;
		worksheet.getColumn('K').width = 12;
		worksheet.getColumn('L').width = 12;
		worksheet.getColumn('M').width = 12;
		worksheet.getColumn('N').width = 12;
		worksheet.getColumn('O').width = 12;
		worksheet.getColumn('P').width = 25;
		worksheet.getColumn('Q').width = 10;
		worksheet.getColumn('R').width = 10;
		worksheet.getColumn('S').width = 10;

		//TAILLE LIGNE
		worksheet.getRow( 1).height =  5;
		worksheet.getRow( 2).height =  5;
		worksheet.getRow( 3).height =  5;
		worksheet.getRow( 4).height = 15;
		worksheet.getRow( 5).height = 15;
		worksheet.getRow( 6).height = 30;
		worksheet.getRow( 7).height = 15;
		worksheet.getRow( 8).height = 15;
		worksheet.getRow( 9).height = 15;
		worksheet.getRow(10).height = 15;
		worksheet.getRow(11).height = 15;
		worksheet.getRow(12).height = 15;
		worksheet.getRow(13).height = 15;
		worksheet.getRow(14).height = 10;
		worksheet.getRow(15).height = 15;

		
		// MERGE
		worksheet.mergeCells('E4:N4');
		worksheet.mergeCells('C6:O6');
		worksheet.mergeCells('M8:O10');
		worksheet.mergeCells('B14:D14');
		worksheet.mergeCells('E14:F14');

		worksheet.mergeCells('G14:G15');
		worksheet.mergeCells('H14:H15');
		worksheet.mergeCells('I14:I15');
		worksheet.mergeCells('J14:J15');
		worksheet.mergeCells('K14:K15');
		worksheet.mergeCells('L14:L15');
		worksheet.mergeCells('M14:M15');
		worksheet.mergeCells('N14:N15');
		worksheet.mergeCells('O14:O15');
		worksheet.mergeCells('P14:P15');
		worksheet.mergeCells('Q14:S15');

		worksheet.mergeCells('G8:I8');
		worksheet.mergeCells('G9:I9');
		worksheet.mergeCells('G10:I10');
		worksheet.mergeCells('J8 :K8');
		worksheet.mergeCells('J9 :K9');
		worksheet.mergeCells('J10:K10');

		worksheet.mergeCells('G13:H13');
		worksheet.mergeCells('I13:N13');


		// EN TETE (DATE LIEU CLUB NB PLONG)
		worksheet.getCell('B4').value  = 'DATE : ';
		worksheet.getCell('B4').font   = { bold: true, size: 12, name:'Arial'};
		worksheet.getCell('B4').border = borderAll;
		worksheet.getCell('C4').value  = sessionStorage.getItem("date");
		worksheet.getCell('C4').border = borderAll;

		worksheet.getCell('D4').value  = 'LIEU : ';
		worksheet.getCell('D4').border = borderAll;
		worksheet.getCell('D4').font   = { bold: true, size: 12, name:'Arial'};
		worksheet.getCell('E4').value  = sessionStorage.getItem("lieu");
		worksheet.getCell('E4').border = borderAll;

		worksheet.getCell('B6').value  = 'Nom du club';   
		worksheet.getCell('B6').border = borderAll;
		worksheet.getCell('B6').font   = { bold: true, size: 16, name:'Arial'};
		worksheet.getCell('C6').value  = sessionStorage.getItem("club")  ;
		worksheet.getCell('C6').border = borderAll;

		worksheet.getCell('B8').value  = 'nombre plongeurs';   
		worksheet.getCell('B8').font   = { bold: true, size: 12, name:'Arial'};
		worksheet.getCell('B8').border = borderAll;
		worksheet.getCell('C8').value  = sessionStorage.getItem("nbplong");
		worksheet.getCell('C8').border = borderAll;

		worksheet.getCell('M8').border = borderAll; //signature
		worksheet.getCell('M7').value  = 'signature DP';   
		worksheet.getCell('M7').font   = {size: 6, italic:true, name:'Arial'}; 

		

		// SURVEILLANT
		var lib = [{ lib : 'DP', key : 'dp', ligne : 9}, {lib : 'SECU. SURF.', key : 'ss1', ligne : 10}, {lib : 'SECU. SURF.', key : 'ss2', ligne : 11}, { lib : 'TELEPHONE', key : 'tel', ligne : 12}];

		lib.map((item) => {
			worksheet.getCell('B' + item.ligne).value  = item.lib;   
			worksheet.getCell('B' + item.ligne).font   = {size: 12, name:'Arial'};
			worksheet.getCell('C' + item.ligne).value  = sessionStorage.getItem(item.key + "nom")   ;
			worksheet.getCell('D' + item.ligne).value  = sessionStorage.getItem(item.key + "prenom");
			worksheet.getCell('E' + item.ligne).value  = sessionStorage.getItem(item.key + "niveau");
			worksheet.getCell('B' + item.ligne).border = borderAll;
			worksheet.getCell('C' + item.ligne).border = borderAll;
			worksheet.getCell('D' + item.ligne).border = borderAll;
			worksheet.getCell('E' + item.ligne).border = borderAll;
			
		});  



		// PA12
		lib = [{ lib : 'PA12: NON AUTORISE', key : 'pa12', ligne : 8}, {lib : 'Bloc de secu', key : 'secu', ligne : 9}, {lib : 'O2', key : 'o2', ligne : 10}];

		lib.map((item) => {
			worksheet.getCell('G'+item.ligne).value  = item.lib;   
			worksheet.getCell('G'+item.ligne).font   = {size: 10, bold : true, name:'Arial'};
			worksheet.getCell('G'+item.ligne).border = borderAll;
			worksheet.getCell('J'+item.ligne).value  = sessionStorage.getItem(item.key)     
			worksheet.getCell('J'+item.ligne).border = borderAll;     
		});  

		worksheet.getCell('G8').fill   = {type: 'pattern',pattern:'solid',fgColor:{argb:'ffC000'}};
		



		// PETIT ENTETE 

		worksheet.getCell('B14').value  = 'PALANQUEE';   
		worksheet.getCell('B14').font   = {size: 6,bold:true, name:'Arial'}; 
		worksheet.getCell('B14').border = borderAll;
		
		worksheet.getCell('E14').value  = 'cocher';   
		worksheet.getCell('E14').font   = {size: 6,bold:true, name:'Arial'}; 
		worksheet.getCell('E14').border = borderAll;
		
		worksheet.getCell('G13').value  = 'PREVU';   
		worksheet.getCell('G13').font   = {size: 6,bold:true, name:'Arial'}; 
		worksheet.getCell('G13').border = borderAll;
		worksheet.getCell('G13').fill   = {type: 'pattern',pattern:'solid',fgColor:{argb:'92D050'}};
		worksheet.getCell('G14').fill   = {type: 'pattern',pattern:'solid',fgColor:{argb:'92D050'}};
		worksheet.getCell('H14').fill   = {type: 'pattern',pattern:'solid',fgColor:{argb:'92D050'}};
		
		worksheet.getCell('I13').value  = 'REALISE';   
		worksheet.getCell('I13').font   = {size: 6,bold:true, name:'Arial'}; 
		worksheet.getCell('I13').border = borderAll;



		// GROSSE ENTETE

		lib = [
			{ lib : 'NOM'            , col : 'B'}, 
			{ lib : 'PRENOM'         , col : 'C'}, 
			{ lib : 'PE-PA-PN BREVET', col : 'D'}, 
			{ lib : 'TECH'           , col : 'E'}, 
			{ lib : 'EXPLO'          , col : 'F'}, 
			{ lib : 'PROF'           , col : 'G'}, 
			{ lib : 'DUREE'          , col : 'H'}, 
			{ lib : 'PROF'           , col : 'I'}, 
			{ lib : 'DUREE'          , col : 'J'}, 
			{ lib : 'PALIER 3M'      , col : 'K'}, 
			{ lib : 'PALIER 6M'      , col : 'L'}, 
			{ lib : 'HD'             , col : 'M'}, 
			{ lib : 'HS'             , col : 'N'}, 
			{ lib : 'GAZ'            , col : 'O'}, 
			{ lib : 'REMARQUE'       , col : 'P'}, 
			{ lib : 'MATERIEL'       , col : 'Q'}, 
		];

		lib.map((item) => {
			worksheet.getCell(item.col + '15').value  = item.lib;   
			worksheet.getCell(item.col + '15').font   = {size: 8,bold:true, name:'Arial'}; 
			worksheet.getCell(item.col + '15').border = borderAll;
		});  



		const grayFill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FFCCCCCC'}};
		const allVCHC = { vertical: 'middle', horizontal: 'center' };
		//Pour chaque palanqué 
		Array(nombrePlaques - 1).fill().map((_, index) => {

			// INDEX
			worksheet.getCell('A' + (16 + index * 3)).value = (index+1);
			worksheet.getCell('A' + (16 + index * 3)).font = {bold:true, vertAlign:'top'}
			worksheet.getCell('A' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('A' + (16 + index * 3)).alignment = { vertical: 'top', horizontal: 'right' };


			//NOM PRENOM NIVEAU
			for (let i = 0; i < 3; i++)
			{
				let ind = String.fromCharCode(65 + i); // Convertit 0 à 'A', 1 à 'B', etc.

				worksheet.getCell('B' + ((16 + i) + index * 3)).value = sessionStorage.getItem("p" + (index+1) + (ind) + "nom"    );
				worksheet.getCell('C' + ((16 + i) + index * 3)).value = sessionStorage.getItem("p" + (index+1) + (ind) + "prenom" );
				worksheet.getCell('D' + ((16 + i) + index * 3)).value = sessionStorage.getItem("p" + (index+1) + (ind) + "niv"    );
				worksheet.getCell('B' + ((16 + i) + index * 3)).border = borderAll;
				worksheet.getCell('C' + ((16 + i) + index * 3)).border = borderAll;
				worksheet.getCell('D' + ((16 + i) + index * 3)).border = borderAll;


				console.log(index, "encadreOuNon ?", encadreOuNon[index])
				console.log(i, "i == 0 ?", i === 0)
				if (encadreOuNon[index + 1] && i === 0)
				{
					worksheet.getCell('B' + ((16 + i) + index * 3)).fill = grayFill;
					worksheet.getCell('C' + ((16 + i) + index * 3)).fill = grayFill;
					worksheet.getCell('D' + ((16 + i) + index * 3)).fill = grayFill;
				}

			}

			if (sessionStorage.getItem("p" + (index+1) +"type") === 'explo') worksheet.getCell('F' + (16 + index * 3)).value = 'X'
			else                                                             worksheet.getCell('E' + (16 + index * 3)).value = 'X'


			//INFORMATIONS PLONGEE
			worksheet.mergeCells('A' + (16 + index * 3) + ':' + 'A' + (18 + index * 3));
			worksheet.mergeCells('E' + (16 + index * 3) + ':' + 'E' + (18 + index * 3));
			worksheet.mergeCells('F' + (16 + index * 3) + ':' + 'F' + (18 + index * 3));
			worksheet.mergeCells('G' + (16 + index * 3) + ':' + 'G' + (18 + index * 3));
			worksheet.mergeCells('H' + (16 + index * 3) + ':' + 'H' + (18 + index * 3));
			worksheet.mergeCells('I' + (16 + index * 3) + ':' + 'I' + (18 + index * 3));
			worksheet.mergeCells('J' + (16 + index * 3) + ':' + 'J' + (18 + index * 3));
			worksheet.mergeCells('K' + (16 + index * 3) + ':' + 'K' + (18 + index * 3));
			worksheet.mergeCells('L' + (16 + index * 3) + ':' + 'L' + (18 + index * 3));
			worksheet.mergeCells('M' + (16 + index * 3) + ':' + 'M' + (18 + index * 3));
			worksheet.mergeCells('N' + (16 + index * 3) + ':' + 'N' + (18 + index * 3));
			worksheet.mergeCells('O' + (16 + index * 3) + ':' + 'O' + (18 + index * 3));
			worksheet.mergeCells('P' + (16 + index * 3) + ':' + 'P' + (18 + index * 3));

			worksheet.getCell('G' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"prof"    )
			worksheet.getCell('H' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"temp"    )
			worksheet.getCell('I' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"profrea" )
			worksheet.getCell('J' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"tempsrea")
			worksheet.getCell('K' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"3m"      )
			worksheet.getCell('L' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"6m"      )
			worksheet.getCell('M' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"HD"      )
			worksheet.getCell('N' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"HS"      )
			worksheet.getCell('O' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"gaz"     )
			worksheet.getCell('P' + (16 + index * 3)).value = sessionStorage.getItem("p" + (index+1) +"rem"     )

			worksheet.getCell('E' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('F' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('G' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('H' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('I' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('J' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('K' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('L' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('M' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('N' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('O' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('P' + (16 + index * 3)).border = borderAll;

			worksheet.getCell('E' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('F' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('G' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('H' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('I' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('J' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('K' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('L' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('M' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('N' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('O' + (16 + index * 3)).alignment = allVCHC;
			worksheet.getCell('P' + (16 + index * 3)).alignment = allVCHC;





			//Case matériel border
			worksheet.getCell('Q' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('Q' + (17 + index * 3)).border = borderAll;
			worksheet.getCell('Q' + (18 + index * 3)).border = borderAll;
			worksheet.getCell('R' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('R' + (17 + index * 3)).border = borderAll;
			worksheet.getCell('R' + (18 + index * 3)).border = borderAll;
			worksheet.getCell('S' + (16 + index * 3)).border = borderAll;
			worksheet.getCell('S' + (17 + index * 3)).border = borderAll;
			worksheet.getCell('S' + (18 + index * 3)).border = borderAll;

		});


		// Générer le fichier Excel
		const buffer = await workbook.xlsx.writeBuffer();

		// Créer un objet Blob à partir des données binaires du fichier Excel
		const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

		//Donne un nom au fichier 
		blob.name = sessionStorage.getItem("date") + "_" + sessionStorage.getItem("login") + "_FICHESECU";


		/***************************************************/
		/*                      FETCH                      */
		/***************************************************/

		
		let formData = new FormData();
		formData.append('login'  , sessionStorage.getItem("login"));

		console.log(formData.get('login'))

		//On récupère id du login 
		let response = await fetch(cheminPHP + "client/GetIdClient.php", {
			method: 'POST',
			body: formData
		});


		if (!response.ok) {
			throw new Error('Erreur de réseau lors de la récupération de l\'id.');
		}

		const id = await response.text();
		console.log(id)
		


		// On envoie le fichier Excel au serveur
		formData = new FormData();
		formData.append('idcli'  , parseInt(id));
		formData.append('type'   , 'SECU');
		formData.append('file'   , blob);

		const requestOptions = {
			method: 'POST',
			body: formData
		};

		response = await fetch(cheminPHP + "historique/CreationHistorique.php", {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			throw new Error('Erreur de réseau lors de l\'envoie du fichier.');
		}

		const text = await response.text();
		console.log(text)


		/*
		// Créer un objet URL à partir du Blob
		const url = window.URL.createObjectURL(blob);

		// Créer un lien d'ancrage pour télécharger le fichier Excel
		const a = document.createElement('a');
		a.href = url;
		a.download = blob.name;
		document.body.appendChild(a);
		a.click();

		// Libérer l'URL de l'objet Blob
		window.URL.revokeObjectURL(url);*/
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


		console.log(sessionStorage)

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

		if (tousRemplis && num === nombrePlaques && nombrePlaques < 8)
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
			((document.getElementById(`p${num}Aniv`).value === 'N2-PA20PE40' || document.getElementById(`p${num}Bniv`).value === 'N2-PA20PE40' || document.getElementById(`p${num}Cniv`).value === 'N2-PA20PE40') && parseInt(document.getElementById(`p${num}prof`).value) > 20);
	}






	/**
	 * Savoir si la ligne du palanquee est complet (nom prenom niv)
	 * @param {*} num 
	 * @param {*} car 
	 * @returns 
	 */
	function lignePalanqueeComplete(num, car)
	{
		return document.getElementById(`p${num}${car}nom`).value !== '' && document.getElementById(`p${num}${car}prenom`).value !== '' && document.getElementById(`p${num}${car}niv`).value !== '' && document.getElementById(`p${num}temp`).value !== '' && document.getElementById(`p${num}prof`).value !== '' && getValueRB(`p${num}type`) !== '' ;
	}

	/**
	 * Savoir si la ligne du palanquee est vide (nom prenom niv)
	 * @param {*} num 
	 * @param {*} car 
	 * @returns 
	 */
	function lignePalanqueeVide(num, car)
	{
		return document.getElementById(`p${num}${car}nom`).value === '' && document.getElementById(`p${num}${car}prenom`).value === '' && document.getElementById(`p${num}${car}niv`).value === '' && document.getElementById(`p${num}temp`).value === '' && document.getElementById(`p${num}prof`).value === '' ;
	}



	return (
		<div className="col-sm-12" style={{ overflowX: 'hidden' }}>
			<h1 className='titre mt-1'>Création d'une fiche de sécurité - {etapesLib[etape]}</h1>

			<form onSubmit={handleSubmit}>
				{/* Pass formData and setFormData to the GeneratehtmlForm component */}
				{etapesLib[etape] === 'En tête'        && generatehtmlFormEnTete()      }
				{etapesLib[etape] === 'Palanquée'      && generatehtmlFormPalanquee()   }
				{etapesLib[etape] === 'Réalisé'        && generatehtmlFormApresPlongee()}
				{etapesLib[etape] === 'Aperçu final'   && generatehtmlAppercue()        }

				<div className="m-5 d-flex justify-content-end">
					{/* {etape !== 0 &&
						<button className="mx-2 col-sm-1 btn btn-secondary" onClick={etapePrecedente}>Précédent</button>
					} */}
					{etape < etapesLib.length - 2 &&
						<button className={`mx-2 col-sm-1 btn  ${peutValide ? 'btnSauvegarder' : 'btn-secondary'}`} type="submit">Suivant</button>
					}
					{etape === etapesLib.length - 2 &&
						<button className={`mx-2 col-sm-1 btn  ${peutValide ? 'btnAnnuler' : 'btn-secondary'}`} type="submit">Envoyé</button>
					}
				</div>
			
			
			
			</form>
		</div>
	);
}

export default FicheSecu;
