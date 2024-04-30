import React, { useState, useEffect } from 'react';
import "../style/table.css"
function Modal({ isOpen, rowData, header, handleSubmit, closeModal })
{
	const [formValues, setFormValues] = useState({});

	useEffect(() => {
		setFormValues(rowData);
	}, [rowData]);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormValues(prevState => ({
			...prevState,
			[id]: value
		}));
	};

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

		setFormValues(prevState => ({
			...prevState,
			[id]: formattedPhoneNumber
		}));
	};




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
			<div className='modal-body'>
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
								<button type='submit' className='btn btn-primary'>Modifier</button>
							) }
							{ rowData.id === undefined && (
								<button type='submit' className='btnAdd btn 0btn-primary'>Ajouter</button>
							) }
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}


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
				className="check form-check-input border-secondary"
				id={ id }
				name={ name }
				checked={ isChecked }
				onChange={ handleCheckboxChange }
			/>
		</div>
	);
}





function Table({ header, data, funInsert, funUpdate, funDelete, keyGrayWhenFalse })
{
	const [datas, setTableData] = useState(data);
	useEffect(() =>
	{
		setTableData(data);
	}, [data]);


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

			const updatedData = datas.map(item =>
			{
				if (item.id + "" === id)
				{
					return { ...item, ...updatedRowData };
				}
				return item;
			});

			// Appel de funUpdate
			const updateSuccess = await funUpdate(updatedRowData, oldRowData);

			if (updateSuccess)
			{
				setTableData(updatedData);
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
				updatedRowData.id = Math.max(...datas.map(item => item.id), 0) + 1;
				setTableData(prevData => [...prevData, updatedRowData]);
				setModalIsOpen(false);
			} else
			{
				openModal(updatedRowData); // Ouvre le modal avec les données nouvellement insérées
			}
		}
	};



	function changeThing(item, columnId) {
		// Modifiez la propriété correspondante dans l'objet item
		item[columnId] = !item[columnId];

		// Mettez à jour l'état avec les nouvelles données
		if (funUpdate !== undefined && funUpdate(item, item))
			setTableData(prevData => [...prevData]);
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

	return (
		<div className='m-4'>

			<div className="panel" style={ { maxHeight: '300px', overflowY: 'auto' } }>
				<table className='tableau table table-hover my-0'>
					<thead className='position-sticky top-0'>
						<tr>
							{ header.map(column => (
								column.show && // Vérifier si la colonne doit être affichée
								<th className= {`bg-primary text-white ${column.type === 'checkbox' || column.type === 'number' || column.type === 'tel' || column.type === 'button' ? 'celCenter' : 'celLeft'}`} key={ column.id }>{ column.name }</th>
							)) }
							{ (funUpdate !== undefined || funDelete !== undefined) && <th className='bg-primary text-white celCenter'>Action</th> }
						</tr>
					</thead>






					<tbody>
					{datas.slice().reverse().map(item => (

								<tr
									className={`bg-light ${typeof keyGrayWhenFalse === 'string' && ( item[keyGrayWhenFalse] === false || item[keyGrayWhenFalse] === 0) === false ? '' : 'text-muted'}`}
									key={`${item.id}`}
								>

									{header.map(column => (
										column.show && (
												<td className={
														`bg-light
														${column.type === 'checkbox' || column.type === 'number' || column.type === 'tel' || column.type === 'button' ? 'celCenter' : 'celLeft'}`
													}
													key={`${item.id}-${column.id}`}
												>

												{column.type !== 'checkbox' && column.type !== 'button' && column.type !== 'tel' && (
													// Si ce n'est pas un checkbox ni un button, afficher la valeur de la colonne
													`${item[column.id]}`
												)}

												{column.type === 'checkbox' && (
													column.fastEditable ? (
														<input
														type='checkbox'
														checked={item[column.id]}
														onChange={() => changeThing(item, column.id)}
														className="check form-check-input border-secondary"
														style={{ fontSize: '1.2em' }}
														/>
													) : (
														<input
														type='checkbox'
														checked={item[column.id]}
														readOnly
														className="check form-check-input border-secondary"
														style={{ fontSize: '1.2em' }}
														/>
													)
												)}


												{column.type === 'tel' && (
													// Si c'est un numéro de téléphone, afficher les numéros avec un espace
													`${item[column.id].replace(/(..)/g, '$1 ')}` // Retirez le caractère ")" en trop
												)}

												{/* Si c'est un button */}
												{column.type === 'button' && (
													// Si c'est un bouton, afficher un bouton qui appelle la fonction spécifiée dans la colonne au clic
													<button className='btn btn-primary mx-2 py-1' onClick={() => column.function(item)}>
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