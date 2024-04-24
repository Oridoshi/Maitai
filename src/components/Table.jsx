import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Modal({ isOpen, rowData, header, handleSubmit, closeModal }) {
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
							) : (
								head.type === 'checkbox' ? (
									<Checkbox id={head.id} name={head.id} defaultValue={formValues[head.id] || false}/>
								) : (
									<input
										type={head.type}
										className="form-control border-secondary"
										id={head.id}
										name={head.id}
										value={formValues[head.id] || ''}
										onChange={handleChange}
										required={head.required ? true : false} // Utilisation d'une expression ternaire pour déterminer si le champ doit être requis
									/>
								)
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
			<button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={() => { closeModal(); resetForm(); }}>Fermer</button>
			{rowData.id !== undefined && (
				<button type='submit' className='btn btn-primary'>Modifier</button>
			)}
			{rowData.id === undefined && (
				<button type='submit' className='btn btn-primary'>Ajouter</button>
			)}
			</div>
		</div>
		</form>
	</div>
	</div>
);
}


function Checkbox({ id, name, defaultValue }) {
	const [isChecked, setIsChecked] = useState(defaultValue);

	// Update isChecked when defaultValue changes
	useEffect(() => {
		setIsChecked(defaultValue);
	}, [defaultValue]);

	const handleCheckboxChange = () => {
		setIsChecked((prevChecked) => !prevChecked);
	};

	return (
		<div>
		<input
			type="checkbox"
			className="form-check-input border-secondary"
			id={id}
			name={name}
			checked={isChecked}
			onChange={handleCheckboxChange}
		/>
		</div>
	);
}





function Table({ header, data, funInsert, funUpdate, funDelete}) {
		const [datas, setTableData]         = useState(data);
		useEffect(() => {
			setTableData(data);
		}, [data]);


		const [modalIsOpen, setModalIsOpen] = useState(false);
		const [rowData, setRowData]         = useState({});

		const openModal = (rowData) => {
			setRowData(rowData || {});
			setModalIsOpen(true);
		};

		const closeModal = () => {
			setModalIsOpen(false);
		};

		const handleSubmit = async (e) => {
			e.preventDefault();

			const formData = new FormData(e.target);

			const updatedRowData = {};
			header.forEach(head => {
				if (head.type !== 'checkbox')
					updatedRowData[head.id] = formData.get(head.id);
				else
					updatedRowData[head.id] = formData.get(head.id) !== null;
			});

			const id = updatedRowData.id;
			console.log(updatedRowData);


			if (id !== '') {
				const oldRowData = datas.find(item => item.id +"" === id);

				const updatedData = datas.map(item => {
					if (item.id + "" === id) {
						return { ...item, ...updatedRowData };
					}
					return item;
				});

				// Appel de funUpdate
				const updateSuccess = await funUpdate(updatedRowData, oldRowData);

				if (updateSuccess) {
					setTableData(updatedData);
					setModalIsOpen(false);
				} else {
					openModal(oldRowData); // Ouvre le modal avec les anciennes données
				}
			} else {
				updatedRowData.id = Math.max(...datas.map(item => item.id), 0) + 1;

				// Appel de funInsert
				const insertSuccess = await funInsert(updatedRowData);

				if (insertSuccess) {
					setTableData(prevData => [...prevData, updatedRowData]);
					setModalIsOpen(false);
				} else {
					openModal(); // Ouvre le modal avec les données nouvellement insérées
				}
			}
		};








	const deleteRow = async (itemDonne) => {
		// Créez une copie des données existantes
		const newData = [...datas];

		// Filtrez la copie des données pour exclure l'élément à supprimer
		const updatedData = newData.filter(item => item.id !== itemDonne.id);

		//Seulement si la méthode renvoie vrai on modifie

		if (await funDelete(itemDonne)) {
			setTableData(updatedData);
		}
	};




	const handleRowDataChange = (key, value) => {
		setRowData({ ...rowData, [key]: value });
	};

	return (
		<div className='m-4'>

			<div className="panel" style={{ maxHeight: '400px', overflowY: 'auto'}}>
				<table className='table table-hover my-0'>
					<thead className='position-sticky top-0'>
						<tr>
							{header.map(column => (
								column.show && // Vérifier si la colonne doit être affichée
								<th className='bg-primary text-white' key={column.id}>{column.name}</th>
							))}
							{(funUpdate !== undefined || funDelete !== undefined) && <th className='bg-primary text-white'>Action</th>}
						</tr>
					</thead>
						<tbody>
							{datas.slice().reverse().map(item => (
								<tr key={item.id} className=''>
									{header.map(column => (
										column.show && (
											<td className='bg-light' key={`${item.id}-${column.id}`}>
												{column.type !== 'checkbox' ? (
													`${item[column.id]}`
												) : (
													<input type='checkbox' checked={item[column.id]} readOnly />
												)}
											</td>
										)
									))}
									{(funUpdate !== undefined || funDelete !== undefined) &&
										<td className='bg-light'>
											{funUpdate !== undefined && <button className='btn btn-primary mx-2 p-0' onClick={() => openModal(item)}>✏️</button>}
											{funDelete !== undefined && <button className='btn btn-danger mx-2 p-0' onClick={() => deleteRow(item)}>🗑️</button>}
										</td>
									}
								</tr>
							))}
						</tbody>
					</table>
				</div>



			<Modal 
				isOpen={modalIsOpen} 
				rowData={rowData} 
				header={header} 
				handleSubmit={handleSubmit} 
				closeModal={closeModal} 
				handleRowDataChange={handleRowDataChange}
			/>
			
			{modalIsOpen && <div className="modal-backdrop fade show"></div>}


			<div className='w-100 d-flex justify-content-end'>
				{funInsert !== undefined && <button className='btn btn-primary m-3 ' onClick={() => openModal(null)}>Ajouter</button>}
			</div>
		</div>
	);
}

export default Table;