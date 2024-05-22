import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

// import des pages pour les routes
import Accueil from "../pages/Accueil";
import Client from "../pages/Client";
import Secu from "../pages/Secu";
import Produits from "../pages/Produits";
import Tickets from "../pages/Tickets";
import Utilisateurs from "../pages/Utilisateurs";
import Form from "../components/Form";
import Historique from "../pages/Historique";
import FicheSecu from "../pages/FicheSecu";
import Planning from "../pages/Planning"
import Resume from "../pages/Resume";

import '../style/nav.css';
import '../style/form.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Navbar({ role })
{
    let navLinks = [];
    const [showModal, setShowModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const location = useLocation(); // Utilisation de useLocation pour obtenir l'URL actuelle

    // Initialize refs outside of the loop
    const refs = {
        'Clients': useRef(null),
        'Utilisateurs': useRef(null),
        'Produits': useRef(null),
        'Tickets': useRef(null),
        'Fiches de sécurité': useRef(null),
    };

    const toggleForm = () =>
    {
        setShowForm(!showForm);
    };

    //en fonction du paramètre on charge plus ou moins de role
    role = sessionStorage.getItem('droit');
    switch (role)
    {
        case 'Admin': navLinks = ['Clients', 'Utilisateurs', 'Produits', 'Tickets', 'Planning'];
            break;
        case 'Maitai': navLinks = ['Clients', 'Tickets'];
            break;
        case 'Client': navLinks = ['Fiches de sécurité', 'Planning'];
            break;
        default: navLinks = [];
            break;
    }

    useEffect(() =>
    {
        const currentPath = location.pathname.toLowerCase();
        Object.keys(refs).forEach(link =>
        {
            const url = getUrl(link).toLowerCase().replace(/ /g, '-');
            if (refs[link].current)
            {
                if (currentPath === url)
                {
                    refs[link].current.classList.add('selected');
                } else
                {
                    refs[link].current.classList.remove('selected');
                }
            }
        });
    }, [location]);

    const getConnexion = () =>
    {
        if (sessionStorage.getItem('login') !== null && sessionStorage.getItem('mdpValid') === "true")
        {
            return (
                <div className="divlog">
                    <ul className="divlog">
                        <li className="login">{ sessionStorage.getItem('login') }</li>
                    </ul>
                    <a href="/" onClick={ deconnect }>
                        <Button className="btnLogout"></Button>
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

    const deconnect = () =>
    {
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('mdpValid');
        sessionStorage.removeItem('droit');
    }

    const toggleModal = () =>
    {
        setShowModal(!showModal);
        deconnect();
    };

    const getItem = () =>
    {
        const currentPath = location.pathname.toLowerCase();

        return navLinks.map((link, index) =>
        {
            const url = getUrl(link).toLowerCase().replace(/ /g, '-');
            const isActive = currentPath === url;

            return (
                <Link
                    key={ index }
                    ref={ refs[link] }
                    className={ `nav-link elt ${ isActive ? 'selected' : '' }` }
                    to={ url }
                >
                    { link }
                </Link>
            );
        });
    };

    const getUrl = (link) =>
    {
        const urlFriendly = link
            .toLowerCase() // Convertir en minuscules
            .normalize("NFD") // Normaliser les caractères diacritiques
            .replace(/[\u0300-\u036f]/g, "") // Supprimer les caractères diacritiques
            .replace(/\s+/g, '-'); // Remplacer les espaces par des tirets
        return '/' + urlFriendly;
    };

    const sendMail = (mail) =>
    {
        const data = new FormData();
        data.append('email', mail);
        data.append('file', true);
        fetch("https://maitai-becon.wuaze.com/php/SendMail.php", {
            method: 'POST',
            body: data
        }).then(response =>
            response.ok ? alert("La convention du club vous a été envoyée") : alert("Erreur lors de l'envoi du mail")
        );

        toggleForm();
    }

    const MailConv = () =>
    {
        const [mail, setMail] = useState("");
        const [isValid, setIsValid] = useState(true);

        const changement = (event) =>
        {
            regexMail(event);
            setMail(event.target.value);
            setIsValid(true);
        };

        const envoyer = async (event) =>
        {
            event.preventDefault();
            sendMail(mail);
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

        const inputClass = isValid ? "form-control saisie" : "form-control saisie invalid";

        return (
            <div>
                <form className="form" onSubmit={ envoyer }>
                    <h4 className="letitre">Convention du club</h4>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label label">Mail</label>
                        <input required type="email" value={ mail } className={ inputClass } aria-describedby="emailHelp" onChange={ changement } />
                    </div>
                    <button id="btnSubmit" type="submit" className="btn btn-primary bouton container-fluid">Suivant</button>
                </form>
            </div>
        );
    };

    return (
        <div>
            <div className="manav container-fluid">
                <div className="navbar">
                    <nav className="navbar navbar-expand-lg nav">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <Link className="navbar-brand logoMaitai" onClick={ toggleForm }></Link>
                            <Link className="navbar-brand btnAccueil" to="/"></Link>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                { getItem() }
                            </div>
                        </div>
                    </nav>
                </div>
                <div>
                    { getConnexion() }
                </div>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={ <Accueil /> } />
                    <Route path="/clients" element={ <Client /> } />
                    <Route path="/utilisateurs" element={ <Utilisateurs /> } />
                    <Route path="/produits" element={ <Produits /> } />
                    <Route path="/tickets" element={ <Tickets /> } />
                    <Route path="/fiches-de-securite" element={ <Secu /> } />
                    <Route path="/fiche-de-securite" element={ <FicheSecu /> } />
                    <Route path="/historique" element={ <Historique /> } />
                    <Route path="/planning" element={ <Planning /> } />
					<Route path="/resume" element={<Resume/>} />
                </Routes>
                <Modal className="popup d-flex justify-content-center align-items-center" show={ showModal } onHide={ toggleModal }>
                    <Modal.Body>
                        <Form />
                    </Modal.Body>
                </Modal>
                <Modal className="popup d-flex justify-content-center align-items-center" show={ showForm } onHide={ toggleForm }>
                    <Modal.Body>
                        <MailConv />
                    </Modal.Body>
                </Modal>

            </div>
        </div>
    );
}

export default Navbar;
