import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Link } from "react-router-dom";

//import des pages pour les routes
import Accueil from "../pages/Accueil";
import Client from "../pages/Client";
import FicheSecu from "../pages/FicheSecu";
import Produits from "../pages/Produits";
import Tickets from "../pages/Tickets";
import Utilisateurs from "../pages/Utilisateurs";
import Form from "../components/Form";
import Historique from "../pages/Historique";

import '../style/nav.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Navbar({ role })
{
	//stocke les éléments de la navbar
	let navLinks = [];
	const [showModal, setShowModal] = useState(false);

	//en fonction du paramètre on charge plus ou moins de role
	role = sessionStorage.getItem('droit');
	console.log('role');
	console.log(role);
	switch (role)
	{
		case 'Admin': navLinks = ['Clients', 'Utilisateurs', 'Produits', 'Tickets', 'Fiche de sécurité'];
			break;
		case 'Maitai': navLinks = ['Clients', 'Fiche de sécurité'];
			break;
		case 'Client' : navLinks = ['Fiche de sécurité'];
			break;
		default: navLinks = [];
			break;
	}

	//à chaque on fois qu'on appel la nav on regarde si le user est connecté en fonction de ça on aura un bouton connexion ou deconnexion
	const getConnexion = () =>
	{
		//test si c'est une connexion ou une deconnexion
		if (sessionStorage.getItem('login') !== null && sessionStorage.getItem('mdpValid') === "true")
		{
			return (
				<div className="divlog">
					<ul className="divlog">
						<li className="login">{sessionStorage.getItem('login')}</li>
					</ul>
					<a href="/" onClick={ deconnect }>
						<Button className=" btnLogout"></Button>
					</a>
				</div>
			);
		} else
		{
			return (
				<Button className="btnLog" onClick={ toggleModal }>
					Connexion
				</Button>
			);
		}
	}
	//retire l'utilisateur de la session quand on appuye sur deconnecter
	const deconnect = () =>
	{
		sessionStorage.removeItem('login'); // Supprimer l'élément 'login' du sessionStorage
		sessionStorage.removeItem('mdpValid'); // Supprimer l'élément 'mdpValid' du sessionStorage
		sessionStorage.removeItem('droit'); // Supprimer l'élément 'droit' du sessionStorage
	}
	//affiche ou non le popup de login
	const toggleModal = () =>
	{
		setShowModal(!showModal);
	};

	//retourne le code de chaque éléments de la nav
	const getItem = () =>
	{
		return navLinks.map((link, index) => (
			<Link key={ index } className="nav-link elt" to={ getUrl(link).toLowerCase().replace(/ /g, '-') }> { link } </Link>
		))
	}
	//retourne l'url de l'elements passé en paramètre pour la redirection
	const getUrl = (link) =>
	{
		return '/' + link;
	};

	//code la navabar
	return (
		<div>
			<div className="manav container-fluid">
				<div className="navbar">
					<nav className="navbar navbar-expand-lg nav">
						<div className="container-fluid">
							<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<Link className="navbar-brand logoMaitai" to="/"></Link>
							<Link className="navbar-brand btnAccueil" to="/"></Link>
							<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
								{getItem()}
							</div>
						</div>
					</nav>
				</div>
				<div>
					{getConnexion()}
				</div>
			</div>
			<div>
				<Routes>
					<Route path="/" element={<Accueil />} />
					<Route path="/clients" element={<Client />} />
					<Route path="/utilisateurs" element={<Utilisateurs />} />
					<Route path="/produits" element={<Produits />} />
					<Route path="/tickets" element={<Tickets />} />
					<Route path="/fiche-de-sécurité" element={<FicheSecu />} />
					<Route path="/historique" element={<Historique/>} />
				</Routes>
				<Modal className="popup d-flex justify-content-center align-items-center" show={showModal} onHide={toggleModal}>
					<Modal.Body>
						<Form />
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
}

export default Navbar;
