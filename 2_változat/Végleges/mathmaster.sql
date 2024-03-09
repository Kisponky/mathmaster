USE mathmaster;

CREATE TABLE Felhasznalo (
    felhasznalo_id INT PRIMARY KEY AUTO_INCREMENT,
    teljes_nev VARCHAR(50) NULL DEFAULT NULL,
    felhasznalonev VARCHAR(50) UNIQUE NULL DEFAULT NULL,
    email VARCHAR(50) NULL DEFAULT NULL,
    jelszo BLOB NULL DEFAULT NULL,
    datum DATETIME NULL DEFAULT NULL,
    admin TINYINT(4) NULL DEFAULT NULL
);

-- Kapcsolat tábla
CREATE TABLE Kapcsolat (
    kapcsolat_id INT PRIMARY KEY AUTO_INCREMENT,
    felhasznalo_id INT,
    beerkezett_uzenet TEXT,
    letrehozas_datuma DATETIME,
    valasz_uzenet TEXT,
    archive_uzenetek TINYINT(4) NULL DEFAULT NULL,
    FOREIGN KEY (felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id)
);


-- Statisztika tábla
CREATE TABLE Statisztika (
    statisztika_id INT PRIMARY KEY AUTO_INCREMENT,
    felhasznalo_id INT,
    osszes_kitoltes INT,
    jo_kitoltes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    feladat_tipus VARCHAR(20),
    FOREIGN KEY (felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id)
);

-- Feladatlap tábla
CREATE TABLE Feladatlap (
    feladatlap_id INT PRIMARY KEY AUTO_INCREMENT,
    felhasznalo_id INT,
    osztaly INT,
    tipus VARCHAR(50),
    tartalom TEXT,
    valaszlehetosegek TEXT,
    FOREIGN KEY (felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id)
);


-- Vizsgalati naplo tábla
CREATE TABLE VizsgalatiNaplo (
    naplo_id INT PRIMARY KEY AUTO_INCREMENT,
    felhasznalo_id INT,
    tipus TEXT,
    megjegyzes TEXT,
    datum TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id)
);


-- jelszo titkosítás
DELIMITER //
CREATE TRIGGER jelszoTitkositas
BEFORE INSERT ON Felhasznalo
FOR EACH ROW
BEGIN
    IF NEW.jelszo IS NOT NULL THEN
        SET NEW.jelszo = SHA2(NEW.jelszo, 256);
    END IF;
END //
DELIMITER ;

-- Statisztika lekérdezése
DELIMITER //

CREATE PROCEDURE GetStatisztika(
    IN felhasznalo_id INT,
    IN feladat_tipus VARCHAR(255)
)
BEGIN
    SELECT 
        COALESCE(SUM(osszes_kitoltes), 0) AS osszes, 
        COALESCE(SUM(CASE WHEN jo_kitoltes = 1 THEN 1 ELSE 0 END), 0) AS jo,
        MONTH(month_dates.month) AS honap
    FROM 
        (SELECT DATE_FORMAT(NOW() - INTERVAL n MONTH, '%Y-%m-01') AS month
        FROM (
            SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
        ) AS numbers) AS month_dates
    LEFT JOIN
        statisztika ON MONTH(statisztika.created_at) = MONTH(month_dates.month)
                    AND statisztika.felhasznalo_id = felhasznalo_id
                    AND created_at >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01')
                    AND statisztika.feladat_tipus = feladat_tipus
    GROUP BY honap
    ORDER BY honap DESC;
END //

DELIMITER ;

--Feladatlap generálás
DELIMITER //

CREATE PROCEDURE GetRandomFeladatlap(IN p_osztaly INT, IN p_tipus VARCHAR(255))
BEGIN
    SELECT tartalom, valaszlehetosegek
    FROM feladatlap
    WHERE osztaly = p_osztaly AND tipus = p_tipus
    ORDER BY RAND()
    LIMIT 1;
END //

DELIMITER ;



-- Registráció
DELIMITER //

CREATE PROCEDURE register(
    IN p_teljes_nev VARCHAR(255),
    IN p_felhasznalonev VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_jelszo VARCHAR(255)
)
BEGIN
    INSERT INTO felhasznalo(teljes_nev, felhasznalonev, email, jelszo, datum)
    VALUES (p_teljes_nev, p_felhasznalonev, p_email, p_jelszo, NOW());
