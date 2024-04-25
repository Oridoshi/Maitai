import React, { useEffect, useState } from 'react';
import '../style/form.css';		//style du composant
import { cheminPHP } from './VarGlobale';

/**
 * Ce formulaire fonctionne avec un système d'état qui se suivent ex : l'état login
 * envoie sur l'etat mdp lorsqu'on clique sur suivant. Ce qui se passe en réalité c'est
 * que le composant est rechargé avec un nouvel etat et en fonction de l'état passé en
 * paramètre il prendra le code de la constante appelé donc quand on clique sur suivant
 * avec login il rechargera une balise form comme ceci <Form etat='mdp'/> et ainsi de
 * suite pour chaque etat  : mail / confMdp / creerCompte / codeVerif
 */

/**
 * Pour le moment pour les test on a login = test mdp = test mail = test@gmail.com code = 123456
 * On ne doit pas pouvir créeer de compte identique au compte test
 */
const Form = ({ etat }) =>
{
	//stock l'etat et recharge le menu quand on change d'etat
	const [formEtat, setFormEtat] = useState(etat);

	//recharge le form avec le nouvel etat
	const changeEtat = (nouvelEtat) =>
	{
		setFormEtat(nouvelEtat);
	};

	//en fonction de l'etat on appel le code qui correspond à cette état
	let ret;
	switch (formEtat)
	{
		case 'log':
			ret = <Log changeEtat={ changeEtat } />;
			break;
		case 'mdp':
			ret = <Mdp changeEtat={ changeEtat } />;
			break;
		case 'mail':
			ret = <Mail changeEtat={ changeEtat } />;
			break;
		case 'confmdp':
			ret = <ConfMdp changeEtat={ changeEtat } />;
			break;
		case 'code':
			ret = <Code changeEtat={ changeEtat } />;
			break;
		case 'creer':
			ret = <Creer changeEtat={ changeEtat } />;
			break;
		default:
			ret = <Log changeEtat={ changeEtat } />;
	}

	return ret;
};

/*--Page de login--*/
const Log = ({ changeEtat }) =>
{
	//pour changer le login sinon ça change pas
	const [login, setLogin] = useState("");
	const [isValid, setIsValid] = useState(true);

	//pour passer à la page de mot de passe
	const envoyer = async (event) =>
	{
		event.preventDefault();//obligatoire quand on change de page

		//test avec la bd si le login existe bien
		if (await logExist({ login }))
		{
			sessionStorage.setItem('login', login); // Stocke le login en session
			changeEtat('mdp'); // Passe à la page de mot de passe
		}
		else
		{
			setLogin("");//vide le champs de texte
			setIsValid(false);	//change le style
			document.getElementById("btnSubmit").disabled = true;
			setTimeout(() =>
			{
				document.getElementById("btnSubmit").disabled = false;
			}, 2000)//empêche de faire un grand nombre tantative
		}
	};

	//charge la page de création de compte
	const creerCompte = (event) =>
	{
		event.preventDefault();//obligatoire quand on change de page
		changeEtat('creer');
	};

	//évènement dans la zone de texte
	const changement = (event) =>
	{
		regex(event);
		setLogin(event.target.value);//actualise le login
	};

	//test si ce qu'on entre correspon bien à l'expression d'un login
	const regex = (event) =>
	{
		let val = event.target.value;
		const loginRegex = /^[A-Za-z\d]+$/;
		if (!loginRegex.test(val))
		{
			val = val.slice(0, -1);
			event.target.value = val;
		}
	};

	//classes de style
	const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Entrez le nouveau login" : "Cette identifiant n'existe pas";

	//retourne le code de la page de login
	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h3 className="titre">Login</h3>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label label">Identifiant</label>
					<input required type="text" value={ login } className={ inputClass } aria-describedby="emailHelp" placeholder={ placeholderText } onChange={ changement } />
					<button type="button" className="mdpOublie" onClick={ creerCompte }> Créer un compte </button>
				</div>
				<button id="btnSubmit" type="submit" className="btn btn-primary bouton container-fluid">Suivant</button>
			</form>
		</div>
	);
};

