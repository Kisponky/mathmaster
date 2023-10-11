<?php

// Adatbázis kapcsolás
$db = new mysqli('localhost', 'root', 'secret', 'jatekosmatek');

// Kapcsolódás ellenőrzése
if ($db->connect_error) {
    die("Hiba a kapcsolódás során: " . $db->connect_error);
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Felhasználói adatok ellenőrzése
    $query = "SELECT id, fnev, email, jelszo FROM Users WHERE email = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        // Felhasználó megtalálva, jelszó ellenőrzés
        $stmt->bind_result($userId, $fnev, $dbEmail, $dbPassword);
        $stmt->fetch();

        if (password_verify($password, $dbPassword)) {
            // Sikeres bejelentkezés
            session_start();
            $_SESSION['user_id'] = $userId;
            $_SESSION['user_email'] = $dbEmail;
            $_SESSION['user_fnev'] = $fnev;
            header("Location: index.php"); // Átirányítás a sikeres bejelentkezés után
            exit;
        } else {
            echo "Hibás jelszó. Kérjük, próbálja újra.";
        }
    } else {
        echo "Nincs ilyen felhasználó ezzel az e-mail címmel.";
    }
    $stmt->close();
}

// Adatbázis kapcsolat bezárása
$db->close();
?>
<!DOCTYPE html>
<html lang="en">
<!--Hooty a bagoly neve-->

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="css/styles.css">

    <link rel="shortcut icon" href="img/owl-47526.svg">

    <title>MathMaster</title>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <a href="#" class="navbar-brand mb-0 h1">
                <img class="MathMaster_Logo_nav d-inline-block align-top" src="img/owl-47526.svg" alt="MathMaster Logó">
                <!--nem középen jelenik meg-->
                <span class="align-middle">MathMaster</span>
            </a>
            <button class="navbar-toggler second-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent23" aria-controls="navbarSupportedContent23" aria-expanded="false" aria-label="Toggle navigation">
                <div class="animated-icon2"><span></span><span></span><span></span><span></span></div>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent23">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Kezdőlap</a>
                    </li>
                    <?php 
                    session_start();
                    if (isset($_SESSION['user_fnev'])) {
                        echo '<li class="nav-item"><a class="nav-link" href="php/profile.php">Profil</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="php/logout.php">Kijelentkezés</a></li>';
                    } else {
                        echo '<li class="nav-item"><a class="nav-link" href="php/login.php">Bejelentkezés</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="php/register.php">Regisztráció</a></li>';
                    }
                    ?>
                </ul>
            </div>
        </nav>
    </header>

    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <img class="MathMaster_Logo img-fluid" src="img/owl-47526.svg" alt="MathMaster Logó">
                <h1 class="cim">MathMaster</h1>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 text-center">
                <h3 class="feladat_cim">Kezdj tanulni Hootyval kis baglyocska!</h3>
                <img class="img-fluid" src="img/undraw_educator_re_ju471.svg" alt="Tanulás">
            </div>
        </div>
        <div class="row text-center">
            <div class="col-lg-3 d-md-none d-lg-block"></div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
                <a href="" class="btn btn-danger btn-block-sm osztaly_gomb">1-2 osztály</a>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
                <a href="" class="btn btn-danger btn-block-sm osztaly_gomb">3-4 osztály</a>
            </div>
            <div class="col-lg-3 d-md-none d-lg-block"></div>
            <div class="col-lg-3 d-md-none d-lg-block"></div>
            <div class="col-lg-3 col-md-6 mt-3">
                <a href="" class="btn btn-secondary btn-block-sm osztaly_gomb">5-6 osztály</a>
            </div>
            <div class="col-lg-3 col-md-6 mt-3">
                <a href="" class="btn btn-secondary btn-block-sm osztaly_gomb">7-8 osztály</a>
            </div>
            <div class="col-lg-3 d-md-none d-lg-block"></div>
        </div>

        <div class="row">
            <div class="col-lg-12 text-center">
                <h2>Rólunk:</h2>
                <p>Üdvözöljük a MathMaster online platformján! Válassz minket, mert szenvedélyünk az oktatás, és ezt a rendkívül hasznos tanulási oldalt életre hoztuk azért, hogy segítsünk neked a matematika világában.</p>
                <p>Tudjuk, hogy a matematika néha kihívást jelent, de mi itt vagyunk, hogy segítsünk neked.</p>
                <a href="" class="btn btn-secondary info_gomb">Tudj meg többet</a>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 text-center">
                <h2>Kapcsolatok:</h2>
                <p>Üdvözöljük a MathMaster gyakorló platformunkon! Itt vagyunk, hogy segítsünk, és várjuk észrevételeit, kérdéseit vagy javaslatait a szolgáltatásunkkal kapcsolatban.</p>
                <p>Bármikor szívesen fogadjuk visszajelzéseit és észrevételeit.</p>
                <a href="" class="btn btn-secondary info_gomb">Kapcsolat felvétel</a>
            </div>
        </div>
    </div>

    <footer>
        &copy 2023 MathMaster
    </footer>


    <script src="js/index.js"></script>
</body>

</html>