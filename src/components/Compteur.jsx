import React, { useEffect, useRef, useState } from "react";
import '../style/compteur.css';

const Compteur = ({ valIni = 0, setVal, updateTotComm, idprod, iduti, prixspe }) =>
{
	const [valeur, setValeur] = useState(valIni);
	const incRef1 = useRef(null);
	const incRef2 = useRef(null);

	useEffect(() =>
	{
		setValeur(valIni);
	}, [valIni]);

	const augmente = () =>
	{
		if (valeur < 1000)
		{
			const newVal = valeur + 1;
			setValeur(newVal);
			if (setVal) setVal(newVal);
			if (updateTotComm && idprod !== undefined && iduti !== undefined && prixspe !== undefined)
			{
				updateTotComm(idprod, iduti, newVal, prixspe);
			}
		}
	};

	const diminue = () =>
	{
		if (valeur > 0)
		{
			const newVal = valeur - 1;
			setValeur(newVal);
			if (setVal) setVal(newVal);
			if (updateTotComm && idprod !== undefined && iduti !== undefined && prixspe !== undefined)
			{
				updateTotComm(idprod, iduti, newVal, prixspe);
			}
		}
	};

	useEffect(() =>
	{
		const adjustButtonWidth = (button) =>
		{
			if (button)
			{
				const height = button.offsetHeight;
				button.style.width = `${ height }px`;
			}
		};

		adjustButtonWidth(incRef1.current);
		adjustButtonWidth(incRef2.current);
	}, []);

	return (
		<div className="compteur">
			<div className="btnmoins">
				<button ref={ incRef1 } className="inc d" onClick={ diminue }></button>
			</div>
			<div className="valeur">{ valeur }</div>
			<div className="btnplus">
				<button ref={ incRef2 } className="inc a" onClick={ augmente }></button>
			</div>
		</div>
	);
};

export default Compteur;
