import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

//import des pages pour les routes
import Accueil from "../pages/Accueil";
import Client from "../pages/Client";
import FicheSecu from "../pages/FicheSecu";
import Produits from "../pages/Produits";
import Tickets from "../pages/Tickets";
import Utilisateurs from "../pages/Utilisateurs";

import '../style/nav.css';


function Navbar({ role })
{
	let navLinks = [];

	switch (role)
	{
		case 'admin': navLinks = ['Clients', 'Utilisateurs', 'Produits', 'Tickets', 'Fiche de sécurité'];
			break;
		case 'user': navLinks = ['Clients', 'Fiche de sécurité'];
			break;
		default: navLinks = ['Fiche de sécurité'];
			break;
	}
	const getUrl = (link) =>
	{
		return '/' + link;
	};

	const getItem = () =>
	{
		return navLinks.map((link, index) => (
			<Link key={ index } className="nav-link elt" to={ getUrl(link).toLowerCase().replace(/ /g, '-') }> { link } </Link>
		))
	}

	return (
		<div className="navbar">
			<nav className="navbar navbar-expand-lg nav">
				<div className="container-fluid">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<Link className="navbar-brand logoMaitai" to="/"></Link>
					<Link className="navbar-brand btnAccueil" to="/"></Link>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						{ getItem() }
					</div>
					<Link className="navbar-brand btnLogout" to="/"></Link>
				</div>
			</nav>
			<Routes>
				<Route path="/" element={ <Accueil /> } />
				<Route path="/clients" element={ <Client /> } />
				<Route path="/utilisateurs" element={ <Utilisateurs /> } />
				<Route path="/produits" element={ <Produits /> } />
				<Route path="/tickets" element={ <Tickets /> } />
				<Route path="/fiche-de-sécurité" element={ <FicheSecu /> } />
			</Routes>
		</div>
	);
}

export default Navbar;