/*Page du Mot de passe*/
const Mdp = ({ changeEtat }) =>
{
	//pour changer le mdp et le style
	const [mdp, setMdp] = useState("");
	const [isValid, setIsValid] = useState(true);

	//évènement dans la zone de texte
	const changement = (event) =>
	{
		setMdp(event.target.value);
		setIsValid(true);	//par défaut le style est valide
	};

	//envoye à l'acceuil
	const envoyer = async (event) =>
	{
		event.preventDefault(); // Obligatoire quand on a un chargement de page
		if (await mdpValid(mdp))
		{ // Utilisation directe de mdp
			sessionStorage.setItem('mdpValid', "true");
			window.location.href = "/"; // Lien de l'accueil
		} else
		{
			setMdp(""); // Vide le champ de mot de passe
			setIsValid(false); // Met le style invalide
			document.getElementById("btnSubmit").disabled = true;
			setTimeout(() =>
			{
				document.getElementById("btnSubmit").disabled = false;
			}, 2000); // Empêche de faire un grand nombre de tentatives
		}
	};

	//charge la page des mail quand on oublie le mdp
	const mdpOublie = (event) =>
	{
		event.preventDefault();
		changeEtat('mail');
	};

	//classes de style
	const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Entrez le mot de passe" : "Mot de passe éronné";

	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h3 className="titre">Mot de passe</h3>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label label">Mot de passe</label>
					<input required type="password" value={ mdp } className={ inputClass } placeholder={ placeholderText } onChange={ changement } />
					<button type="button" className="mdpOublie" onClick={ mdpOublie }> Mot de passe oublié ? </button>
				</div>
				<button id="btnSubmit" type="submit" className="btn btn-primary bouton container-fluid">Connexion</button>
			</form>
		</div>
	);
};

/*-Page de Création de compte-*/
const Creer = ({ changeEtat }) =>
{
	//pour changer les contenus des inputs
	const [login, setLogin] = useState("");
	const [mail, setMail] = useState("");
	const [tel, setTel] = useState("");

	//pour changer le style quand c'est faux
	const [isValid, setIsValid] = useState(true);

	//évènement des zones de texte
	const changeLogin = (event) =>
	{
		regexLog(event);
		setLogin(event.target.value);
		setIsValid(true);	//par défaut le style est valide
	};
	const changeMail = (event) =>
	{
		regexMail(event);
		setMail(event.target.value);
	};
	const changeTel = (event) =>
	{
		regexNum(event);
		setTel(event.target.value);
	};

	//envoye à la page de choix de mdp lorsqu'on souhaite créer un compte
	const envoyer = (event) =>
	{
		event.preventDefault();
		if (!logExist())// il ne faut pas creer 2 compte identique
		{
			if (tel.length === 14)
			{
				sessionStorage.setItem('login', login);
				changeEtat('confmdp');
			}
		}
		else
		{
			setLogin("");//vide le champs de texte
			setIsValid(false);	//change le style
			document.getElementById("btnSubmit").disabled = true;
			setTimeout(() =>
			{
				document.getElementById("btnSubmit").disabled = false;
			}, 2000)//empêche de faire un grand nombre tantative
		}
	};

	/* Regex des champs de textes test si l'expression son correctes*/
	const regexLog = (event) =>
	{
		let loginVal = event.target.value;
		const loginRegex = /^[A-Za-z]+$/;
		if (!loginRegex.test(loginVal))
		{
			loginVal = loginVal.slice(0, -1);
			event.target.value = loginVal;
		}
	};
	const regexMail = (event) =>
	{
		let mailVal = event.target.value;
		const regex = /^[a-z0-9@.]+$/;
		if (!regex.test(mailVal))
		{
			mailVal = mailVal.slice(0, -1);
			event.target.value = mailVal;
		}
	};
	const regexNum = (event) =>
	{
		let telVal = event.target.value.replace(/\D/g, '');
		telVal = telVal.replace(/(\d{2})(?=\d)/g, '$1 ');
		telVal = telVal.slice(0, 14);
		event.target.value = telVal;
	};

	//classes de style
	const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Entrez votre login" : "Cette identifiant existe déjà !";

	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h4 className="titre">Création du compte</h4>
				<div className="mb-3">
					<label htmlFor="exampleInputLogin" className="form-label label">Identifiant</label>
					<input type="text" required value={ login } className={ inputClass } id="exampleInputLogin" aria-describedby="emailHelp" placeholder={ placeholderText } onChange={ changeLogin } />
					<label htmlFor="exampleInputMail" className="form-label label">Mail</label>
					<input type="email" required value={ mail } className="form-control saisie" aria-describedby="emailHelp" placeholder="Entrez votre mail" onChange={ changeMail } />
					<label htmlFor="exampleInputPhone" className="form-label label"> Numéro de téléphone </label>
					<input type="tel" required value={ tel } className="form-control saisie" id="exampleInputPhone" aria-describedby="emailHelp" placeholder="Entrez votre numéro" onChange={ changeTel } />
				</div>
				<button id="btnSubmit" type="submit" className="btn btn-primary bouton container-fluid">Suivant</button>
			</form>
		</div>
	);
};

