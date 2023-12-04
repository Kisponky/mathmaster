<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/register.css">

    <title>Regisztráció</title>
</head>

<body>

    <!-- Settings -->
    <div class="modal modal-sheet position-static d-block  p-4 py-md-5" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <h1 class="fw-bold mb-0 fs-2">
                        <span class="modal-span">Beállítások</span>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezárás"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form action="php/login.php" method="POST">
                        <div class="row">
                            <div class="form-floating mb-3">
                                <input name="username" type="text" class="form-control rounded-3 mb-2" id="floatingInput" placeholder="felhasznalonev">
                                <label for="floatingInput">
                                    <span class="modal-span">Felhasználónév módosítása</span>
                                </label>
                                <button class="w-100 mb-1 btn btn-lg rounded-3 btn-danger" type="submit">
                                    <span class="modal-span">Módosítás</span>
                                </button>
                            </div>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="email" type="email" class="form-control rounded-3 mb-2" id="floatingInput" placeholder="nev@example.com">
                            <label for="floatingInput">
                                <span class="modal-span">E-mail cím módosítása</span>
                            </label>
                            <button class="w-100 mb-1 btn btn-lg rounded-3 btn-danger" type="submit">
                                <span class="modal-span">Módosítás</span>
                            </button>
                        </div>
                        <div class="form-floating mb-3">
                            <input name="password" type="password" class="form-control rounded-3 mb-2" id="floatingPassword" placeholder="Jelszo">
                            <label for="floatingPassword">
                                <span class="modal-span">Jelszó módosítása</span>
                            </label>
                            <button class="w-100 mb-1 btn btn-lg rounded-3 btn-danger" type="submit">
                                <span class="modal-span">Módosítás</span>
                            </button>
                        </div>
                        <small class="text-body-secondary">
                            <span class="modal-span">Figyelem: A fiók törlése visszavonhatatlan! Biztosan törölni szeretnéd a fiókodat?</span>
                        </small>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="same-address">
                            <label class="form-check-label" for="same-address">
                                <span class="vertical-align: inherit;">Igen, szeretném törölni a fiókomat</span>
                            </label>
                        </div>
                        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-danger" type="submit">
                            <span class="modal-span">Fiók törlése</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>

</html>