END //

DELIMITER ;


-- login
DELIMITER //

CREATE PROCEDURE getUserByEmailAndPassword(
    IN p_email VARCHAR(255),
    IN p_jelszo VARCHAR(255)
)
BEGIN
    SELECT felhasznalo_id, teljes_nev, email, admin
    FROM felhasznalo
    WHERE email = p_email AND jelszo = SHA2(p_jelszo, 256);
END //

DELIMITER ;

-- newAdmin
DELIMITER //

CREATE PROCEDURE SetAdminByEmail(
    IN p_email VARCHAR(255)
)
BEGIN
    UPDATE felhasznalo
    SET admin = TRUE
    WHERE email = p_email;
END //

DELIMITER ;

-- setNewUsername
DELIMITER //

CREATE PROCEDURE UpdateUsername(
    IN p_felhasznalonev VARCHAR(255),
    IN p_felhasznalo_id INT
)
BEGIN
    UPDATE Felhasznalo
    SET felhasznalonev = p_felhasznalonev
    WHERE felhasznalo_id = p_felhasznalo_id;
END //

DELIMITER ;

-- setNewEmail
DELIMITER //

CREATE PROCEDURE UpdateEmail(
    IN p_email VARCHAR(255),
    IN p_felhasznalo_id INT
)
BEGIN
    UPDATE Felhasznalo
    SET email = p_email
    WHERE felhasznalo_id = p_felhasznalo_id;
END //

DELIMITER ;

-- deleteUserProfile
DELIMITER //

CREATE PROCEDURE DeleteUserById(
    IN p_felhasznalo_id INT
)
BEGIN
    DELETE FROM Felhasznalo
    WHERE felhasznalo_id = p_felhasznalo_id;
END //

DELIMITER ;

-- setNewPassword
DELIMITER //

CREATE PROCEDURE UpdatePassword(
    IN p_new_password VARCHAR(255),
    IN p_felhasznalo_id INT,
    IN p_current_password VARCHAR(255)
)
BEGIN
    UPDATE felhasznalo
    SET jelszo = SHA2(p_new_password, 256)
    WHERE felhasznalo_id = p_felhasznalo_id AND jelszo = SHA2(p_current_password, 256);
END //

DELIMITER ;

-- getMessages
DELIMITER //

CREATE PROCEDURE GetMessages()
BEGIN
    SELECT k.kapcsolat_id, k.felhasznalo_id, f.teljes_nev AS felhasznalo_teljes_nev, k.beerkezett_uzenet, k.letrehozas_datuma
    FROM kapcsolat k
    INNER JOIN felhasznalo f ON k.felhasznalo_id = f.felhasznalo_id
    WHERE k.archive_uzenetek IS NULL;
END //

DELIMITER ;

-- saveMessage
DELIMITER //

CREATE PROCEDURE saveMessage(
    IN p_felhasznalo_id INT,
    IN p_beerkezett_uzenet VARCHAR(255)
)
BEGIN
    INSERT INTO kapcsolat (felhasznalo_id, beerkezett_uzenet, letrehozas_datuma)
    VALUES (p_felhasznalo_id, p_beerkezett_uzenet, NOW());
END //

DELIMITER ;

-- deleteMessage
DELIMITER //

CREATE PROCEDURE DeleteMessageById(
    IN p_kapcsolat_id INT
)
BEGIN
    DELETE FROM kapcsolat
    WHERE kapcsolat_id = p_kapcsolat_id;
END //

DELIMITER ;

-- updateMessage
DELIMITER //

CREATE PROCEDURE UpdateMessage(
    IN p_valasz_uzenet VARCHAR(255),
    IN p_kapcsolat_id INT
)
BEGIN
    UPDATE kapcsolat
    SET valasz_uzenet = p_valasz_uzenet,
        archive_uzenetek = TRUE
    WHERE kapcsolat_id = p_kapcsolat_id;
END //

DELIMITER ;

-- getMyArchiveMessages
DELIMITER //