/*-Page de renseignement de l'adresse mail-*/
const Mail = ({ changeEtat }) =>
{
	//pour changer les contenus des inputs
	const [mail, setMail] = useState("");
	const [isValid, setIsValid] = useState(true);

	//évènement dans la zone de texte
	const changement = (event) =>
	{
		regexMail(event);
		setMail(event.target.value);
		setIsValid(true);
	};

	//envoye vers la page de récupération du compte via un code
	const envoyer = async (event) =>
	{
		event.preventDefault();//obligatoire pour un changement de page
		if (await mailValid(mail))
		{
			changeEtat('code');
		}
		else
		{
			setMail("");//vide le champs de texte
			setIsValid(false);//applique le style invalide
			document.getElementById("btnSubmit").disabled = true;
			setTimeout(() =>
			{
				document.getElementById("btnSubmit").disabled = false;
			}, 2000)//empêche de faire un grand nombre tantative
		}
	};

	//test i on entre bien une expression correspondant à une adresse mail
	const regexMail = (event) =>
	{
		let mailVal = event.target.value;
		const regex = /^[a-z0-9@.]+$/;
		if (!regex.test(mailVal))
		{
			mailVal = mailVal.slice(0, -1);
			event.target.value = mailVal;
		}
	};

	//classes de style
	const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Entrez votre mail" : "Ce mail n'existe pas !";

	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h4 className="titre">Mot de passe oublié</h4>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label label">Mail</label>
					<input required type="email" value={ mail } className={ inputClass } id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={ placeholderText } onChange={ changement } />
				</div>
				<button id="btnSubmit" type="submit" className="btn btn-primary bouton container-fluid">Suivant</button>
			</form>
		</div>
	);
};

/*--Code de la page de Nouveau mot de passe*/
const ConfMdp = ({ changeEtat }) =>
{
	//pour changer les contenus des inputs
	const [mdp, setMdp] = useState("");
	const [mdpconf, setMdpConf] = useState("");

	//pour changer le style quand les champs sont invalides
	const [isValid, setIsValid] = useState(true);

	//évènement dans les zones de texte
	const changeMdp = (event) =>
	{
		setMdp(event.target.value);
		setIsValid(true);
	};
	const changeMdpConf = (event) =>
	{
		setMdpConf(event.target.value);
	};

	//envoye à la page d'acceuil
	const envoyer = (event) =>
	{
		event.preventDefault();//obligatoire pour un changment de page
		if (valider())
		{
			sessionStorage.setItem('mdpValid', "true");
			window.location.href = "/";//envoie à la page d'accueil
		}
		else
		{
			setMdpConf("");	//vide le champs de texte
			setIsValid(false);//applique le style invalide
		}
	};

	//test si le mot de passe et le conf mot de passe sont identiques
	function valider()
	{
		return mdp === mdpconf;
	}

	//classes de style
	const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Confirmer le mot de passe" : "Les mot de passes sont différents !";

	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h3 className="titre">Mot de passe</h3>
				<div className="mb-3">
					<div className="champs">
						<label htmlFor="exampleInputPassword1" className="form-label label">Mot de passe</label>
						<input required type="password" value={ mdp } className="form-control" id="exampleInputPassword1" placeholder="Entrez votre mot de passe" onChange={ changeMdp } />
					</div>
					<div className="champs">
						<label htmlFor="exampleInputPassword1" className="form-label label">Confirmer le mot de passe</label>
						<input required type="password" value={ mdpconf } className={ inputClass } id="exampleInputPassword1" placeholder={ placeholderText } onChange={ changeMdpConf } />
					</div>
				</div>
				<button type="submit" className="btn btn-primary bouton container-fluid">Connexion</button>
			</form>
		</div>
	);
};

