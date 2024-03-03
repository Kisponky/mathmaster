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
    admin_igen_nem TINYINT(4) NULL DEFAULT NULL,
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