CREATE PROCEDURE getMyArchivedMessages(
    IN p_felhasznalo_id INT
)
BEGIN
    SELECT k.kapcsolat_id, k.felhasznalo_id, f.teljes_nev AS felhasznalo_teljes_nev,
           k.beerkezett_uzenet, k.valasz_uzenet, k.letrehozas_datuma
    FROM kapcsolat k
    INNER JOIN felhasznalo f ON k.felhasznalo_id = f.felhasznalo_id
    WHERE k.archive_uzenetek IS NOT NULL AND k.felhasznalo_id = p_felhasznalo_id;
END //

DELIMITER ;

-- getUserData
DELIMITER //

CREATE PROCEDURE GetUserDataByConnectionId(
    IN p_kapcsolat_id INT
)
BEGIN
    SELECT felhasznalo.teljes_nev, felhasznalo.email
    FROM felhasznalo
    INNER JOIN kapcsolat ON felhasznalo.felhasznalo_id = kapcsolat.felhasznalo_id
    WHERE kapcsolat.kapcsolat_id = p_kapcsolat_id;
END //

DELIMITER ;

-- GetVizsgalatinaploAll
DELIMITER //

CREATE PROCEDURE GetVizsgalatinaploAll(IN p_order VARCHAR(255))
BEGIN
    SELECT naplo_id, felhasznalo.felhasznalonev, felhasznalo.email, tipus, megjegyzes, vizsgalatinaplo.datum
    FROM vizsgalatinaplo
    INNER JOIN felhasznalo ON vizsgalatinaplo.felhasznalo_id = felhasznalo.felhasznalo_id
    WHERE 1
    ORDER BY vizsgalatinaplo.datum, p_order;
END //

DELIMITER ;

-- GetVizsgalatinaploByType
DELIMITER //

CREATE PROCEDURE GetVizsgalatinaploByType(IN p_type VARCHAR(255), IN p_order VARCHAR(255))
BEGIN
    SELECT naplo_id, felhasznalo.felhasznalonev, felhasznalo.email, tipus, megjegyzes, vizsgalatinaplo.datum
    FROM vizsgalatinaplo
    INNER JOIN felhasznalo ON vizsgalatinaplo.felhasznalo_id = felhasznalo.felhasznalo_id
    WHERE tipus = p_type
    ORDER BY vizsgalatinaplo.datum, p_order;
END //

DELIMITER ;

-- GetVizsgalatTypes
DELIMITER //

CREATE PROCEDURE GetVizsgalatTypes()
BEGIN
    SELECT `tipus`
    FROM `vizsgalatinaplo`
    GROUP BY `tipus`
    ORDER BY `tipus` ASC;
END //

DELIMITER ;

-- InsertVizsgalatinaplo
DELIMITER //

CREATE PROCEDURE InsertVizsgalatinaplo(
    IN p_felhasznalo_id INT,
    IN p_tipus VARCHAR(255),
    IN p_megjegyzes VARCHAR(255)
)
BEGIN
    INSERT INTO `vizsgalatinaplo`(`felhasznalo_id`, `tipus`, `megjegyzes`, `datum`)
    VALUES (p_felhasznalo_id, p_tipus, p_megjegyzes, NOW());
END //

DELIMITER ;

-- saveTestResult

DELIMITER //

CREATE PROCEDURE saveResult(
    IN p_felhasznalo_id INT,
    IN p_jo_kitoltes INT,
    IN p_feladat_tipus VARCHAR(255)
)
BEGIN
    INSERT INTO `statisztika`(`felhasznalo_id`, `osszes_kitoltes`, `jo_kitoltes`, `feladat_tipus`, `created_at`)
    VALUES (p_felhasznalo_id, 1, p_jo_kitoltes, p_feladat_tipus, NOW());
END //

DELIMITER ;

-- addNewTask

DELIMITER //

CREATE PROCEDURE addNewTask(
    IN p_felhasznalo_id INT,
    IN p_osztaly VARCHAR(255),
    IN p_tartalom VARCHAR(255),
    IN p_valaszlehetosegek VARCHAR(255)
)
BEGIN
    INSERT INTO `feladatlap`(`felhasznalo_id`, `osztaly`, `tipus`, `tartalom`, `valaszlehetosegek`)
    VALUES (p_felhasznalo_id, p_osztaly, 'kviz', p_tartalom, p_valaszlehetosegek);
END //

DELIMITER ;
