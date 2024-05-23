import React, { useState } from 'react';
import '../style/form.css';		//style du composant
import { cheminPHP } from './VarGlobal';

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

window.addEventListener('load', async (event) =>	//recharge la page
{
	if(! await setDroits()) {
		window.location.reload();
	}

	if(sessionStorage.getItem('idSession') != null && !await mdpValid(sessionStorage.getItem('idSession'), false)){
		sessionStorage.removeItem('login');
		sessionStorage.removeItem('idSession');
		sessionStorage.setItem('droit', "");
		sessionStorage.removeItem('mdpValid');
		window.location.reload();
	}
});
let codeVal;

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
		case 'codeRecup':
			ret = <Code changeEtat={ changeEtat } recup={ true } />;
			break;
		case 'codeCreer':
			ret = <Code changeEtat={ changeEtat } recup={ false } />;
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
	//reset les cookies
	resetCookies();

	//pour changer le login sinon ça change pas
	const [login, setLogin] = useState("");
	const [isValid, setIsValid] = useState(true);

	//pour passer à la page de mot de passe
	const envoyer = async (event) =>
	{
		event.preventDefault();//obligatoire quand on change de page

		//test avec la bd si le login existe bien
		if (await logExist( login ))
		{
			sessionStorage.setItem('login', login); // Stocke le login en session
			setDroits();
			if(await mdpExist(login))
				changeEtat('mdp'); // Passe à la page de mot de passe
			else {
				const mail = await getMail(login);
				await recupCode(mail, "false")
				sessionStorage.setItem('mail', mail);
				changeEtat('codeCreer');
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

	//test si ce qu'on entre correspond bien à l'expression d'un login
	const regex = (event) =>
	{
		let val = event.target.value;
		val = val.replace(' ', '-');
		const loginRegex = /^[A-Za-z\d\-àâäéèêëîïôöùûüç]+$/;
		if (!loginRegex.test(val))
		{
			val = val.slice(0, -1);
		}
		event.target.value = val;
	};

	//classes de style
	const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Entrez votre identifiant" : "Cet identifiant n'existe pas";

	//retourne le code de la page de login
	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h3 className="letitre">Connexion</h3>
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
		if (await mdpValid(mdp, true))
		{ // Utilisation directe de mdp
			sessionStorage.setItem('mdpValid', "true");
			sessionStorage.setItem('idSession', await getMdp());
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
	const mdpOublie = async (event) =>
	{
		event.preventDefault();
		const mail = await getMail(sessionStorage.getItem('login'));
		await recupCode(mail, "true")
		sessionStorage.setItem('mail', mail);
		changeEtat('codeRecup');
	};

	//classes de style
	const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Entrez votre mot de passe" : "Mot de passe éronné";

	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h3 className="letitre">Connexion</h3>
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
	//reset les cookies
	resetCookies();
	sessionStorage.setItem('statut', 'nouveau');

	//pour changer les contenus des inputs
	const [login, setLogin] = useState("");
	const [mail, setMail] = useState("");
	const [tel, setTel] = useState("");

	//pour changer le style quand c'est faux
	const [isValid, setIsValid] = useState(true);
	const [mailValid, setMailValid] = useState(true);

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
	const envoyer = async (event) =>
	{
		event.preventDefault();
		if (await logExist({ login }) || await mailExist(mail))// il ne faut pas creer 2 compte identique
		{
			if (await mailExist(mail))
			{
				setMail("");
				setMailValid(false);
			}
			else
			{
				setLogin("");//vide le champs de texte
				setIsValid(false);	//change le style
			}
			document.getElementById("btnSubmit").disabled = true;
			setTimeout(() =>
			{
				document.getElementById("btnSubmit").disabled = false;
			}, 2000)//empêche de faire un grand nombre tantative
		}
		else
		{
			if (tel.length === 14)
			{
				sessionStorage.setItem('login', login);
				sessionStorage.setItem('mail', mail);
				sessionStorage.setItem('tel', tel);
				changeEtat('confmdp');
			}
		}
	};

	/* Regex des champs de textes test si l'expression son correctes*/
	const regexLog = (event) =>
	{
		let val = event.target.value;
		val = val.replace(' ', '-');
		const loginRegex = /^[A-Za-z\d\-àâäéèêëîïôöùûüç]+$/;
		if (!loginRegex.test(val))
		{
			val = val.slice(0, -1);
		}
		event.target.value = val;
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
	const mailClass = mailValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Entrez votre identifiant" : "Cette identifiant existe déjà !";
	const placeholderMail = mailValid ? "Entrez votre mail" : "Ce mail existe déjà !";


	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h4 className=" letitre letitrepetit">Création du compte</h4>
				<div className="mb-3">
					<label htmlFor="exampleInputLogin" className="form-label label">Identifiant</label>
					<input type="text" required value={ login } className={ inputClass } aria-describedby="emailHelp" placeholder={ placeholderText } onChange={ changeLogin } />
					<label htmlFor="exampleInputMail" className="form-label label">Mail</label>
					<input type="email" required value={ mail } className={ mailClass } aria-describedby="emailHelp" placeholder={ placeholderMail } onChange={ changeMail } />
					<label htmlFor="exampleInputPhone" className="form-label label"> Numéro de téléphone </label>
					<input type="tel" pattern="0[1-9](\s?\d{2}){4}" required value={ tel } className="form-control saisie"  aria-describedby="emailHelp" placeholder="Entrez votre numéro" onChange={ changeTel } />
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
			await recupCode(mail, "true")
			sessionStorage.setItem('mail', mail);
			changeEtat('codeRecup');
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
				<h4 className="letitre">Mot de passe oublié</h4>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label label">Mail</label>
					<input required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" type="email" value={ mail } className={ inputClass } aria-describedby="emailHelp" placeholder={ placeholderText } onChange={ changement } />
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
	const envoyer = async (event) =>
	{
		event.preventDefault();//obligatoire pour un changment de page
		if (valider())
		{
			sessionStorage.setItem('mdpValid', "true");
			if (sessionStorage.getItem('statut') === 'nouveau')
			{
				await funInsert(mdp);
			}
			else
			{
				await funUpdate(mdp);
			}
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
	const placeholderText = isValid ? "Confirmez le mot de passe" : "Les mot de passes sont différents !";

	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h3 className="letitre">Mot de passe</h3>
				<div className="mb-3">
					<div className="champs">
						<label htmlFor="exampleInputPassword1" className="form-label label">Mot de passe</label>
						<input required type="password" value={ mdp } className="form-control" placeholder="Entrez votre mot de passe" onChange={ changeMdp } />
					</div>
					<div className="champs">
						<label htmlFor="exampleInputPassword1" className="form-label label">Confirmer le mot de passe</label>
						<input required type="password" value={ mdpconf } className={ inputClass } placeholder={ placeholderText } onChange={ changeMdpConf } />
					</div>
				</div>
				<button type="submit" className="btn btn-primary bouton container-fluid">Connexion</button>
			</form>
		</div>
	);
};

/*-Page de code pour la récupération du compte-*/
const Code = ({ changeEtat, recup }) =>
{
	//pour changer les contenus des inputs
	const [code, setCode] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [val, setVal] = useState("");

	//évènements dans la zone de texte
	const changement = (event) =>
	{
		let nouvelleVal = event.target.value;
		if(nouvelleVal.length <= val.length && nouvelleVal.length === 4) event.target.value = nouvelleVal.slice(0, 3);
		regex(event);
		setCode(event.target.value);
		setIsValid(true);	//par défaut le style est valide

		setVal(event.target.value);
	};

	//ennvoye à la page de choix du nouveau mot de passe
	const envoyer = async (event) =>
	{
		event.preventDefault();//obligatoire pour un changement de page
		if (code.length === 9) // test si la longeur du code est bien de 6
		{
			if (code === codeVal)
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
		recupCode(sessionStorage.getItem('mail'), recup);
	};

	//test si on entre bien des chiffres
	const regex = (event) =>
	{
		// Supprime tous les caractères non alphabétiques et non numériques
		let codeVal = event.target.value.replace(/[^A-Za-z0-9]/g, '');

		// Insère un tiret après chaque groupe de 4 caractères
		codeVal = codeVal.slice(0, 8); // Limite la longueur à 8 caractères
		if(codeVal.length >= 4) codeVal = codeVal.slice(0,4) + "-" + codeVal.slice(4);

		// Met à jour la valeur de l'élément cible
		event.target.value = codeVal
	};

	//classes de style
	const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";
	const placeholderText = isValid ? "Entrez votre code" : "Ce code n'existe pas";

	const h4 = recup ? "Mot de passe oublié" : "Création mot de passe";
	const label = recup ? "Code de récupération" : "Code de création";


	return (
		<div>
			<form className="form" onSubmit={ envoyer }>
				<h4 className="letitre">{h4}</h4>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label label">{label}</label>
					<input required type="text" className={ inputClass }
						aria-describedby="emailHelp" placeholder={ placeholderText } onChange={ changement } />
					<button type="button" className="mdpOublie" onClick={ renvoyerMail }> Renvoyer un mail </button>
				</div>
				<button id="btnSubmit" type="submit" className="btn btn-primary bouton container-fluid">Suivant</button>
			</form>
		</div>
	);
};

const resetCookies = () =>
{
	sessionStorage.removeItem('login');
	sessionStorage.removeItem('mail');
	sessionStorage.removeItem('tel');
	sessionStorage.removeItem('statut');
	sessionStorage.removeItem('droit');

}

/**
 * Ici c'est la partie bado qui sera relié au back
 *
 */

/*--REQUETE--*/

const getMdp = async () => {
	const data = new FormData();
	data.append('login', sessionStorage.getItem('login'));

	try {
		const response = await fetch(cheminPHP + "utilisateur/GetMdp.php", {
			method: 'POST',
			body: data
		});

		if (!response.ok) {
			throw new Error('Erreur de réseau !');
		}

		const dat = await response.text();

		return dat;
	} catch (error) {
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}

const loginExist = async (data) => {
	try {
		const response = await fetch(cheminPHP + "utilisateur/LoginExist.php", {
			method: 'POST',
			body: data
		});

		if (!response.ok) {
			throw new Error('Erreur de réseau !');
		}

		const dat = await response.text();
		console.log(dat);
		return dat === "1";
	} catch (error) {
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}

const pwdExist = async (data) => {
	try {
		const response = await fetch(cheminPHP + "utilisateur/PwdExist.php", {
			method: 'POST',
			body: data
		});

		if (!response.ok) {
			throw new Error('Erreur de réseau !');
		}

		const dat = await response.text();
		return dat === "1";
	} catch (error) {
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}


const pwdValid = async (data) => {
	try {
		const response = await fetch(cheminPHP + "utilisateur/PwdForLogin.php", {
			method: 'POST',
			body: data
		});

		if (!response.ok) {
			throw new Error('Erreur de réseau !');
		}

		const dat = await response.text();
		return dat === "1";
	} catch (error) {
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}

const mailIsValid = async (data) => {
	try {
		const response = await fetch(cheminPHP + "utilisateur/MailForLogin.php", {
			method: 'POST',
			body: data
		});
		if (!response.ok) {
			throw new Error('Erreur de réseau !');
		}

		const dat = await response.text();
		return dat === "1";
	} catch (error) {
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}

const mailInDB = async (data) => {
	try {
		const response = await fetch(cheminPHP + "utilisateur/MailExist.php", {
			method: 'POST',
			body: data

		});

		if (!response.ok) {
			throw new Error('Erreur de réseau !');
		}

		const dat = await response.text();
		return dat === "1";
	} catch (error) {
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}

const getDroit = async (data) => {
	try {
		const response = await fetch(cheminPHP + "GetDroit.php", {
			method: 'POST',
			body: data
		});

		if (!response.ok) {
			throw new Error('Erreur de réseau !');
		}

		const dat = await response.text();
		return dat;
	} catch (error) {
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}


//cherche en bado si on a bien un utilisateur
const logExist = async ( log ) =>
{
	const data = new FormData();
	data.append('login', log);
	const utilisateurs = await loginExist(data);
	return utilisateurs;
}

const mdpExist = async (log) =>
{
	const data = new FormData();
	data.append('login', log);
	const utilisateurs = await pwdExist(data);
	return utilisateurs;
}

const getMail = async (log) => {
	const data = new FormData();
	data.append('login', log);
	try {
		const response = await fetch(cheminPHP + "utilisateur/GetMail.php", {
			method: 'POST',
			body: data
		});

		if (!response.ok) {
			throw new Error('Erreur de réseau !');
		}

		const dat = await response.text();
		return dat;

	} catch (error) {
		console.log("erreur", error);
		return false; // Retourner une valeur par défaut en cas d'erreur
	}
}

//test si le mdp correspond au user
const mdpValid = async (pass, connexion) =>
{
	const data = new FormData();
	data.append('login', sessionStorage.getItem('login'));
	data.append('mdp', pass);
	if(connexion == true)
		data.append('connexion', connexion);
	const utilisateurs = await pwdValid(data);
	return utilisateurs;
}

//test si le mail correspond au user
const mailValid = async (mail) =>
{
	const data = new FormData();
	data.append('login', sessionStorage.getItem('login'));
	data.append('email', mail);
	const utilisateurs = await mailIsValid(data);
	return utilisateurs;
}
//test si le mail exist en bado
const mailExist = async (mail) =>
{
	const data = new FormData();
	data.append('email', mail);
	const utilisateurs = await mailInDB(data);
	return utilisateurs;
}

const setDroits = async() =>
{
	const data = new FormData();
	data.append('login', sessionStorage.getItem('login'));
	const utilisateurs = await getDroit(data);
	const droit = sessionStorage.getItem('droit');
	sessionStorage.setItem('droit', utilisateurs);
	return droit === utilisateurs;
}

/*--INSERT--*/

// Fonction pour l'insertion
const funInsert = async (mdp) => {
	try {

		let tel = sessionStorage.getItem('tel').replace(/\s/g, '');

		const formData = new FormData();
		formData.append('login', sessionStorage.getItem('login'));
		formData.append('mdp',mdp);
		formData.append('email', sessionStorage.getItem('mail'));
		formData.append('tel',tel);

		const requestOptions = {
			method: 'POST',
			body: formData
		};

		const response = await fetch(cheminPHP + "client/CreationClient.php", requestOptions);


		if (!response.ok) {
			throw new Error('Une erreur s\'est produite.');
		}

		const data = await response.text();
		afficherError(data);
		return data === ""; // Retourne true si la suppression a réussi, sinon false
	} catch (error) {
		console.log(error);
		return false; // Retourne false en cas d'erreur
	}
};

// Fonction pour l'update
const funUpdate = async (mdp) => {
	try {

		const formData = new FormData();
		formData.append('login',sessionStorage.getItem('login'))
		formData.append('mdp', mdp );

		const requestOptions = {
			method: 'POST',
			body: formData
		};

		const response = await fetch(cheminPHP + "utilisateur/ModificationUtilisateur.php", requestOptions);

		if (!response.ok) {
			throw new Error('Une erreur s\'est produite.');
		}

		const data = await response.text();
		afficherError(data);
		return data === ""; // Retourne true si la suppression a réussi, sinon false
	} catch (error) {
		console.log(error);
		return false; // Retourne false en cas d'erreur
	}
};

const recupCode = async (mail, recup) =>
{
	try {

		const formData = new FormData();
		formData.append('email', mail);
		formData.append('recup', recup);

		const requestOptions = {
			method: 'POST',
			body: formData
		};

		const response = await fetch(cheminPHP + "../SendMail.php", requestOptions);
		// const response = await fetch("http://172.26.4.207/Maitai/src/php/SendMail.php", requestOptions);

		if (!response.ok) {
			throw new Error('Une erreur s\'est produite.');
		}

		const data = await response.text();
		codeVal = data;
		afficherError(data);
		return data === ""; // Retourne true si la suppression a réussi, sinon false
	} catch (error) {
		console.log(error);
		return false; // Retourne false en cas d'erreur
	}
}

//gestion des erreurs
function afficherError(data)
{
	const regex = /SQLSTATE\[(\d+)\].+?(\d+)(.+?) in C:\\xampp/g; // Expression régulière pour capturer le code d'erreur et le texte jusqu'à "in C:\\xampp..."
	const match = regex.exec(data);

	if (match)
	{
		const sqlState = match[1]; // État SQL
		const errorCode = match[2]; // Code d'erreur
		const errorMessageText = match[3].trim(); // Texte du message d'erreur

		console.log("Refuse de la base de donnée, raison : ", errorMessageText, "( SQL STATE[", sqlState, "] error code :", errorCode);
		alert(errorMessageText);

	}
}

export default Form;
