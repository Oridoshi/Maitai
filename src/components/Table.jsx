import React, { useState, useEffect } from 'react';
import "../style/table.css"


/**
 * Modal (Pop-up) qui apparait lorsqu'on clique sur ajouter ou modifier
 * @param {*} param0
 * @returns
 */
function Modal({ isOpen, rowData, header, handleSubmit, closeModal })
{
	// Valeur du formulaire
	const [formValues, setFormValues] = useState({});


	/**
	 * Permet de mettre les valeurs par défauts en cas de modification
	 */
	useEffect(() => {
		setFormValues(rowData);
	}, [rowData]);



	/**
	 * Modifier l'élément quand on change les valeurs.
	 * @param {*} e
	 */
	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormValues(prevState => ({
			...prevState,
			[id]: value
		}));


		header.forEach(head => {
			if(head.id === id && head.onChange !== undefined)
				head.onChange()
		});



		if (id.onChange !== undefined)
			id.onChange(e)

		appliquerContourRouge();
	};


	function appliquerContourRouge() {
		// Sélectionner tous les éléments input du div modal-body
		let div = document.getElementById('modal-body')
		const inputs = div.querySelectorAll('input');
		let boolean = true;

		// Parcourir chaque input
		inputs.forEach(input => {
			const pattern = input.getAttribute('pattern');

			if (input.type !== "hidden") {
				const value = input.value.trim();
				const hasPattern = pattern !== null;
				const patternNotMatched = hasPattern && !new RegExp(`^${pattern}$`).test(value);
				const isRequiredAndEmpty = input.required && value === '';

				// Si il y a un pattern et que ça ne correspond pas ou si le champ est requis mais non rempli
				if (patternNotMatched || isRequiredAndEmpty) {
					// Ajouter la classe de Bootstrap pour une bordure rouge
					input.classList.add('border', 'border-danger');
					boolean = false;
				} else {
					// Retirer la classe de bordure rouge s'il n'y a pas de problème
					input.classList.remove('border', 'border-danger');
				}
			}
		});
		
		return boolean;
	}


	/**
	 * Pour le numéro de téléphone : mettre les espaces automatiquement
	 * @param {*} e
	 * @returns
	 */
	const handleChangePhoneNumber = (e) => {
		const { id, value } = e.target;
		// Supprime tous les caractères non numériques du numéro de téléphone
		const formattedValue = value.replace(/\D/g, '');
		// Limite la saisie à dix chiffres
		if (formattedValue.length > 10) {
			return; // Empêche de continuer la saisie si plus de 10 chiffres
		}
		// Formate le numéro de téléphone en insérant un espace tous les deux chiffres
		const formattedPhoneNumber = formattedValue.replace(/(\d{2})(?=\d)/g, '$1 ');

		handleChange(e)
	};

	const handleChangeLogin = (e) => {
		const { id, value } = e.target;
		const login = value.replace(/ /g, "-");

		setFormValues(prevState => ({
			...prevState,
			[id]: login
		}));

		handleChange(e)

	};



	/**
	 * Reset le formulaire en cas d'erreur (c'est pour garder les infos mis)
	 */
	const resetForm = () => {
		setFormValues(rowData);
	};


	return (
		<div className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex='-1' aria-labelledby='addLabel' aria-hidden={!isOpen} style={{ display: isOpen ? 'block' : 'none' }}>
			<div className='modal-dialog modal-dialog-centered'>
				<form onSubmit={handleSubmit}>
				<div className='modal-content'>
					<div className="modal-header">
					<h4 className="modal-title">{rowData.id ? 'Modifier' : 'Ajouter'}</h4>
					</div>
					<div className='modal-body' id='modal-body'>
						{header.map((head) => (
							<div key={head.id}>
								{head.editable ? (
									<div>
										<label htmlFor={head.id} className="form-label">
											{head.name}
										</label>
										{head.type === 'list' ? (
											<select
												className="form-control border-secondary"
												id={head.id}
												name={head.id}
												value={formValues[head.id] || ''}
												onChange={handleChange}
											>
												{head.options.map((option) => (
													<option key={option} value={option}>
														{option}
													</option>
												))}
											</select>
										) : head.type === 'checkbox' ? (
											<Checkbox id={head.id} name={head.id} defaultValue={formValues[head.id] || false}/>
										) : head.type === 'tel' ? (
											<input
												type="tel"
												id={head.id}
												name={head.id}
												className="form-control border-secondary"
												pattern="0[1-9](\s?\d{2}){4}"
												value={formValues[head.id] !== undefined ? formValues[head.id].replace(/(\d{2})(?=\d)/g, '$1 ') : ''}
												onChange={handleChangePhoneNumber}
												required={head.required ? true : false}
											/>
										) : head.type === 'email' ? (
											<input
												type="email"
												id={head.id}
												name={head.id}
												className="form-control border-secondary"
												pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
												value={formValues[head.id] || ''}
												onChange={handleChange}
												required={head.required ? true : false}
												{ ...(head.maxLength ? { maxLength: head.maxLength } : {}) }
											/>
										) : head.type === 'prix' ? (
											<input
												type="number"
												step="0.01"
												id={head.id}
												name={head.id}
												className="form-control border-secondary"
												value={formValues[head.id] || ''}
												onChange={handleChange}
												required={head.required ? true : false}
												{ ...(head.maxLength ? { maxLength: head.maxLength } : {}) }
											/>
										) : head.type === 'login' ? (
											<input
												type="text"
												id={head.id}
												name={head.id}
												className="form-control border-secondary"
												value={formValues[head.id] || ''}
												onChange={handleChangeLogin}
												required={head.required ? true : false}
												{ ...(head.maxLength ? { maxLength: head.maxLength } : {}) }
											/>
										) : (
											<>
												<input
													{...head.datalist && { list: "list" + head.id }}
													type={head.type}
													className="form-control border-secondary"
													id={head.id}
													name={head.id}
													value={formValues[head.id] || ''}
													onChange={handleChange}
													required={head.required ? true : false}
													{ ...(head.maxLength ? { maxLength: head.maxLength } : {}) }
												/>

												{head.datalist && (
													<datalist id={"list" + head.id}>
														{head.datalist.map((option) => (
															<option key={option} value={option}/>
														))}
													</datalist>
												)}
											</>
										)}
									</div>
								) : (
									<input
										type="hidden"
										id={head.id}
										name={head.id}
										value={formValues[head.id] || ''}
										onChange={handleChange}
									/>
								)}

							</div>
							))}

							</div>
							<div className='modal-footer'>
								<button type='button' className='btnFermer btn btn-secondary' data-bs-dismiss='modal' onClick={ () => { closeModal(); resetForm(); } }>Fermer</button>
								{ rowData.id !== undefined && (
									<button type='submit' className='btnSauvegarder btn btn-primary'>Modifier</button>
								) }
								{ rowData.id === undefined && (
									<button type='submit' className='btnValidation btn 0btn-primary'></button>
								) }
							</div>
						</div>
					</form>
				</div>
			</div>
	);
}


