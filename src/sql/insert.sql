/*********************************************************************************/
/*                              DROIT ET UTILISATEUR                             */
/*********************************************************************************/

DELETE FROM UtilisateurDroit;
DELETE FROM Utilisateur;
DELETE FROM Droit;

ALTER TABLE UtilisateurDroit AUTO_INCREMENT = 1;
ALTER TABLE Utilisateur      AUTO_INCREMENT = 1;
ALTER TABLE Droit            AUTO_INCREMENT = 1;

ALTER TABLE UtilisateurDroit AUTO_INCREMENT = 1;
ALTER TABLE Utilisateur      AUTO_INCREMENT = 1;
ALTER TABLE Droit            AUTO_INCREMENT = 1;


-- Insérer des droits
INSERT INTO Droit (libDroit)
VALUES ('Admin'),
       ('Maitai'),
       ('Client');

-- Insérer des utilisateurs
INSERT INTO Utilisateur (login, mdp, email, actif)
VALUES ('admin1', 'mdp1', 'admin1@example.com', true),
       ('admin2', 'mdp2', 'admin2@example.com', true),
       ('user3', 'mdp3', 'user3@example.com', true),
       ('user4', 'mdp4', 'user4@example.com', true),
       ('user5', 'mdp5', 'user5@example.com', true),
       ('user6', 'mdp6', 'user6@example.com', true),
       ('user7', 'mdp7', 'user7@example.com', true),
       ('user8', 'mdp8', 'user8@example.com', true),
       ('user9', 'mdp9', 'user9@example.com', true),
       ('user10', 'mdp10', 'user10@example.com', true);

-- Associer des droits aux utilisateurs
INSERT INTO UtilisateurDroit (idUti, idDroit)
VALUES ( 1, 1), -- admin1 a le droit d'administrateur
       ( 2, 1), -- admin2 a le droit d'administrateur
       ( 3, 2),
       ( 4, 2),
       ( 5, 2),
       ( 6, 2),
       ( 7, 2),
       ( 8, 2),
       ( 9, 2),
       (10, 2);






/*********************************************************************************/
/*                        UTILISATEUR PRODUIT ET TICKETS                         */
/*********************************************************************************/

DELETE FROM Ticket;
DELETE FROM Client;
DELETE FROM Produit;

ALTER TABLE Ticket  AUTO_INCREMENT = 1;
ALTER TABLE Client  AUTO_INCREMENT = 1;
ALTER TABLE Produit AUTO_INCREMENT = 1;

ALTER TABLE Historique AUTO_INCREMENT = 1;

ALTER TABLE Ticket  AUTO_INCREMENT = 1;
ALTER TABLE Client  AUTO_INCREMENT = 1;
ALTER TABLE Produit AUTO_INCREMENT = 1;

ALTER TABLE Historique AUTO_INCREMENT = 1;


-- Inserer des Clients
INSERT INTO Client (nomClub, email, telephone, present)
VALUES
    ('Club de plongée A', 'clubA@example.com', '0123456789', 1),
    ('Club de plongée B', 'clubB@example.com', '9876543210', 1),
    ('Club de plongée C', 'clubC@example.com', '1234567890', 1),
    ('Club de plongée D', 'clubD@example.com', '0987654321', 0),
    ('Club de plongée E', 'clubE@example.com', '0123456789', 0),
    ('Club de plongée F', 'clubF@example.com', '9876543210', 0),
    ('Club de plongée G', 'clubG@example.com', '1234567890', 0),
    ('Club de plongée H', 'clubH@example.com', '0987654321', 0),
    ('Club de plongée I', 'clubI@example.com', '0123456789', 0),
    ('Club de plongée J', 'clubJ@example.com', '9876543210', 0),
    ('Club de plongée K', 'clubK@example.com', '1234567890', 1),
    ('Club de plongée L', 'clubL@example.com', '0987654321', 0),
    ('Club de plongée M', 'clubM@example.com', '0123456789', 0),
    ('Club de plongée N', 'clubN@example.com', '9876543210', 0),
    ('Club de plongée O', 'clubO@example.com', '1234567890', 0),
    ('Club de plongée P', 'clubP@example.com', '0987654321', 0),
    ('Club de plongée Q', 'clubQ@example.com', '0123456789', 0),
    ('Club de plongée R', 'clubR@example.com', '9876543210', 0),
    ('Club de plongée S', 'clubS@example.com', '1234567890', 0),
    ('Club de plongée T', 'clubT@example.com', '0987654321', 0),
    ('Club de plongée U', 'clubU@example.com', '0123456789', 0),
    ('Club de plongée V', 'clubV@example.com', '9876543210', 0),
    ('Club de plongée W', 'clubW@example.com', '1234567890', 0),
    ('Club de plongée X', 'clubX@example.com', '0987654321', 0),
    ('Club de plongée Y', 'clubY@example.com', '0123456789', 0),
    ('Club de plongée Z', 'clubZ@example.com', '9876543210', 0);


