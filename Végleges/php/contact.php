<!DOCTYPE html>
<html lang="hu" data-bs-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/contact.css">

    <title>Kapcsolat</title>
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
            <h1 class="display-4">Kapcsolat</h1>
        </div>

        <div class="about-us">
            <p class="lead">Üdvözöljük a MathMaster gyakorló platformunkon! Ha bármilyen kérdése, észrevétele vagy javaslata van a szolgáltatásunkkal kapcsolatban, kérjük, vegye fel velünk a kapcsolatot.</p>
        </div>

        <div class="about-us">
            <h2>Fejlesztők</h2>
            <p>Ezen a projekten Ponkházi Barnabás és Nádas Tamás dolgozott. Mindketten elkötelezettek az oktatás iránt, és nagy örömmel dolgoztak azon, hogy segítsék az általános iskolás diákokat a matematikai gyakorlásban és eredményeik nyomon követésében.</p>
        </div>

        <div class="about-us">
            <h2>Hogyan érhet el minket?</h2>
            <p>Az alábbi elérhetőségeken keresztül léphet kapcsolatba velünk:</p>
            <ul>
                <li>Telefon: +36 123 456 789</li>
                <li>Cím: Budapest, Példa utca 123.</li>
                <li>Üzenet:</li>
                <form action="sendMessage.php" method="POST">
                    <textarea name="message" rows="4" cols="50" class="form-control mb-3 rounded-3" id="messageText" placeholder="Ide írja üzenetét..."></textarea>
                    <button name="submit" class="w-100 mb-2 btn btn-lg rounded-3 btn-danger bekuld_gomb" type="submit">
                        <span style="vertical-align: inherit;">Küldés</span>
                    </button>
                </form>
            </ul>
        </div>

        <div class="about-us">
            <p>Bármikor szívesen fogadjuk visszajelzéseiket, észrevételeiket vagy kérdéseiket. Segítünk minden olyan módon, amennyire csak tudunk, hogy a matematikai gyakorlás minél hatékonyabb és szórakoztatóbb legyen az Ön számára.</p>
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