<!DOCTYPE html>
<html lang="hu" data-bs-theme="dark">
<!--Hooty a bagoly neve-->

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Hamburger menü külső scriptek -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <!-- Bootstrap külső hivatkozás CSS-re -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- Saját CSS -->
    <link rel="stylesheet" href="css/styles.css">
    <!-- favicon -->
    <link rel="shortcut icon" href="img/owl-47526.svg">

    <title>MathMaster</title>
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
                <img class="MathMaster_Logo_nav d-inline-block align-top" src="img/owl-47526.svg" alt="MathMaster Logó">
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
                        <a class="nav-link" href="#">Kezdőlap</a>
                    </li>
                    <?php
                    session_start();
                    if (isset($_SESSION['user_fnev'])) {
                        echo '<li class="nav-item"><a class="nav-link" href="php/profile.php">Profil</a></li>';
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

    <!-- Register -->
    <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header p-5 pb-4 border-bottom-0" style="padding-top: 43px;">
                    <h1 class="fw-bold mb-0 fs-2">
                        <span style="vertical-align: inherit;">Regisztráció</span>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezárás"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form action="php/register.php" method="POST">
                        <div class="form-floating mb-3">
                            <input name="fullname" type="text" class="form-control rounded-3" id="floatingInput" placeholder="vezeteknev keresztnev">
                            <label for="floatingInput">
                                <span style="vertical-align: inherit;">Teljes név</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="username" type="text" class="form-control rounded-3" id="floatingInput" placeholder="felhasznalonev">
                            <label for="floatingInput">
                                <span style="vertical-align: inherit;">Felhasználónév</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="email" type="email" class="form-control rounded-3" id="floatingInput" placeholder="nev@example.com">
                            <label for="floatingInput">
                                <span style="vertical-align: inherit;">Email cím</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="pw" type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Jelszo">
                            <label for="floatingPassword">
                                <span style="vertical-align: inherit;">Jelszó</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="pw2" type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Jelszo">
                            <label for="floatingPassword">
                                <span style="vertical-align: inherit;">Jelszó újra</span>
                            </label>
                        </div>
                        <button name="submit" class="w-100 mb-2 btn btn-lg rounded-3 btn-danger" type="submit">
                            <span style="vertical-align: inherit;">Regisztráció</span>
                        </button>
                        <small class="text-body-secondary">
                            <span style="vertical-align: inherit;">A Regisztráció gombra kattintva elfogadja a felhasználási feltételeket.</span>
                        </small>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Login -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header p-5 pb-4 border-bottom-0" style="padding-top: 43px;">
                    <h1 class="fw-bold mb-0 fs-2">
                        <span style="vertical-align: inherit;">Bejelentkezés</span>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezárás"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form action="php/login.php" method="POST">
                        <div class="form-floating mb-3">
                            <input name="email" type="email" class="form-control rounded-3" id="floatingInput" placeholder="nev@example.com">
                            <label for="floatingInput">
                                <span style="vertical-align: inherit;">Email cím</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="password" type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Jelszo">
                            <label for="floatingPassword">
                                <span style="vertical-align: inherit;">Jelszó</span>
                            </label>
                        </div>
                        <button name="submit" class="w-100 mb-2 btn btn-lg rounded-3 btn-danger" type="submit">
                            <span style="vertical-align: inherit;">Bejelentkezés</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <img class="MathMaster_Logo img-fluid" src="img/owl-47526.svg" alt="MathMaster Logó">
                <!-- Az oldal címe -->
                <h1 class="cim">MathMaster</h1>
            </div>
        </div>


        <div class="row">
            <div class="col-lg-12 text-center">
                <!-- következő rész címe -->
                <h3 class="feladat_cim">Kezdj tanulni Hootyval kis baglyocska!</h3>
                <img class="img-fluid" src="img/undraw_educator_re_ju471.svg" alt="Tanulás">
            </div>
        </div>
        <div class="row text-center">
            <!-- md méret és az alatt eltűnik az elem, míg lg méret és az felett megjelenik az elem -->
            <div class="col-lg-3 d-md-none d-lg-block"></div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
                <!-- btn-block-sm: gomb teljes oldal szélességű telefonos nézetben,
                osztaly_gomb: a gombok alapértelmezet stílusa -->
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
                <!-- Al részek gombja -->
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

    <!-- Bootstrap külső hivatkozás script-re -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <!-- Hamburger menü saját scriptje -->
    <script src="js/index.js"></script>
</body>

</html>