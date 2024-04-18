-- Empêche la désactivation du dernier Admin

DELIMITER //

DROP TRIGGER IF EXISTS verifDesactivation; //

CREATE TRIGGER verifDesactivation BEFORE UPDATE ON Utilisateur FOR EACH ROW
BEGIN
    DECLARE admin_count INT;
    SELECT COUNT(*) INTO admin_count
    FROM Utilisateur u
    JOIN UtilisateurDroit ud ON u.idUti = ud.idUti
    WHERE u.actif = true AND ud.idDroit = 1 AND OLD.idUti != u.idUti;
    
    IF admin_count = 0 THEN        
        SET @message = CONCAT('Impossible de désactiver le dernier compte actif (idUti: ', OLD.idUti, ') : ', admin_count, ' !');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message;
    END IF;
END;//





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
END;// -- Brut, mais + rapide que de verifier avant

DELIMITER ;




