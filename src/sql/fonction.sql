-- Supprimer commande après insert de ticket 

DROP TRIGGER IF EXISTS suppTicket; //

CREATE TRIGGER suppTicket AFTER INSERT ON Historique FOR EACH ROW
BEGIN
    IF NEW.type = 'TICKET' THEN
        DELETE FROM Ticket WHERE idCli = NEW.idCli;
    END IF;
END;//





-- Rendre actif un client si une commande est mise

DROP TRIGGER IF EXISTS activer; //

CREATE TRIGGER activer AFTER INSERT ON Ticket FOR EACH ROW
BEGIN
    UPDATE Client SET present = 1 WHERE idCli = NEW.idCli;
END;// -- Brut, mais + rapide que de verifier avant





-- Default de prix si nécessaire

DROP TRIGGER IF EXISTS defaultPrixTot; //

CREATE TRIGGER defaultPrixTot BEFORE INSERT ON Ticket FOR EACH ROW
BEGIN
    IF NEW.prixTot IS NULL THEN
        SET NEW.prixTot = (SELECT prixUni FROM Produit WHERE idProd = NEW.idProd) * NEW.qa;
    END IF;
END;//





-- Création d'un compte utilisateur pour un client dés sa création.

DROP TRIGGER IF EXISTS createAccountForClient; //

CREATE TRIGGER createAccountForClient AFTER INSERT ON Client FOR EACH ROW
BEGIN
    DECLARE userCount INT;
    SELECT COUNT(*) INTO userCount
    FROM Utilisateur 
    WHERE NEW.nomClub = login;
    
    IF userCount = 0 THEN        
        INSERT INTO Utilisateur (login, mdp, email, actif) VALUES (NEW.nomClub, '', NEW.email, true);
        INSERT INTO UtilisateurDroit (idUti, idDroit) VALUES (LAST_INSERT_ID(), 3);
    END IF;
END;// 

DELIMITER ;