-- Inserer des Produits
INSERT INTO Produit (ref, libProd, prixUni, categorie)
VALUES
    (' 1', 'Masque de plongée'                           ,  39.99, 'Equipement' ),
    (' 2', 'Palmes de plongée'                           ,  49.99, 'Equipement' ),
    (' 3', 'Tuba de plongée'                             ,  29.99, 'Equipement' ),
    (' 4', 'Combinaison de plongée'                      , 149.99, 'Vêtement'   ),
    (' 5', 'Gilet stabilisateur'                         , 199.99, 'Equipement' ),
    (' 6', 'Détendeur de plongée'                        , 299.99, 'Equipement' ),
    (' 7', 'Lampe de plongée'                            ,  79.99, 'Accessoire' ),
    (' 8', 'Couteau de plongée'                          ,  59.99, 'Accessoire' ),
    (' 9', 'Ordinateur de plongée'                       , 349.99, 'Accessoire' ),
    ('10', 'Livre sur la plongée'                        ,  19.99, 'Littérature'),
    ('11', 'Boîtier étanche pour appareil photo'         ,  99.99, 'Accessoire' ),
    ('12', 'Sac de plongée'                              ,  69.99, 'Equipement' ),
    ('13', 'Boussole de plongée'                         ,  29.99, 'Accessoire' ),
    ('14', 'Housse de protection pour combinaison'       ,  39.99, 'Accessoire' ),
    ('15', 'Montre de plongée'                           , 149.99, 'Accessoire' ),
    ('16', 'Sonde de profondeur'                         ,  89.99, 'Accessoire' ),
    ('17', 'Réchauffeur pour combinaison de plongée'     , 119.99, 'Accessoire' ),
    ('18', 'Casque de plongée'                           ,  59.99, 'Equipement' ),
    ('19', 'Kit de nettoyage pour équipement de plongée' ,  29.99, 'Accessoire' ),
    ('20', 'Compresseur d''air portable'                 , 699.99, 'Equipement' ),
    ('21', 'Sac étanche'                                 ,  49.99, 'Accessoire' ),
    ('22', 'Kit de réparation pour équipement de plongée',  19.99, 'Accessoire' ),
    ('23', 'Écran solaire résistant à l''eau'            ,  19.99, 'Accessoire' ),
    ('24', 'Trousse de premiers secours pour plongée'    ,  49.99, 'Sécurité'   ),
    ('25', 'Sifflet de secours subaquatique'             ,   9.99, 'Sécurité'   ),
    ('26', 'Déflecteur de courant pour tuba'             ,  24.99, 'Accessoire' ),
    ('27', 'Boîte de rangement étanche'                  ,  34.99, 'Accessoire' ),
    ('28', 'Gonfleur pour combinaison de plongée'        ,  49.99, 'Equipement' );


-- Inserer des Ticket
INSERT INTO Ticket (idProd, idCli, qa)
VALUES
    ( 1,  1,   5),
    ( 2,  1,   5),
    ( 3,  1,   5),
    ( 4,  1,   5), -- Commande Client 1
    ( 4,  2,   1),
    ( 7,  2,   1),
    (21,  2,   1),
    (15,  2,   1), -- Commande Client 2
    ( 9,  3,  10),
    (13,  3,   7),
    (20,  3,   1), -- Commande client 3
    (10, 11, 120); -- Commande client 11



