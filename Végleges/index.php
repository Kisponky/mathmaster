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
    <?php // Login felület megnyitás az átirányítás után
    session_start();
    if (isset($_SESSION['login_message'])) {
    ?>
        <script>
            $(document).ready(function() {
                $('#login').modal('show');
            });
        </script>

    <?php
    }
    ?>

    <?php // Register felület megnyitás az átirányítás után               
    if (isset($_SESSION['register_message'])) {
    ?>
        <script>
            $(document).ready(function() {
                $('#register').modal('show');
            });
        </script>
    <?php
    }
    ?>

    <?php // Register felület megnyitás az átirányítás után               
    if (isset($_SESSION['settings_message'])) {
    ?>
        <script>
            $(document).ready(function() {
                $('#settings').modal('show');
            });
        </script>
    <?php
    }
    ?>
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
                    if (isset($_SESSION['user_fnev'])) {
                        echo '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#message"">Üzenet</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#settings"">Beállítások</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#message"">Üzenet</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#admin_recording"">Admin</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="./php/admin.php">Admin felület</a></li>';
                        echo '<li class="nav-item"><a class="nav-link" href="./php/about.php">Rólunk</a></li>';
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

    <!-- Register -->
    <!-- megjelenő elem az oldal felet, alapértelmezetten rejtve -->
    <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <!-- alapértelmezet méret, középre igazítva -->
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <h1 class="fw-bold mb-0 fs-2">
                        <span class="modal-span">Regisztráció</span>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezárás"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form action="php/register.php" method="POST">
                        <!-- lebegő címke -->
                        <div class="form-floating mb-3">
                            <input name="fullname" type="text" class="form-control rounded-3" id="floatingInput" placeholder="vezeteknev keresztnev">
                            <label for="floatingInput">
                                <span class="modal-span">Teljes név</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="username" type="text" class="form-control rounded-3" id="floatingInput" placeholder="felhasznalonev">
                            <label for="floatingInput">
                                <span class="modal-span">Felhasználónév</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="email" type="email" class="form-control rounded-3" id="floatingInput" placeholder="nev@example.com">
                            <label for="floatingInput">
                                <span class="modal-span">Email cím</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="pw" type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Jelszo">
                            <label for="floatingPassword">
                                <span class="modal-span">Jelszó</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="pw2" type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Jelszo">
                            <label for="floatingPassword">
                                <span class="modal-span">Jelszó újra</span>
                            </label>
                        </div>
                        <button name="submit" class="w-100 mb-2 btn btn-lg rounded-3 btn-danger" type="submit">
                            <span class="modal-span">Regisztráció</span>
                        </button>
                        <?php
                        if (isset($_SESSION['register_message'])) {
                            $message = $_SESSION['register_message'];
                            unset($_SESSION['register_message']);
                            echo "<span style='color: #FFB02E;'>⚠️ " . $message . "</span><br>"; // Hibaüzenet kiírása
                        }
                        ?>
                        <small class="text-body-secondary">
                            <span class="modal-span">A Regisztráció gombra kattintva elfogadja a felhasználási feltételeket.</span>
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
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <h1 class="fw-bold mb-0 fs-2">
                        <span class="modal-span">Bejelentkezés</span>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezárás"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form action="php/login.php" method="POST">
                        <div class="form-floating mb-3">
                            <input name="email" type="email" class="form-control rounded-3" id="floatingInput" placeholder="nev@example.com">
                            <label for="floatingInput">
                                <span class="modal-span">Email cím</span>
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="password" type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Jelszo">
                            <label for="floatingPassword">
                                <span class="modal-span">Jelszó</span>
                            </label>
                        </div>
                        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-danger" type="submit">
                            <span class="modal-span">Bejelentkezés</span>
                        </button>
                    </form>
                    <?php
                    if (isset($_SESSION['login_message'])) {
                        $message = $_SESSION['login_message'];
                        unset($_SESSION['login_message']);
                        echo "<span style='color: #FFB02E;'>⚠️ " . $message . "</span>"; // Hibaüzenet kiírása
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>

    <!-- Settings -->
    <div class="modal fade" id="settings" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <h1 class="fw-bold mb-0 fs-2">
                        <span class="modal-span">Beállítások</span>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezárás"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form action="php/settings.php" method="POST">
                        <div class="form-floating mb-3">
                            <input name="new-username" type="text" class="form-control rounded-3 mb-2" id="floatingInput" placeholder="felhasznalonev">
                            <label for="floatingInput">
                                <span class="modal-span">Felhasználónév módosítása</span>
                            </label>
                            <button name="update-username" class="w-100 mb-1 btn btn-lg rounded-3 btn-danger" type="submit">
                                <span class="modal-span">Módosítás</span>
                            </button>
                        </div>
                    </form>
                    <form action="php/settings.php" method="POST">
                        <div class="form-floating mb-3">
                            <input name="new-email" type="email" class="form-control rounded-3 mb-2" id="floatingInput" placeholder="nev@example.com">
                            <label for="floatingInput">
                                <span class="modal-span">E-mail cím módosítása</span>
                            </label>
                            <button type="submit" name="update-email" class="w-100 mb-1 btn btn-lg rounded-3 btn-danger" type="submit">
                                <span class="modal-span">Módosítás</span>
                            </button>
                        </div>
                    </form>
                    <form action="php/settings.php" method="POST">
                        <div class="form-floating mb-3">
                            <input name="new-password" type="password" class="form-control rounded-3 mb-2" id="floatingPassword" placeholder="Jelszo">
                            <label for="floatingPassword">
                                <span class="modal-span">Jelszó módosítása</span>
                            </label>
                            <button name="update-password" class="w-100 mb-1 btn btn-lg rounded-3 btn-danger" type="submit">
                                <span class="modal-span">Módosítás</span>
                            </button>
                        </div>
                    </form>
                    <form action="php/settings.php" method="POST">
                        <small class="text-body-secondary">
                            <span class="modal-span">Figyelem: A fiók törlése visszavonhatatlan! Biztosan törölni szeretnéd a fiókodat?</span>
                        </small>
                    </form>
                    <form action="php/settings.php" method="POST">
                        <div class="form-check mt-1 mb-2">
                            <input type="checkbox" name="confirm-delete" value="yes" class="form-check-input" id="same-address">
                            <label class="form-check-label" for="same-address">
                                <span class="vertical-align: inherit;">Igen, szeretném törölni a fiókomat</span>
                            </label>
                        </div>
                        <button name="delete-account" class="w-100 mb-2 btn btn-lg rounded-3 btn-danger" type="submit">
                            <span class="modal-span">Fiók törlése</span>
                        </button>
                    </form>
                    <?php
                    if (isset($_SESSION['settings_message'])) {
                        $message = $_SESSION['settings_message'];
                        unset($_SESSION['settings_message']);
                        echo "<span style='color: #FFB02E;'>" . $message . "</span><br>"; // Hibaüzenet kiírása
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>

    <!-- Message -->
    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" id="message">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0" style="padding-top: 43px;">
                    <h1 class="fw-bold mb-0 fs-2">
                        <span style="vertical-align: inherit;">Üzenet küldése</span>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezárás"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form action="php/sendMessage.php" method="POST">
                        <div class="form-floating mb-3">
                            <textarea class="form-control rounded-3" id="messageText" name="message" placeholder="Az üzenet szövege" oninput="this.style.height = ''; this.style.height = (this.scrollHeight) + 'px'"></textarea>
                            <label for="messageText">
                                <span style="vertical-align: inherit;">Üzenet szövege</span>
                            </label>
                        </div>
                        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-danger" name="submit" type="submit">
                            <span style="vertical-align: inherit;">Küldés</span>
                        </button>
                    </form>
                    <?php
                    if (isset($_SESSION['send_message'])) {
                        $message = $_SESSION['send_message'];
                        unset($_SESSION['send_message']);
                        echo "<span style='color: #FFB02E;'>" . $message . "</span>"; // Hibaüzenet kiírása
                    }
                    ?>
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
    <!-- saját script -->
    <script src="js/index.js"></script>
</body>

</html>