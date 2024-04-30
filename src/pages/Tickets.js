import React, { useState, useEffect } from 'react';
import Table from '../components/Table';

export default function Ticket()
{


	// En-tête de la table
	const initialHeader = [
		{ id: 'id'       , name: 'NB Ligne'             , type:'number'  , required : false , editable : false, show : false                     },
		{ id: 'nomcli'   , name: 'Nom du Client'        , type:'text'    , required : false , editable : false, show : true                      },
		{ id: 'email'    , name: 'Email'                , type:'email'   , required : false , editable : false, show : true                      },
		{ id: 'prix'     , name: 'Total en cours'       , type:'number'  , required : false , editable : false, show : true                      },
		{ id: 'present'  , name: 'Présent sur le site'  , type:'checkbox', required : true  , editable : true , show : true, fastEditable : true  },
		{ id: 'btn'      , name: 'Bouton'               , type:'button'    , show : true    , function : filter, btn  : '', className:'btntickets'},
	];

	// En-tête de la table
	const initData = [
		{ id: '1', nomcli: 'test', email: 't' , prix : 2 ,present : true},
		{ id: '2', nomcli: 'test', email: 't' , prix : 2 ,present : true},
		{ id: '3', nomcli: 'test', email: 't' , prix : 2 ,present : true},
		{ id: '4', nomcli: 'test', email: 't' , prix : 2 ,present : true},
	];

	// FILTRES
	const handleChange = (e) => { filter(e.target.value); };
	const handleCbChange = (e) => {filter( e.target.checked);};

	function filter(value)
	{
		/*
		// Filtrer les données en fonction de la valeur de recherche
		const filteredData = initData.filter((element) =>
		{
			// Parcourir les clés de l'en-tête initial
			for (const key of initialHeader)
			{
				// Vérifier si la clé doit être affichée et si la valeur de l'élément correspond à la valeur de recherche
				if (key.show)
				{
					// Vérifier si la valeur de l'élément correspond à la valeur de recherche
					if ((element[key.id] + '').toUpperCase().includes(value.toUpperCase()))
					{
						return true; // Si correspondance, conserver cet élément
					}
				}
			}
			return false; // Si aucune correspondance, exclure cet élément
		});

		// Mettre à jour les données filtrées
		setFilterData(filteredData);*/
	}


	return (
		<div>
			<h1 className="titre">Gestion des Tickets</h1>
			<div className="grpRecherche mt-4 d-flex align-items-center">
				{/* barre de recherche */ }
				<div className="col-sm-3">
					<input className="barre form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" onChange={ handleChange } />
				</div>
			</div>
			<div className="form-check" style={{ marginLeft: '10em' }}>
				<input type='checkbox' className="form-check-input border-secondary" id="afficherClients" onChange={handleCbChange}/>
				<label className="form-check-label" htmlFor="afficherClients">Afficher seulement clients présents</label>
			</div>
			<div className='h-25'>
				<Table
					header={ initialHeader }
					data={ initData }
				/>
			</div>
		</div>
	)
}