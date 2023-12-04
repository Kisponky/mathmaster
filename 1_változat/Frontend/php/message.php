<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoI**i6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/register.css">

    <style>
        /* CSS a textarea méretezhetőségének eltávolításához */
        textarea {
            resize: none;
            overflow: hidden;
        }
    </style>

    <title>Üzenet küldése</title>
</head>

<body>

    <div class="modal modal-sheet position-static d-block p-4 py-md-5" tabindex="-1" role="dialog" id="sendMessage">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0" style="padding-top: 43px;">
                    <h1 class="fw-bold mb-0 fs-2">
                        <span style="vertical-align: inherit;">Üzenet küldése</span>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Bezárás"></button>
                </div>

                <div class="modal-body p-5 pt-0">
                    <form>
                        <div class="form-floating mb-3">
                            <textarea class="form-control rounded-3" id="messageText" placeholder="Az üzenet szövege" oninput="this.style.height = ''; this.style.height = (this.scrollHeight) + 'px'"></textarea>
                            <label for="messageText">
                                <span style="vertical-align: inherit;">Üzenet szövege</span>
                            </label>
                        </div>
                        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                            <span style="vertical-align: inherit;">Küldés</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>

</html>
