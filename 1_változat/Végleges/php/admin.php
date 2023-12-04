<!DOCTYPE html>
<html lang="hu" data-bs-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Hamburger menü külső scriptek -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/admin.css">

    <title>Admin Felület</title>
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
                        echo '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#admin_recording"">Admin</a></li>';
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

    <!-- Admin felvétel -->
    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" id="admin_recording">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0" style="padding-top: 43px;">
                    <h1 class="fw-bold mb-0 fs-2">
                        <span style="vertical-align: inherit;">Új admin felvétel!</span>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezárás"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form action="php/sendMessage.php" method="POST">
                        <div class="form-floating mb-3">
                            <textarea class="form-control rounded-3" id="messageText" name="message" placeholder="Az üzenet szövege" oninput="this.style.height = ''; this.style.height = (this.scrollHeight) + 'px'"></textarea>
                            <label for="messageText">
                                <span style="vertical-align: inherit;">Felhasználónév</span>
                            </label>
                        </div>
                        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-danger" name="submit" type="submit">
                            <span style="vertical-align: inherit;">Felvétel</span>
                        </button>
                    </form>
                    <?php 
                    if (isset($_SESSION['send_message'])) {
                        $message = $_SESSION['send_message'];
                        unset($_SESSION['send_message']);
                        echo "<span style='color: #FFB02E;'>".$message."</span>";// Hibaüzenet kiírása
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>


    <div class="container mt-5">
        <div class="jumbotron">
            <h1 class="display-4">Beérkezett Üzenetek</h1>
        </div>
        <div class="message-container">
            <div class="message-bubble">
                <div class="message-header">
                    <div class="message-user">
                        Teszt
                    </div>
                    <div class="message-date">
                        Teszt
                    </div>
                </div>
                <div class="message-text">
                    Teszt
                    <form id="valaszForm" style="display: none;">
                        <div><textarea id="valaszTextarea" placeholder="Ide írja a választ"></textarea></div>
                        <div><button type="submit" class="btn btn-danger" id="kuldGomb">Küldés</button></div>
                    </form>
                </div>
                <div class="message-actions">
                    <button class="btn btn-danger" id="valaszGomb">Válasz</button>
                    <button class="btn btn-warming" id="deleteGomb"><img src="../img/trash-fill.svg" alt=""></button>
                </div>
            </div>
        </div>
    </div>

    <footer>
        &copy 2023 MathMaster
    </footer>

    <script src="../js/admin.js"></script>
    <!-- Bootstrap külső hivatkozás script-re -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <!-- Hamburger menü saját scriptje -->
    <script src="../js/index.js"></script>
</body>

</html>