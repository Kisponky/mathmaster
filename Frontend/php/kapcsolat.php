<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* CSS a textarea méretezhetőségének eltávolításához */
        textarea {
            resize: none; 
        }

        .jumbotron {
            background: url('../img/forest-3394066.jpg') center/cover;
            color: #d9b08c;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            padding: 40px;
            border-radius: 0;
        }

        .about-us {
            font-size: 1.6rem;
            line-height: 1.6;
            margin-top: 40px;
            color: #116466;
        }

        /* Testre szabhatod a további stílusokat itt */
    </style>

    <title>Kapcsolat</title>
</head>

<body>
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
                <textarea class="p-2 rounded-3" rows="4" cols="50" placeholder="Ide írja üzenetét..."></textarea>
            </ul>
        </div>

        <div class="about-us">
            <p>Bármikor szívesen fogadjuk visszajelzéseiket, észrevételeiket vagy kérdéseiket. Segítünk minden olyan módon, amennyire csak tudunk, hogy a matematikai gyakorlás minél hatékonyabb és szórakoztatóbb legyen az Ön számára.</p>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>