/*-Page de code pour la récupération du compte-*/
const Code = ({ changeEtat }) =>
{
	//pour changer les contenus des inputs
	const [code, setCode] = useState("");
	const [isValid, setIsValid] = useState(true);

	//évènements dans la zone de texte
	const changement = (event) =>
	{
		regex(event);
		setCode(event.target.value);
		setIsValid(true);	//par défaut le style est valide
	};

	//ennvoye à la page de choix du nouveau mot de passe
	const envoyer = async (event) =>
	{
		event.preventDefault();//obligatoire pour un changement de page
		if (code.length === 6) // test si la longeur du code est bien de 6
		{
			if (await mdpValid(code))
			{
				changeEtat('confmdp');//charge la page de choix du mot de passe
			}
			else
			{
				document.getElementById("btnSubmit").disabled = true;
				setCode("");	//vide le champs de texte
				setIsValid(false);//applique le style invalide
				setTimeout(() =>
				{
					document.getElementById("btnSubmit").disabled = false;
				}, 2000)//empêche de faire un grand nombre tantative
			}
		}
	};

	//renvoie à la page des mail si on n'a pas reçu de mail
	const renvoyerMail = (event) =>
	{
		event.preventDefault();
		changeEtat('mail');
	};

	//test si on entre bien des chiffres
	const regex = (event) =>
	{
		let codeVal = event.target.value.replace(/\D/g, '');
		codeVal = codeVal.slice(0, 6);	// /!\ j'ai choisi un nombre de 6 chiffres arbitrairement si on veut la changer c'est ici et dans envoyer()
		event.target.value = codeVal;
	};

	//classes de style
	const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Entrez votre code" : "Ce code n'existe pas";

	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h4 className="titre">Mot de passe oublié</h4>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label label"> Code </label>
					<input required type="text" className={ inputClass } id="exampleInputEmail1"
						aria-describedby="emailHelp" placeholder={ placeholderText } onChange={ changement } />
					<button type="button" className="mdpOublie" onClick={ renvoyerMail }> Renvoyer un mail </button>
				</div>
				<button id="btnSubmit" type="submit" className="btn btn-primary bouton container-fluid">Suivant</button>
			</form>
		</div>
	);
};

//cherche en bado si on a bien un utilisateur
const logExist = async ({ login }) =>
{
	try
	{
		const response = await fetch(cheminPHP + "utilisateur/GetUtilisateurs.php", {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8'
			},
		});

		if (!response.ok)
		{
			throw new Error('Erreur de réseau !');
		}

		const data = await response.json();
		const utilisateurs = data.map(item => ({
			login: item.login,
			mdp: item.mdp,
			email: item.email,
			libdroit: item.libdroit
		}));

		return utilisateurs.some(user => user.login === login);
	} catch (error)
	{
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}

//test si le mdp correspond au user
const mdpValid = async (pass) =>
{
	try
	{
		const response = await fetch(cheminPHP + "utilisateur/GetUtilisateurs.php", {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8'
			},
		});

		if (!response.ok)
		{
			throw new Error('Erreur de réseau !');
		}

		const data = await response.json();
		const utilisateurs = data.map(item => ({
			login: item.login,
			mdp: item.mdp,
			email: item.email,
			libdroit: item.libdroit
		}));
		return utilisateurs.some(user => user.login === sessionStorage.getItem('login') &&
			user.mdp === pass);
	} catch (error)
	{
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}

//test si le mail correspond au user
const mailValid = async (mail) =>
{
	try
	{
		const response = await fetch(cheminPHP + "utilisateur/GetUtilisateurs.php", {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8'
			},
		});

		if (!response.ok)
		{
			throw new Error('Erreur de réseau !');
		}

		const data = await response.json();
		const utilisateurs = data.map(item => ({
			login: item.login,
			mdp: item.mdp,
			email: item.email,
			libdroit: item.libdroit
		}));

		return utilisateurs.some(user => user.login === sessionStorage.getItem('login') &&
			user.email === mail);
	} catch (error)
	{
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}

export default Form;