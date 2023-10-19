<!DOCTYPE html>
<html lang="hu" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/about.css">

    <title>Rólunk</title>
</head>
<body>
    <!-- A fejléc tartalmazza a menü rendszert -->
    <header>
        <!-- Navigációs sáv, Hamburger menü megjelenése sm méretben,
        világos szürke háttér -->
        <nav class="navbar navbar-expand-sm bg-secondary">
            <!-- cég, projekt nevéhez, alsó margó 0, h1 méretű szöveg -->
            <a href="#" class="navbar-brand mb-0 h1">
                <!-- MathMaster_Logo_nav: kis ikon bel oldalt -->
                <img class="MathMaster_Logo_nav d-inline-block align-top" src="../img/owl-47526.svg" alt="MathMaster Logó">
                <!-- szöveg függölegesen középre igazítva -->
                <span class="align-middle">MathMaster</span>
            </a>
            <!-- navbar-toggler: összecsukási beépülő modul, hamburger gomb -->
            <button class="navbar-toggler second-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent23" aria-controls="navbarSupportedContent23" aria-expanded="false" aria-label="Toggle navigation">
                <!-- animáció a gombra -->
                <div class="animated-icon2"><span></span><span></span><span></span><span></span></div>
            </button>
            <!-- elrejti a hamburger menüben a menü pontokat -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent23">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="../index.php">Kezdőlap</a>
                    </li>
                    <?php
                    if (isset($_SESSION['user_fnev'])) {
                        echo '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#settings"">Beállítások</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#message"">Üzenet</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="./php/contact.php">Kapcsolat</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="php/logout.php">Kijelentkezés</a></li>';
                    } else {
                        echo '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#login">Bejelentkezés</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#register">Regisztráció</a></li>';
                    }
                    ?>
                </ul>
            </div>
        </nav>
    </header>

    <div class="container mt-5">
        <div class="jumbotron text-center rounded-3">
            <h1 class="display-4">Rólunk</h1>
        </div>

        <div class="about-us">
            <p class="lead">Üdvözöljük a MathMaster online platformján! A szenvedélyünk az oktatás, ami életre hozta ezt a rendkívül hasznos tanulási oldalt.</p>
            <p>A célunk az volt, hogy egy könnyen hozzáférhető, interaktív matematikai gyakorlási platformot hozzunk létre az általános iskolás diákok számára. Hiszünk abban, hogy a matematika alapvető készségeket nyújt a gyerekeknek, amelyek az egész életük során hasznosak lesznek. Azonban tudjuk, hogy a matematikai tanulás lehet néha kihívást jelentő, és itt jövünk mi a segítségükre.</p>
            <p>Az általunk fejlesztett platform számos izgalmas funkciót kínál, amelyek segítik a diákokat a matematikai készségeik javításában. Lehetőség van a különböző matematikai kategóriákban való gyakorlásra, és a feladatok megoldásával azonnali visszajelzést kaphatnak arról, hogy helyesen vagy helytelenül válaszoltak-e. Emellett a diákok profiljukban nyomon követhetik eredményeiket, és statisztikákat is megtekinthetnek gyakorlásaikról.</p>
            <p>Elkötelezettek vagyunk az oktatás és a diákok fejlődése iránt, és büszkék vagyunk arra, hogy lehetőséget teremtettünk egy olyan eszköz létrehozásával, amely segíti a diákokat matematikai készségeik fejlesztésében. Reméljük, hogy élvezettel fogják használni platformunkat, és sikeresen fejlesztik matematikai tudásukat!</p>
        </div>
    </div>

    <footer>
        &copy 2023 MathMaster
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Hamburger menü saját scriptje -->
    <script src="../js/index.js"></script>
</body>
</html>
