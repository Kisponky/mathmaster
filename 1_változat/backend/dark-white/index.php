<?php
session_start();

if (isset($_POST['toggle_mode'])) {
    if ($_SESSION['mode'] === "light") {
        $_SESSION['mode'] = "dark";
    } else {
        $_SESSION['mode'] = "light";
    }
}

if (!isset($_SESSION['mode'])) {
    $_SESSION['mode'] = "light";
}

$mode = $_SESSION['mode'];
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Világos/Sötét Mód Váltó</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            transition: background 0.3s, color 0.3s;
        }

        body.light {
            background-color: white;
            color: black;
        }

        body.dark {
            background-color: black;
            color: white;
        }
    </style>
</head>
<body class="<?php echo $mode; ?>">
    <div class="container mt-5">
        <h1>Világos/Sötét Mód Váltó</h1>
        <p>Jelenleg a <?php echo ($mode === "light") ? "világos mód" : "sötét mód"; ?> van beállítva.</p>

        <form method="post">
            <button type="submit" name="toggle_mode" class="btn btn-primary">
                <?php echo ($mode === "light") ? "Sötét Mód" : "Világos Mód"; ?> váltás
            </button>
        </form>
    </div>
    <a href="./masik.php">második oldal</a>
</body>
</html>
