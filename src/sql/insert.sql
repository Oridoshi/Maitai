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


-- Inserer des droits
INSERT INTO Droit (libDroit)
VALUES ('Admin'),
       ('Maitai'),
       ('Client');

-- Inserer des utilisateurs
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
    ('Club de plongee A', 'clubA@example.com', '0123456789', 1),
    ('Club de plongee B', 'clubB@example.com', '9876543210', 1),
    ('Club de plongee C', 'clubC@example.com', '1234567890', 1),
    ('Club de plongee D', 'clubD@example.com', '0987654321', 0),
    ('Club de plongee E', 'clubE@example.com', '0123456789', 0),
    ('Club de plongee F', 'clubF@example.com', '9876543210', 0),
    ('Club de plongee G', 'clubG@example.com', '1234567890', 0),
    ('Club de plongee H', 'clubH@example.com', '0987654321', 0),
    ('Club de plongee I', 'clubI@example.com', '0123456789', 0),
    ('Club de plongee J', 'clubJ@example.com', '9876543210', 0),
    ('Club de plongee K', 'clubK@example.com', '1234567890', 1),
    ('Club de plongee L', 'clubL@example.com', '0987654321', 0),
    ('Club de plongee M', 'clubM@example.com', '0123456789', 0),
    ('Club de plongee N', 'clubN@example.com', '9876543210', 0),
    ('Club de plongee O', 'clubO@example.com', '1234567890', 0),
    ('Club de plongee P', 'clubP@example.com', '0987654321', 0),
    ('Club de plongee Q', 'clubQ@example.com', '0123456789', 0),
    ('Club de plongee R', 'clubR@example.com', '9876543210', 0),
    ('Club de plongee S', 'clubS@example.com', '1234567890', 0),
    ('Club de plongee T', 'clubT@example.com', '0987654321', 0),
    ('Club de plongee U', 'clubU@example.com', '0123456789', 0),
    ('Club de plongee V', 'clubV@example.com', '9876543210', 0),
    ('Club de plongee W', 'clubW@example.com', '1234567890', 0),
    ('Club de plongee X', 'clubX@example.com', '0987654321', 0),
    ('Club de plongee Y', 'clubY@example.com', '0123456789', 0),
    ('Club de plongee Z', 'clubZ@example.com', '9876543210', 0);


-- Inserer des Produits
INSERT INTO Produit (ref, libProd, prixUni, categorie)
VALUES
    (' 1', 'Masque de plongee'                           ,  39.99, 'Equipement' ),
    (' 2', 'Palmes de plongee'                           ,  49.99, 'Equipement' ),
    (' 3', 'Tuba de plongee'                             ,  29.99, 'Equipement' ),
    (' 4', 'Combinaison de plongee'                      , 149.99, 'Vetement'   ),
    (' 5', 'Gilet stabilisateur'                         , 199.99, 'Equipement' ),
    (' 6', 'Detendeur de plongee'                        , 299.99, 'Equipement' ),
    (' 7', 'Lampe de plongee'                            ,  79.99, 'Accessoire' ),
    (' 8', 'Couteau de plongee'                          ,  59.99, 'Accessoire' ),
    (' 9', 'Ordinateur de plongee'                       , 349.99, 'Accessoire' ),
    ('10', 'Livre sur la plongee'                        ,  19.99, 'Litterature'),
    ('11', 'Boitier etanche pour appareil photo'         ,  99.99, 'Accessoire' ),
    ('12', 'Sac de plongee'                              ,  69.99, 'Equipement' ),
    ('13', 'Boussole de plongee'                         ,  29.99, 'Accessoire' ),
    ('14', 'Housse de protection pour combinaison'       ,  39.99, 'Accessoire' ),
    ('15', 'Montre de plongee'                           , 149.99, 'Accessoire' ),
    ('16', 'Sonde de profondeur'                         ,  89.99, 'Accessoire' ),
    ('17', 'Rechauffeur pour combinaison de plongee'     , 119.99, 'Accessoire' ),
    ('18', 'Casque de plongee'                           ,  59.99, 'Equipement' ),
    ('19', 'Kit de nettoyage pour equipement de plongee' ,  29.99, 'Accessoire' ),
    ('20', 'Compresseur d''air portable'                 , 699.99, 'Equipement' ),
    ('21', 'Sac etanche'                                 ,  49.99, 'Accessoire' ),
    ('22', 'Kit de reparation pour equipement de plongee',  19.99, 'Accessoire' ),
    ('23', 'ecran solaire resistant a l''eau'            ,  19.99, 'Accessoire' ),
    ('24', 'Trousse de premiers secours pour plongee'    ,  49.99, 'Securite'   ),
    ('25', 'Sifflet de secours subaquatique'             ,   9.99, 'Securite'   ),
    ('26', 'Deflecteur de courant pour tuba'             ,  24.99, 'Accessoire' ),
    ('27', 'Boite de rangement etanche'                  ,  34.99, 'Accessoire' ),
    ('28', 'Gonfleur pour combinaison de plongee'        ,  49.99, 'Equipement' );


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