/**
 * Les checkbox affiché dans le pop-up : permet de cocher et decocher
 * @param {*} param0
 * @returns
 */
function Checkbox({ id, name, defaultValue })
{
	const [isChecked, setIsChecked] = useState(defaultValue);

	// Update isChecked when defaultValue changes
	useEffect(() =>
	{
		setIsChecked(defaultValue);
	}, [defaultValue]);

	const handleCheckboxChange = () =>
	{
		setIsChecked((prevChecked) => !prevChecked);
	};

	return (
		<div>
			<input
				type="checkbox"
				className="checktable check form-check-input border-secondary"
				id={ id }
				name={ name }
				checked={ isChecked }
				onChange={ handleCheckboxChange }
			/>
		</div>
	);
}




/**
 * Tableau affichant les données
 * @param {*} param0
 * @returns
 */
function Table({ header, data, funInsert, funUpdate, funDelete, keyGrayWhenFalse, appellerQuandTrier })
{

	/**
	 * Si le modal est open ou non, et la modification qu'on recois
	 */
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [rowData, setRowData] = useState({});

	const openModal = (rowData) =>
	{
		setRowData(rowData || {});
		setModalIsOpen(true);
	};

	const closeModal = () =>
	{
		setModalIsOpen(false);
	};

	const handleSubmit = async (e) =>
	{
		e.preventDefault();

		const formData = new FormData(e.target);

		const updatedRowData = {};
		header.forEach(head =>
		{
			if      (head.type === 'checkbox') updatedRowData[head.id] = formData.get(head.id) !== null;
			else if (head.type === 'tel')      updatedRowData[head.id] = formData.get(head.id).replace(/\s/g, '');
			else                               updatedRowData[head.id] = formData.get(head.id);
		});

		const id = updatedRowData.id;

		if (id !== '')
		{
			const oldRowData = datas.find(item => item.id + "" === id);

			// Appel de funUpdate
			const updateSuccess = await funUpdate(updatedRowData, oldRowData);

			if (updateSuccess)
			{
				setModalIsOpen(false);
			} else
			{
				openModal(oldRowData); // Ouvre le modal avec les anciennes données
			}
		} else
		{

			// Appel de funInsert
			const insertSuccess = await funInsert(updatedRowData);

			if (insertSuccess)
			{
				setModalIsOpen(false);
			} else
			{
				openModal(updatedRowData); // Ouvre le modal avec les données nouvellement insérées
			}
		}
	};



	const changeThing = async (item, columnId) => {
		// Modifiez la propriété correspondante dans l'objet item
		item[columnId] = !item[columnId];

		// Mettez à jour l'état avec les nouvelles données
		if (funUpdate !== undefined)
		{
			const updateSuccess = await funUpdate(item, item);
			if (updateSuccess)
				setTableData(prevData => [...prevData]);
			else
				item[columnId] = !item[columnId];
		}
		else
		{
			item[columnId] = !item[columnId];
		}
	}




	const deleteRow = async (itemDonne) =>
	{
		// Créez une copie des données existantes
		const newData = [...datas];

		// Filtrez la copie des données pour exclure l'élément à supprimer
		const updatedData = newData.filter(item => item.id !== itemDonne.id);

		//Seulement si la méthode renvoie vrai on modifie

		if (await funDelete(itemDonne))
		{
			setTableData(updatedData);
		}
	};




	const handleRowDataChange = (key, value) =>
	{
		setRowData({ ...rowData, [key]: value });
	};



	/**************************************************************/
	/*                     TRIE SELON HEADER                      */
	/**************************************************************/

	const [trierPar     , setTrierPar ] = useState();
	const [sensCroissant, setCroissant] = useState(false);
	const [triApplique, setTriApplique] = useState(false);


	/**
	 * Met les datas dans le tableau
	 */
	const [datas, setTableData] = useState(data);

	//Quand le data donné change on rappelle ca
	useEffect(() =>
	{
		setTableData(data);

		//Si le trie est applique on rappelle pas pour éviter une boucle.
		if (trierPar && !triApplique) {
			trie(trierPar, data, true, !sensCroissant);
    	}
	}, [data]);


	// Les données en + c'est car React est pas async
	function trie(id, data, trieAppliqueRapide, sensRapide)
	{
		if (!triApplique && (!trieAppliqueRapide || triApplique == undefined))
		{
			if(trierPar === id)
			{
				setCroissant(!sensCroissant)
			} else {
				setTrierPar(id)
				setCroissant(!sensCroissant)
			}

			if (appellerQuandTrier !== undefined) data.map(item => (appellerQuandTrier('edit')));

		}

		setTableData(data.sort((a, b) => a[id] - b[id]));

		//Comparé si c'est une chaine
		if (sensRapide !== undefined ? sensRapide : sensCroissant) {
			setTableData([...data].sort((a, b) => {
				const valueA = isNaN(a[id]) ? a[id] : parseFloat(a[id]);
				const valueB = isNaN(b[id]) ? b[id] : parseFloat(b[id]);

				if (typeof valueA === 'number' && typeof valueB === 'number') {
					return valueA - valueB;
				} else {
					return valueA.toString().localeCompare(valueB.toString());
				}
			}));
		} else {
			setTableData([...data].sort((a, b) => {
				const valueA = isNaN(a[id]) ? a[id] : parseFloat(a[id]);
				const valueB = isNaN(b[id]) ? b[id] : parseFloat(b[id]);

				if (typeof valueA === 'number' && typeof valueB === 'number') {
					return valueB - valueA;
				} else {
					return valueB.toString().localeCompare(valueA.toString());
				}
			}));
		}


    	setTriApplique(false); // Réinitialiser le drapeau de tri appliqué
	}














	return (
		<div className='m-4'>

			<div className="panel" style={ { maxHeight: '50vh', overflowY: 'auto' } }>
				<table className='tableau table my-0'>
					<thead className='position-sticky top-0'>
						<tr>
							{ header.map(column => (
								column.show && // Vérifier si la colonne doit être affichée
								<th className= {`bg-primary text-white ${column.type === 'checkbox' || column.type === 'number' || column.type === 'prix' || column.type === 'tel' || column.type === 'button' ? 'celCenter' : 'celLeft'}`} key={ column.id }>
									{
										column.type !== 'button' && column.type !== 'checkbox' ? <a href='#' className='text-white' onClick={(e) => trie(column.id, datas)}> { column.name }</a> :  (column.name)
									}
								</th>
							)) }
							{ (funUpdate !== undefined || funDelete !== undefined) && <th className='bg-primary text-white celCenter'>Action</th> }
						</tr>
					</thead>






					<tbody>
					{datas.map(item => (

								<tr id={`ligne ${item.id}`}
									className={`bg-light ${typeof keyGrayWhenFalse === 'string' && ( item[keyGrayWhenFalse] === false || item[keyGrayWhenFalse] === 0) === false ? '' : 'text-muted'}`}
									key={`${item.id}`}
								>

									{header.map(column => (
										column.show && (
												<td className={
														`bg-light ${column.type === 'checkbox' || column.type === 'number' || column.type === 'prix' || column.type === 'tel' || column.type === 'button' ? 'celCenter' : 'celLeft'}`
													}
													key={`${item.id}-${column.id}`}
												>

												{column.type !== 'checkbox' && column.type !== 'button' && column.type !== 'tel' && column.type !== 'prix' && (
													// Si ce n'est pas un checkbox ni un button, afficher la valeur de la colonne
													`${item[column.id]}`
												)}

												{column.type === 'checkbox' && (
													column.fastEditable ? (
														<input
														type='checkbox'
														checked={item[column.id]}
														onChange={() => changeThing(item, column.id)}
														className=" checktable check form-check-input border-secondary"
														style={{ fontSize: '1.2em' }}
														/>
													) : (
														<input
														type='checkbox'
														checked={item[column.id]}
														readOnly
														className="check checktable form-check-input border-secondary"
														style={{ fontSize: '1.2em' }}
														/>
													)
												)}


												{column.type === 'tel' && (
													// Si c'est un numéro de téléphone, afficher les numéros avec un espace
													`${item[column.id].replace(/(..)/g, '$1 ')}` // Retirez le caractère ")" en trop
												)}

												{column.type === 'prix' && (
													// Si c'est un numéro de téléphone, afficher les numéros avec un espace
													item[column.id] !== null && !isNaN(item[column.id]) ? `${parseFloat(item[column.id]).toFixed(2)} €` : 'NR'
												)}

												{/* Si c'est un button */}
												{column.type === 'button' && (
													// Si c'est un bouton, afficher un bouton qui appelle la fonction spécifiée dans la colonne au clic
													<button id={`btn ${item.id}`} className={`btn btn-primary mx-2 py-1 ${column.className}`} onClick={() => column.function(item)}>
														{column.btn}
													</button>
												)}
											</td>
										)
									))}
									{(funUpdate !== undefined || funDelete !== undefined) &&
										<td className='bg-light celCenter'>
											{funUpdate !== undefined && <button className='btnModif' onClick={() => openModal(item)}></button>}
											{funDelete !== undefined && <button className='btnSuppr' onClick={() => deleteRow(item)}></button>}
										</td>
									}
								</tr>
							))}
					</tbody>
				</table>
			</div>



			<Modal
				isOpen={ modalIsOpen }
				rowData={ rowData }
				header={ header }
				handleSubmit={ handleSubmit }
				closeModal={ closeModal }
				handleRowDataChange={ handleRowDataChange }
			/>

			{ modalIsOpen && <div className="modal-backdrop fade show"></div> }


			<div className='d-flex '>
				{ funInsert !== undefined && <button className='btnAjouter btn btn-primary m-3 ' onClick={ () => openModal(null) }></button> }
			</div>

		</div>
	);
}

export default Table;