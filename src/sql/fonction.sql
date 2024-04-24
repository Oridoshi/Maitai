-- Empêche la désactivation du dernier Admin

DELIMITER //

DROP FUNCTION IF EXISTS isLastActiveAdmin; //
CREATE FUNCTION isLastActiveAdmin(userId INT) RETURNS BOOLEAN
BEGIN
    DECLARE adminCount INT;
    SELECT COUNT(*) INTO adminCount
    FROM Utilisateur u
    JOIN UtilisateurDroit ud ON u.idUti = ud.idUti
    WHERE u.actif = TRUE AND ud.idDroit = 1 AND u.idUti != userId;
    RETURN adminCount = 0;
END; //


DROP TRIGGER IF EXISTS verifDesactivation_update;//
DROP TRIGGER IF EXISTS verifDesactivation_delete;//
DROP TRIGGER IF EXISTS verifRetrograde_update;//
DROP TRIGGER IF EXISTS verifRetrograde_delete;//


CREATE TRIGGER verifDesactivation_update BEFORE UPDATE ON Utilisateur FOR EACH ROW
BEGIN
    IF NEW.actif = 0 AND isLastActiveAdmin(OLD.idUti) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Impossible de désactiver le dernier compte admin actif !';
    END IF;
END //

CREATE TRIGGER verifDesactivation_delete BEFORE DELETE ON Utilisateur FOR EACH ROW
BEGIN
    IF isLastActiveAdmin(OLD.idUti) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Impossible de supprimer le dernier compte admin actif !';
    END IF;
END //

CREATE TRIGGER verifRetrograde_update BEFORE UPDATE ON UtilisateurDroit FOR EACH ROW
BEGIN
    IF isLastActiveAdmin(OLD.idUti) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Impossible de désactiver le dernier compte admin actif !';
    END IF;
END //

CREATE TRIGGER verifRetrograde_delete BEFORE DELETE ON UtilisateurDroit FOR EACH ROW
BEGIN
    IF isLastActiveAdmin(OLD.idUti) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Impossible de supprimer le dernier compte admin actif !';
    END IF;
END //




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