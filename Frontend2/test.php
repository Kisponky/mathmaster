<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MathMaster</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
        /* styles.css */

        body {
            font-family: Arial, sans-serif;
        }

        header {
            background-color: #007bff;
            color: #fff;
            padding: 20px 0;
        }

        .company-name {
            font-size: 36px;
        }

        .full-width {
            width: 100%;
        }

        #main-content {
            padding: 40px 0;
        }

        button {
            margin-top: 10px;
        }

        footer {
            background-color: #f8f9fa;
            padding: 20px 0;
            text-align: center;
            color: #777;
        }
    </style>
</head>

<body>
    <!-- Fejléc -->
    <header>
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <img src="../Frontend/img/owl-47526.svg" alt="MathMaster logo" class="img-fluid">
                </div>
                <div class="col-md-10">
                    <h1 class="company-name">MathMaster</h1>
                </div>
            </div>
        </div>
        <!-- menu.php -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="#">MathMaster</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#main-content">Kezdőlap</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#about-us">Rólunk</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">Kapcsolat</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </header>

    <!-- Törzs -->
    <section id="main-content">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <img src="../Frontend/img/owl-47526.svg" alt="MathMaster logo" class="img-fluid full-width">
                    <h2>Kezdjünk neki a tanulásnak kis baglyocska!</h2>
                    <img src="../Frontend/img/undraw_educator_re_ju471.svg" alt="Kép" class="img-fluid">
                </div>
                <div class="col-md-3 col-6">
                    <button class="btn btn-primary btn-block">Gomb 1</button>
                </div>
                <div class="col-md-3 col-6">
                    <button class="btn btn-primary btn-block">Gomb 2</button>
                </div>
                <div class="col-md-3 col-6">
                    <button class="btn btn-primary btn-block">Gomb 3</button>
                </div>
                <div class="col-md-3 col-6">
                    <button class="btn btn-primary btn-block">Gomb 4</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Rólunk -->
    <section id="about-us">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h3>Rólunk</h3>
                    <p>Röviden összefoglalva a cégünkről.</p>
                    <button class="btn btn-primary">Tovább</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Kapcsolat -->
    <section id="contact">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h3>Kapcsolat</h3>
                    <p>Röviden összefoglalva elérhetőségeink.</p>
                    <button class="btn btn-primary">Tovább</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Lábléc -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <p>&copy; 2023 MathMaster</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>

</html>