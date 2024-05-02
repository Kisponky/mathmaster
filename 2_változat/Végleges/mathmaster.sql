-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 05. 17:17
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mathmaster`
--

DELIMITER $$
--
-- Eljárások
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addNewTask` (IN `p_felhasznalo_id` INT, IN `p_osztaly` VARCHAR(255), IN `p_tartalom` VARCHAR(255), IN `p_valaszlehetosegek` VARCHAR(255))   BEGIN
    INSERT INTO `feladatlap`(`felhasznalo_id`, `osztaly`, `tipus`, `tartalom`, `valaszlehetosegek`)
    VALUES (p_felhasznalo_id, p_osztaly, 'kviz', p_tartalom, p_valaszlehetosegek);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteMessageById` (IN `p_kapcsolat_id` INT)   BEGIN
    DELETE FROM kapcsolat
    WHERE kapcsolat_id = p_kapcsolat_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteUserById` (IN `p_felhasznalo_id` INT)   BEGIN
    DELETE FROM Felhasznalo
    WHERE felhasznalo_id = p_felhasznalo_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetMessages` ()   BEGIN
    SELECT k.kapcsolat_id, k.felhasznalo_id, f.teljes_nev AS felhasznalo_teljes_nev, k.beerkezett_uzenet, k.letrehozas_datuma
    FROM kapcsolat k
    INNER JOIN felhasznalo f ON k.felhasznalo_id = f.felhasznalo_id
    WHERE k.archive_uzenetek IS NULL;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getMyArchivedMessages` (IN `p_felhasznalo_id` INT)   BEGIN
    SELECT k.kapcsolat_id, k.felhasznalo_id, f.teljes_nev AS felhasznalo_teljes_nev,
           k.beerkezett_uzenet, k.valasz_uzenet, k.letrehozas_datuma
    FROM kapcsolat k
    INNER JOIN felhasznalo f ON k.felhasznalo_id = f.felhasznalo_id
    WHERE k.archive_uzenetek IS NOT NULL AND k.felhasznalo_id = p_felhasznalo_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRandomFeladatlap` (IN `p_osztaly` INT, IN `p_tipus` VARCHAR(255))   BEGIN
    SELECT tartalom, valaszlehetosegek
    FROM feladatlap
    WHERE osztaly = p_osztaly AND tipus = p_tipus
    ORDER BY RAND()
    LIMIT 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStatisztika` (IN `felhasznalo_id` INT, IN `feladat_tipus` VARCHAR(255))   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserByEmailAndPassword` (IN `p_email` VARCHAR(255), IN `p_jelszo` VARCHAR(255))   BEGIN
    SELECT felhasznalo_id, teljes_nev, email, admin
    FROM felhasznalo
    WHERE email = p_email AND jelszo = SHA2(p_jelszo, 256);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserDataByConnectionId` (IN `p_kapcsolat_id` INT)   BEGIN
    SELECT felhasznalo.teljes_nev, felhasznalo.email
    FROM felhasznalo
    INNER JOIN kapcsolat ON felhasznalo.felhasznalo_id = kapcsolat.felhasznalo_id
    WHERE kapcsolat.kapcsolat_id = p_kapcsolat_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetVizsgalatinaploAll` (IN `p_order` VARCHAR(255))   BEGIN
    SELECT naplo_id, felhasznalo.felhasznalonev, felhasznalo.email, tipus, megjegyzes, vizsgalatinaplo.datum
    FROM vizsgalatinaplo
    INNER JOIN felhasznalo ON vizsgalatinaplo.felhasznalo_id = felhasznalo.felhasznalo_id
    WHERE 1
    ORDER BY vizsgalatinaplo.datum, p_order;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetVizsgalatinaploByType` (IN `p_type` VARCHAR(255), IN `p_order` VARCHAR(255))   BEGIN
    SELECT naplo_id, felhasznalo.felhasznalonev, felhasznalo.email, tipus, megjegyzes, vizsgalatinaplo.datum
    FROM vizsgalatinaplo
    INNER JOIN felhasznalo ON vizsgalatinaplo.felhasznalo_id = felhasznalo.felhasznalo_id
    WHERE tipus = p_type
    ORDER BY vizsgalatinaplo.datum, p_order;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetVizsgalatTypes` ()   BEGIN
    SELECT `tipus`
    FROM `vizsgalatinaplo`
    GROUP BY `tipus`
    ORDER BY `tipus` ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertVizsgalatinaplo` (IN `p_felhasznalo_id` INT, IN `p_tipus` VARCHAR(255), IN `p_megjegyzes` VARCHAR(255))   BEGIN
    INSERT INTO `vizsgalatinaplo`(`felhasznalo_id`, `tipus`, `megjegyzes`, `datum`)
    VALUES (p_felhasznalo_id, p_tipus, p_megjegyzes, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (IN `p_teljes_nev` VARCHAR(255), IN `p_felhasznalonev` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_jelszo` VARCHAR(255))   BEGIN
    INSERT INTO felhasznalo(teljes_nev, felhasznalonev, email, jelszo, datum)
    VALUES (p_teljes_nev, p_felhasznalonev, p_email, p_jelszo, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `saveMessage` (IN `p_felhasznalo_id` INT, IN `p_beerkezett_uzenet` VARCHAR(255))   BEGIN
    INSERT INTO kapcsolat (felhasznalo_id, beerkezett_uzenet, letrehozas_datuma)
    VALUES (p_felhasznalo_id, p_beerkezett_uzenet, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `saveResult` (IN `p_felhasznalo_id` INT, IN `p_jo_kitoltes` INT, IN `p_feladat_tipus` VARCHAR(255))   BEGIN
    INSERT INTO `statisztika`(`felhasznalo_id`, `osszes_kitoltes`, `jo_kitoltes`, `feladat_tipus`, `created_at`)
    VALUES (p_felhasznalo_id, 1, p_jo_kitoltes, p_feladat_tipus, NOW());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SetAdminByEmail` (IN `p_email` VARCHAR(255))   BEGIN
    UPDATE felhasznalo
    SET admin = TRUE
    WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateEmail` (IN `p_email` VARCHAR(255), IN `p_felhasznalo_id` INT)   BEGIN
    UPDATE Felhasznalo
    SET email = p_email
    WHERE felhasznalo_id = p_felhasznalo_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateMessage` (IN `p_valasz_uzenet` VARCHAR(255), IN `p_kapcsolat_id` INT)   BEGIN
    UPDATE kapcsolat
    SET valasz_uzenet = p_valasz_uzenet,
        archive_uzenetek = TRUE
    WHERE kapcsolat_id = p_kapcsolat_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdatePassword` (IN `p_new_password` VARCHAR(255), IN `p_felhasznalo_id` INT, IN `p_current_password` VARCHAR(255))   BEGIN
    UPDATE felhasznalo
    SET jelszo = SHA2(p_new_password, 256)
    WHERE felhasznalo_id = p_felhasznalo_id AND jelszo = SHA2(p_current_password, 256);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateUsername` (IN `p_felhasznalonev` VARCHAR(255), IN `p_felhasznalo_id` INT)   BEGIN
    UPDATE Felhasznalo
    SET felhasznalonev = p_felhasznalonev
    WHERE felhasznalo_id = p_felhasznalo_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `feladatlap`
--

CREATE TABLE `feladatlap` (
  `feladatlap_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `osztaly` int(11) DEFAULT NULL,
  `tipus` varchar(50) DEFAULT NULL,
  `tartalom` text DEFAULT NULL,
  `valaszlehetosegek` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `feladatlap`
--

INSERT INTO `feladatlap` (`feladatlap_id`, `felhasznalo_id`, `osztaly`, `tipus`, `tartalom`, `valaszlehetosegek`) VALUES
(1, 3, 1, 'kviz', 'Hány elemű a sorozat: 1, 5, 9, 13?', '1;2;3;4;1'),
(2, 3, 1, 'kviz', 'Mi a sorozat következő eleme: 6, 8, 10, 12, ___?', '20;17;15;14;4'),
(3, 3, 1, 'kviz', 'Mennyivel növekszik a sorozat: 2, 5, 8, 11?', '1;2;3;4;3'),
(15, 3, 1, 'matematika', '14+3=17', NULL),
(16, 3, 1, 'matematika', '16+1=17', NULL),
(17, 3, 1, 'matematika', '17+2=19', NULL),
(18, 3, 1, 'matematika', '13-5=8', NULL),
(19, 3, 1, 'matematika', '12-8=4', NULL),
(20, 5, 2, 'matematika', '35+61=96', NULL),
(21, 3, 2, 'matematika', '52+7=59', NULL),
(22, 3, 2, 'matematika', '21+32=55', NULL),
(23, 3, 2, 'matematika', '80-62=18', NULL),
(24, 3, 2, 'matematika', '39-11=28', NULL),
(25, 3, 2, 'matematika', '98-40=58', NULL),
(26, 3, 2, 'matematika', '7*9=63', NULL),
(27, 3, 2, 'matematika', '3*2=6', NULL),
(28, 3, 2, 'matematika', '24/6=4', NULL),
(29, 3, 2, 'matematika', '70/10=7', NULL),
(30, 3, 2, 'matematika', '42/6=7', NULL),
(31, 3, 2, 'matematika', '70/7=10', NULL),
(32, 5, 3, 'matematika', '402+437=839', NULL),
(33, 5, 3, 'matematika', '343+549=892', NULL),
(34, 5, 3, 'matematika', '689+44=733', NULL),
(35, 5, 3, 'matematika', '813-363=450', NULL),
(36, 5, 3, 'matematika', '770-316=454', NULL),
(37, 5, 3, 'matematika', '978-791=187', NULL),
(38, 5, 3, 'matematika', '12*8=96', NULL),
(39, 5, 3, 'matematika', '43*3=129', NULL),
(40, 5, 3, 'matematika', '42/6=7', NULL),
(41, 5, 3, 'matematika', '70/7=10', NULL),
(42, 5, 4, 'matematika', '404+444=848', NULL),
(43, 5, 4, 'matematika', '383+529=912', NULL),
(44, 5, 4, 'matematika', '1289+44=1333', NULL),
(45, 5, 4, 'matematika', '816-361=455', NULL),
(46, 5, 4, 'matematika', '840-326=514', NULL),
(47, 5, 4, 'matematika', '1878-1491=387', NULL),
(48, 5, 4, 'matematika', '14*16=224', NULL),
(49, 5, 4, 'matematika', '41*12=492', NULL),
(50, 5, 4, 'matematika', '44/3=14', NULL),
(51, 5, 4, 'matematika', '143/4=35', NULL),
(52, 3, 1, 'matematika', '7+3=10', NULL),
(53, 3, 1, 'matematika', '8+1=9', NULL),
(54, 3, 1, 'matematika', '8+2=10', NULL),
(55, 3, 1, 'matematika', '6-5=1', NULL),
(56, 3, 1, 'matematika', '6-4=2', NULL),
(57, 5, 2, 'matematika', '17+61=78', NULL),
(58, 3, 2, 'matematika', '26+7=33', NULL),
(59, 3, 2, 'matematika', '10+32=42', NULL),
(60, 3, 2, 'matematika', '40-31=9', NULL),
(61, 3, 2, 'matematika', '20-11=9', NULL),
(62, 3, 2, 'matematika', '49-40=9', NULL),
(63, 3, 2, 'matematika', '3*9=27', NULL),
(64, 3, 2, 'matematika', '1*2=2', NULL),
(65, 3, 2, 'matematika', '8/4=2', NULL),
(66, 3, 2, 'matematika', '35/7=5', NULL),
(67, 3, 2, 'matematika', '21/3=7', NULL),
(68, 3, 2, 'matematika', '35/5=7', NULL),
(69, 5, 3, 'matematika', '201+437=638', NULL),
(70, 5, 3, 'matematika', '171+549=720', NULL),
(71, 5, 3, 'matematika', '344+44=388', NULL),
(72, 5, 3, 'matematika', '406-363=43', NULL),
(73, 5, 3, 'matematika', '385-316=69', NULL),
(74, 5, 3, 'matematika', '489-395=94', NULL),
(75, 5, 3, 'matematika', '24*8=192', NULL),
(76, 5, 3, 'matematika', '21*3=63', NULL),
(77, 5, 3, 'matematika', '21/3=7', NULL),
(78, 5, 3, 'matematika', '35/7=5', NULL),
(79, 5, 4, 'matematika', '202+444=646', NULL),
(80, 5, 4, 'matematika', '191+529=720', NULL),
(81, 5, 4, 'matematika', '644+44=688', NULL),
(82, 5, 4, 'matematika', '408-361=47', NULL),
(83, 5, 4, 'matematika', '420-326=94', NULL),
(84, 5, 4, 'matematika', '939-745=194', NULL),
(85, 5, 4, 'matematika', '28*16=448', NULL),
(86, 5, 4, 'matematika', '82*12=984', NULL),
(87, 5, 4, 'matematika', '88/3=29', NULL),
(88, 5, 4, 'matematika', '221/4=55', NULL),
(89, 3, 1, 'kviz', 'A kisegér 3 sajtot evett meg, majd még 2-t. Hány sajtot evett összesen?', '4;5;7;6;2'),
(90, 3, 1, 'kviz', 'Melyik szám jön a sorban? 1, 2, 3, ___, 5', '6;8;4;7;3'),
(91, 3, 1, 'kviz', 'Melyik szám hiányzik? 10, 12, 14, ___, 18', '17;16;15;19;2'),
(92, 3, 1, 'kviz', 'Mennyi a két szám összege: 4+3=?', '9;6;7;8;3'),
(93, 3, 1, 'kviz', 'Melyik szám jön a sorban? 0, 3, ___, 9', '7;6;8;9;2'),
(94, 3, 1, 'kviz', 'Mennyi a három szám összege? 2+3+4=?', '6;8;9;10;3'),
(95, 3, 1, 'kviz', 'Mennyi a három szám különbsége? 20-4-3=?', '15;13;10;11;2'),
(96, 3, 1, 'kviz', 'Mennyi a négy szám összege? 1+3+2+5=', '10;9;11;12;3'),
(97, 3, 1, 'kviz', 'Melyik szám következik? 1, 4, 7, 10, ___', '11;13;15;14;2'),
(98, 3, 1, 'kviz', 'Mennyi a három szám összege? 5+6+7=?', '19;17;16;18;4'),
(99, 3, 2, 'kviz', 'Ha egy dobozban 8 alma van, és kiveszel belőle 3-at, hány alma marad a dobozban?', '3;8;5;6;3'),
(100, 3, 2, 'kviz', 'Ha egy körben 12 almát osztunk meg 3 egyenlő részre, hány alma lesz egy részben?', '4;3;6;2;1'),
(101, 3, 2, 'kviz', 'Ha egy tucat kerek alma van, és elveszel belőle 4-et, hány alma marad?', '12;10;6;8;4'),
(102, 3, 2, 'kviz', 'Ha 4 dobozban van 5 alma, hány alma van összesen?', '15;20;9;8;2'),
(103, 3, 2, 'kviz', 'Ha egy nap 24 óra, és eddig már eltelt 15 óra, hány óra van még hátra a napból?', '9;8;7;10;1'),
(104, 3, 2, 'kviz', 'Ha 6 almát adsz hozzá 8 almához, hány almát kapsz összesen?', '14;16;10;12;1'),
(105, 3, 2, 'kviz', 'Hány oldala van a háromszögnek?', '4;2;3;6;3'),
(106, 3, 2, 'kviz', 'Melyik szám hiányzik? 5, 10, 15, ___, 25', '18;22;20;24;3'),
(107, 3, 2, 'kviz', 'Melyik szám következik? 3, 12, 21, 30, ___', '33;39;31;38;2'),
(108, 3, 2, 'kviz', 'Mennyi a három szám összege? 10+6+21=?', '38;34;32;37;4'),
(109, 3, 3, 'kviz', 'Évi ruhájára másfél méter anyagból 127 cm fogyott el. Mennyi maradt a babaruhához?', '54cm;45cm;30cm;23cm;4'),
(110, 3, 3, 'kviz', 'Hogyan írjuk le a 65-öt római számmal?', 'LVI;LXV;XXXXXXV;XXIII;2'),
(111, 3, 3, 'kviz', 'Hogyan írjuk le a 98-at római számokkal?', 'XXXLXXVII;XVII;LXXVIV;LXXXXVIII;4'),
(112, 3, 3, 'kviz', 'Mit jelent a következő római szám? XXXIII', '35;30;32;33;4'),
(113, 3, 3, 'kviz', 'Reggel a hőmérő higanyszála - 6 °C-ot mutatott. A hőmérséklet délben 15 °C-ot emelkedett. Hány °C volt délben?', '0 °C;15 °C;9 °C;10 °C;3'),
(114, 3, 3, 'kviz', 'A déli hőmérséklet + 22 °C volt. Estére lehűlt a levegő, így - 2 °C-ra süllyedt a hőmérséklet. Mennyi volt a déli és az esti hőmérséklet közti különbség?', '24 °C;22 °C;20 °C;2 °C;1'),
(115, 3, 3, 'kviz', 'Hány oldala van egy kockának?', '3;4;6;8;3'),
(116, 3, 3, 'kviz', 'Mi a neve annak a szögnek, amely kisebb, mint 90 fok?', 'Derékszög;Hegyesszög;Térszög;Középponti szög;2'),
(117, 3, 3, 'kviz', 'Hány szimmetriatengelye van egy négyzetnek?', '0;1;3;2;4'),
(118, 3, 3, 'kviz', 'Mennyi a négyzet kerülete, ha minden oldala 5 egység hosszú?', '10 egység;15 egység;25 egység;20 egység;4'),
(119, 3, 4, 'kviz', 'Ha egy hatoldalú dobókockával dobunk, mi a valószínűsége annak, hogy egy páros számot dobjunk?', '2/3;1/2;1/3;1/6;4'),
(120, 3, 4, 'kviz', 'Hányféle módon lehet kihúzni egy piros golyót egy dobozból, ha a dobozban összesen 5 piros, 3 kék és 2 zöld golyó van?', '6;8;4;5;4'),
(121, 3, 4, 'kviz', 'Mennyi a -6 és -2 közötti távolság?', '4;8;-4;-8;1'),
(122, 3, 4, 'kviz', 'Melyik számot lehet előállítani két prímtényező szorzataként?', '16;21;24;32;2'),
(123, 3, 4, 'kviz', 'Melyik fogalmat használjuk arra, amikor két alakzat azonos szögű és arányos oldalú?', 'paralel;szimmetrikus;hasonló;egybevágó;3'),
(124, 3, 4, 'kviz', 'A déli hőmérséklet + 22 °C volt. Estére lehűlt a levegő, így - 2 °C-ra süllyedt a hőmérséklet. Mennyi volt a déli és az esti hőmérséklet közti különbség?', '24 °C;22 °C;20 °C;2 °C;1'),
(125, 3, 4, 'kviz', 'Melyik tört a legnagyobb az alábbiak közül: 4, 3/2, 5/3?', '4;3/2;5/3;Egyenlőek;1'),
(126, 3, 4, 'kviz', 'Mi az átlag fogalma a matematikában?', 'A legkisebb szám a sorozatban;Az összes szám összege osztva a számok darabszámával;A leggyakrabban előforduló szám a sorozatban;A legnagyobb szám a sorozatban;2'),
(127, 3, 4, 'kviz', 'Hogyan számítjuk ki az átlagot egy számsorozatban?', 'Osztjuk az összes számot a számsorozat hosszával;Összeadjuk az összes számot;Megszorozzuk az összes számot a legnagyobb számmal;Kivonjuk az összes számot a legkisebb számtól;1'),
(128, 3, 4, 'kviz', 'Mi a hasonlóság fogalma a geometriában?', 'Két alakzat azonos területe;Két alakzat azonos kerülete;Két alakzat azonos alakja, de eltérő mérete; Két alakzat azonossága;4');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `felhasznalo_id` int(11) NOT NULL,
  `teljes_nev` varchar(50) DEFAULT NULL,
  `felhasznalonev` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL CHECK (`email` like '%_@__%.__%'),
  `jelszo` blob DEFAULT NULL,
  `datum` datetime DEFAULT NULL,
  `admin` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`felhasznalo_id`, `teljes_nev`, `felhasznalonev`, `email`, `jelszo`, `datum`, `admin`) VALUES
(2, 'Teszt Elek', 'tesztelek', 'tesztelek@example.com', 0x38343730353439306630623338663463663530356339333133656631666662393437386365653733333838623261326431653164316332396130653364393335, '2024-04-02 11:07:12', NULL),
(3, 'Nádas Tamás', 'Tamás', 'tamasnadas04@gmail.com', 0x35346435636232643333326462646234383530323933636161653435353963653838623635313633663165613564346534623361633439643737326465643134, '2024-04-02 11:09:18', 1),
(4, 'Arnold Elek', 'Arnold15', 'arnold15@example.com', 0x35346435636232643333326462646234383530323933636161653435353963653838623635313633663165613564346534623361633439643737326465643134, '2024-04-05 11:24:41', NULL),
(5, 'Admin felhasználó', 'admin', 'admin@example.com', 0x65663932623737386261666537373165383932343562383965636263303861343461346531363663303636353939313138383166333833643434373365393466, '2024-04-05 11:26:29', 1),
(6, 'Nagy Úr', 'Feco', 'nagyur@gmail.com', 0x61623032633536356638613736363730376438623262646333323965623964636635613136346265346161653162653330386264353033666263353161363330, '2024-04-05 11:27:37', NULL);

--
-- Eseményindítók `felhasznalo`
--
DELIMITER $$
CREATE TRIGGER `jelszoTitkositas` BEFORE INSERT ON `felhasznalo` FOR EACH ROW BEGIN
    IF NEW.jelszo IS NOT NULL THEN
        SET NEW.jelszo = SHA2(NEW.jelszo, 256);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kapcsolat`
--

CREATE TABLE `kapcsolat` (
  `kapcsolat_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `beerkezett_uzenet` text DEFAULT NULL,
  `letrehozas_datuma` datetime DEFAULT NULL,
  `valasz_uzenet` text DEFAULT NULL,
  `archive_uzenetek` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kapcsolat`
--

INSERT INTO `kapcsolat` (`kapcsolat_id`, `felhasznalo_id`, `beerkezett_uzenet`, `letrehozas_datuma`, `valasz_uzenet`, `archive_uzenetek`) VALUES
(1, 2, 'Ez egy teszt üzenet az üzenet küldés modalban!', '2024-04-02 11:26:45', 'Ez egy válasz üzenet az adminisztrátoroktól!', 1),
(3, 2, 'Ez egy teszt üzenet az üzenet küldés modalban!', '2024-04-02 11:27:19', NULL, NULL),
(4, 6, 'Profi csapat munka!', '2024-04-05 11:29:56', NULL, NULL),
(5, 6, 'Nagyon jó lett a bagoly, mint logó. Nagynon jól illik az oldalhoz.', '2024-04-05 11:30:40', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `statisztika`
--

CREATE TABLE `statisztika` (
  `statisztika_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `osszes_kitoltes` int(11) DEFAULT NULL,
  `jo_kitoltes` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `feladat_tipus` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `statisztika`
--

INSERT INTO `statisztika` (`statisztika_id`, `felhasznalo_id`, `osszes_kitoltes`, `jo_kitoltes`, `created_at`, `feladat_tipus`) VALUES
(1, 2, 1, 0, '2024-04-02 09:44:33', 'összeadás'),
(2, 2, 1, 0, '2024-04-02 09:44:35', 'összeadás'),
(3, 2, 1, 0, '2024-04-02 09:44:37', 'összeadás'),
(4, 2, 1, 0, '2024-03-20 10:44:38', 'kivonás'),
(5, 2, 1, 0, '2024-03-20 10:44:40', 'kivonás'),
(6, 2, 1, 0, '2024-03-20 10:44:42', 'összeadás'),
(7, 2, 1, 0, '2024-03-15 10:44:47', 'szorzás'),
(8, 2, 1, 0, '2024-03-15 10:44:49', 'osztás'),
(9, 2, 1, 0, '2024-03-15 10:44:51', 'szorzás'),
(10, 2, 1, 0, '2024-03-08 10:44:53', 'szorzás'),
(11, 2, 1, 0, '2024-03-08 10:44:55', 'szorzás'),
(12, 2, 1, 0, '2024-03-08 10:44:57', 'kivonás'),
(13, 2, 1, 0, '2024-02-27 10:45:07', 'összeadás'),
(14, 2, 1, 0, '2024-02-27 10:45:09', 'összeadás'),
(15, 2, 1, 0, '2024-02-27 10:45:11', 'összeadás'),
(16, 2, 1, 0, '2024-02-18 10:45:13', 'kivonás'),
(17, 2, 1, 0, '2024-02-18 10:45:15', 'kivonás'),
(18, 2, 1, 0, '2024-02-18 10:45:17', 'kivonás'),
(19, 2, 1, 0, '2024-02-05 10:45:21', 'összeadás'),
(20, 2, 1, 0, '2024-02-05 10:45:23', 'szorzás'),
(21, 2, 1, 0, '2024-02-05 10:45:25', 'osztás'),
(22, 2, 1, 0, '2024-01-10 10:45:27', 'osztás'),
(23, 2, 0, 0, '2024-04-05 09:45:29', 'szorzás'),
(24, 2, 1, 0, '2024-04-05 09:45:31', 'összeadás'),
(25, 2, 1, 0, '2024-04-05 09:45:41', 'összeadás'),
(26, 2, 1, 0, '2024-04-05 09:45:42', 'kivonás'),
(27, 2, 1, 0, '2024-04-05 09:45:44', 'összeadás'),
(28, 2, 1, 1, '2024-04-05 09:45:46', 'összeadás'),
(29, 2, 1, 0, '2024-04-05 09:45:48', 'összeadás'),
(30, 2, 1, 0, '2024-04-05 09:45:50', 'kivonás'),
(31, 2, 1, 0, '2024-04-05 09:45:55', 'osztás'),
(32, 2, 1, 0, '2024-04-05 09:45:57', 'összeadás'),
(33, 2, 1, 0, '2024-04-05 09:45:58', 'kivonás'),
(34, 2, 1, 0, '2024-04-05 09:46:00', 'osztás'),
(35, 2, 1, 0, '2024-04-05 09:46:02', 'kivonás'),
(36, 2, 1, 0, '2024-04-05 09:46:04', 'osztás'),
(37, 2, 1, 0, '2024-04-05 09:46:29', 'összeadás'),
(38, 2, 1, 0, '2024-04-05 09:46:31', 'összeadás'),
(39, 2, 1, 0, '2024-04-05 09:46:33', 'kivonás'),
(40, 2, 1, 0, '2024-04-05 09:46:34', 'kivonás'),
(41, 2, 1, 0, '2024-04-05 09:46:36', 'összeadás'),
(42, 2, 1, 0, '2024-04-05 09:46:38', 'összeadás'),
(43, 2, 1, 0, '2024-04-05 09:46:43', 'összeadás'),
(44, 2, 1, 0, '2024-04-05 09:46:45', 'összeadás'),
(45, 2, 1, 0, '2024-04-05 09:46:47', 'osztás'),
(46, 2, 1, 0, '2024-04-05 09:46:49', 'szorzás'),
(47, 2, 1, 0, '2024-04-05 09:46:50', 'kivonás'),
(48, 2, 1, 0, '2024-04-05 09:46:52', 'összeadás'),
(49, 2, 1, 1, '2024-04-05 09:47:10', 'kivonás'),
(50, 2, 1, 1, '2024-04-05 09:47:14', 'kivonás'),
(51, 2, 1, 1, '2024-04-05 09:47:19', 'kivonás'),
(52, 2, 1, 1, '2024-04-05 09:47:24', 'összeadás'),
(53, 2, 1, 1, '2024-04-05 09:47:30', 'összeadás'),
(54, 2, 1, 1, '2024-04-05 09:47:34', 'összeadás'),
(55, 2, 1, 1, '2024-04-05 09:47:44', 'szorzás'),
(56, 2, 1, 1, '2024-04-05 09:47:49', 'osztás'),
(57, 2, 1, 0, '2024-04-05 09:47:54', 'összeadás'),
(58, 2, 1, 1, '2024-04-05 09:48:01', 'összeadás'),
(59, 2, 1, 1, '2024-04-05 09:48:06', 'szorzás'),
(60, 2, 1, 1, '2024-04-05 09:48:11', 'osztás'),
(61, 2, 1, 1, '2024-04-05 09:48:49', 'szorzás'),
(62, 2, 1, 1, '2024-04-05 09:49:12', 'osztás'),
(63, 2, 1, 1, '2024-04-05 09:49:16', 'szorzás'),
(64, 2, 1, 1, '2024-04-05 09:49:20', 'osztás'),
(65, 2, 1, 1, '2024-04-05 09:49:25', 'kivonás'),
(66, 2, 1, 1, '2024-04-05 09:50:36', 'szorzás'),
(67, 2, 1, 1, '2024-04-05 09:50:40', 'összeadás'),
(68, 2, 1, 0, '2024-04-05 09:55:50', 'összeadás'),
(69, 2, 1, 0, '2024-04-05 09:55:52', 'összeadás'),
(70, 2, 1, 0, '2024-04-05 09:55:54', 'összeadás'),
(71, 2, 1, 1, '2024-04-05 09:55:56', 'összeadás'),
(72, 2, 1, 0, '2024-04-05 09:55:58', 'összeadás'),
(73, 2, 1, 0, '2024-04-05 09:56:00', 'kivonás'),
(74, 2, 1, 0, '2024-04-05 09:56:05', 'összeadás'),
(75, 2, 1, 0, '2024-04-05 09:56:07', 'osztás'),
(76, 2, 1, 0, '2024-04-05 09:56:08', 'osztás'),
(77, 2, 1, 0, '2024-04-05 09:56:10', 'osztás'),
(78, 2, 1, 0, '2024-04-05 09:56:12', 'kivonás'),
(79, 2, 1, 0, '2024-04-05 09:56:14', 'osztás');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vizsgalatinaplo`
--

CREATE TABLE `vizsgalatinaplo` (
  `naplo_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `tipus` text DEFAULT NULL,
  `megjegyzes` text DEFAULT NULL,
  `datum` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `vizsgalatinaplo`
--

INSERT INTO `vizsgalatinaplo` (`naplo_id`, `felhasznalo_id`, `tipus`, `megjegyzes`, `datum`) VALUES
(2, 3, 'Válasz üzenet', 'Válasz: Ez egy válasz üzenet az adminisztrátoroktól!', '2024-04-02 09:51:55'),
(3, 3, 'Üzenet törlése', 'Az üzenet törlésre került', '2024-04-02 09:54:35');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `feladatlap`
--
ALTER TABLE `feladatlap`
  ADD PRIMARY KEY (`feladatlap_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`felhasznalo_id`),
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `kapcsolat`
--
ALTER TABLE `kapcsolat`
  ADD PRIMARY KEY (`kapcsolat_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `statisztika`
--
ALTER TABLE `statisztika`
  ADD PRIMARY KEY (`statisztika_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `vizsgalatinaplo`
--
ALTER TABLE `vizsgalatinaplo`
  ADD PRIMARY KEY (`naplo_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `feladatlap`
--
ALTER TABLE `feladatlap`
  MODIFY `feladatlap_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `kapcsolat`
--
ALTER TABLE `kapcsolat`
  MODIFY `kapcsolat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `statisztika`
--
ALTER TABLE `statisztika`
  MODIFY `statisztika_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT a táblához `vizsgalatinaplo`
--
ALTER TABLE `vizsgalatinaplo`
  MODIFY `naplo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `feladatlap`
--
ALTER TABLE `feladatlap`
  ADD CONSTRAINT `feladatlap_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`felhasznalo_id`);

--
-- Megkötések a táblához `kapcsolat`
--
ALTER TABLE `kapcsolat`
  ADD CONSTRAINT `kapcsolat_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`felhasznalo_id`);

--
-- Megkötések a táblához `statisztika`
--
ALTER TABLE `statisztika`
  ADD CONSTRAINT `statisztika_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`felhasznalo_id`);

--
-- Megkötések a táblához `vizsgalatinaplo`
--
ALTER TABLE `vizsgalatinaplo`
  ADD CONSTRAINT `vizsgalatinaplo_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`felhasznalo_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
