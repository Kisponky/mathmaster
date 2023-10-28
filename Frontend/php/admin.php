<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        /* styles.css */

        /* Stílus a beérkezett üzenetekhez */
        .message-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f1f1f1;
            padding: 20px;
        }

        .message-bubble {
            width: 80%;
            padding: 20px;
            margin: 20px 0;
            background: linear-gradient(to bottom, #4CAF50, #45a049);
            color: white;
            border-radius: 20px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s;
            display: flex;
            flex-direction: column;
        }

        .message-bubble:hover {
            transform: scale(1.05);
        }

        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .message-user {
            font-size: 1.4rem;
        }

        .message-date {
            font-size: 1.2rem;
            color: #ddd;
        }

        .message-text {
            font-size: 1.6rem;
        }

        .message-actions {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }

        .message-actions button {
            padding: 10px 20px;
            font-size: 1.4rem;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .message-actions button:nth-child(1) {
            background-color: #337AB7;
            color: white;
            margin-right: 10px;
        }

        .message-actions button:nth-child(1):hover {
            background-color: #235a96;
        }

        .message-actions button:nth-child(2) {
            background-color: #D9534F;
            color: white;
        }

        .message-actions button:nth-child(2):hover {
            background-color: #b33c39;
        }

        #inputMezo {
            resize: none;
            overflow: hidden;
            display: none;
            border-radius: 10px;
            font-size: 16px;
            padding: 10px;
            width: 100%;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            min-height: 50px; /* Minimális magasság */
        }
    </style>

    <script>
        function megjelenitInputMezo() {
            var inputMezo = document.getElementById("inputMezo");
            inputMezo.style.display = "block";
        }

        function novekedesTextarea() {
            var textarea = document.getElementById("inputMezo");
            textarea.style.height = "auto";
            textarea.style.height = (textarea.scrollHeight) + "px";
        }
    </script>

    <title>Admin Felület</title>
</head>

<body>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Admin Felület</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">Beérkezett Üzenetek</a>
                </li>
                <!-- További menüpontok hozzáadása -->
            </ul>
        </div>
    </nav>

    <div class="container mt-5">
        <div class="jumbotron">
            <h1 class="display-4">Beérkezett Üzenetek</h1>
            <p class="lead">Itt láthatod az összes beérkezett üzenetet az admin felületen.</p>
        </div>

        <div class="message-container">
            <div class="message-bubble">
                <div class="message-header">
                    <div class="message-user">JaneDoe</div>
                    <div class="message-date">2023-10-16 10:30</div>
                </div>
                <div class="message-text">
                    Ez egy példa szövegbuborék.
                    <textarea type="text" id="inputMezo" oninput="novekedesTextarea()"></textarea>
                </div>
                <div class="message-actions">
                    <button class="btn btn-info" onclick="megjelenitInputMezo()">Megtekintés</button>
                    <button class="btn btn-danger">Törlés</button>
                </div>
            </div>

            <!-- További szövegbuborékok itt -->
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>