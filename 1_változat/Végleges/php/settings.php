<?php
session_start();
$db = new mysqli('localhost', 'root', 'secret', 'jatekosmatek');

if ($db->connect_error) {
    die("Hiba a kapcsolódás során: " . $db->connect_error);
}

if (!isset($_SESSION['user_fnev'])) {
    header("Location: ../index.php");
    exit;
}

$user_fnev = $_SESSION['user_fnev'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['update-username'])) {
        // Felhasználónév módosítása
        $newUsername = $_POST['new-username'];

        // Ellenőrzés: Ha a felhasználónév mező üres
        if (empty($newUsername)) {
            $_SESSION['settings_message'] = "⚠️ Felhasználónév mező nem lehet üres!";
            header("Location: ../index.php");
            exit;
        }

        // Frissítse az adatbázist
        $updateQuery = "UPDATE Users SET fnev = ? WHERE fnev = ?";
        $stmt = $db->prepare($updateQuery);
        $stmt->bind_param("ss", $newUsername, $user_fnev);

        if ($stmt->execute()) {
            $_SESSION['user_fnev'] = $newUsername; // Frissítse a felhasználónevét a sessions-ben
            $_SESSION['settings_message'] = "👌 Felhasználónév sikeresen frissítve!";
            header("Location: ../index.php");
            exit;
        } else {
            $_SESSION['settings_message'] = "⚠️ Hiba a felhasználónév frissítése során: " . $stmt->error;
            header("Location: ../index.php");
            exit;
        }

        $stmt->close();
    } elseif (isset($_POST['update-email'])) {
        // E-mail cím módosítása
        $newEmail = $_POST['new-email'];

        // Ellenőrzés: Ha az e-mail mező üres
        if (empty($newEmail)) {
            $_SESSION['settings_message'] = "⚠️ E-mail mező nem lehet üres!";
            header("Location: ../index.php");
            exit;
        }

        // Frissítse az adatbázist
        $updateQuery = "UPDATE Users SET email = ? WHERE fnev = ?";
        $stmt = $db->prepare($updateQuery);
        $stmt->bind_param("ss", $newEmail, $user_fnev);

        if ($stmt->execute()) {
            $_SESSION['settings_message'] = "👌 E-mail cím sikeresen frissítve!";
            header("Location: ../index.php");
            exit;
        } else {
            $_SESSION['settings_message'] = "⚠️ Hiba az e-mail cím frissítése során: " . $stmt->error;
            header("Location: ../index.php");
            exit;
        }

        $stmt->close();
    } elseif (isset($_POST['update-password'])) {
        // Jelszó módosítása
        $newPassword = $_POST['new-password'];

        // Ellenőrzés: Ha a jelszó mező üres
        if (empty($newPassword)) {
            $_SESSION['settings_message'] = "⚠️ Jelszó mező nem lehet üres!";
            header("Location: ../index.php");
            exit;
        }

        // Hashelje és sózza be az új jelszót
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        // Frissítse az adatbázist
        $updateQuery = "UPDATE Users SET jelszo = ? WHERE fnev = ?";
        $stmt = $db->prepare($updateQuery);
        $stmt->bind_param("ss", $hashedPassword, $user_fnev);

        if ($stmt->execute()) {
            $_SESSION['settings_message'] = "👌 Jelszó sikeresen frissítve!";
            header("Location: ../index.php");
            exit;
        } else {
            $_SESSION['settings_message'] = "⚠️ Hiba a jelszó frissítése során: " . $stmt->error;
            header("Location: ../index.php");
            exit;
        }

        $stmt->close();
    } elseif (isset($_POST['delete-account'])) {
        // Fiók törlése
        $confirmDelete = $_POST['confirm-delete'];

        // Ellenőrizze, hogy a felhasználó valóban törölni kívánja-e a fiókját
        if ($confirmDelete === 'yes') {
            // Törlés az adatbázisból
            $deleteQuery = "DELETE FROM Users WHERE fnev = ?";
            $stmt = $db->prepare($deleteQuery);
            $stmt->bind_param("s", $user_fnev);

            if ($stmt->execute()) {
                session_destroy(); // Szükség esetén a session-t is törölje
                header("Location: ../index.php"); // Átirányítás a fő oldalra a fiók törlése után
                exit;
            } else {
                echo "Hiba a fiók törlése során: " . $stmt->error;
            }

            $stmt->close();
        } else {
            $_SESSION['settings_message'] = "⚠️ A fiók törléséhez erősítse meg a műveletet!";
            header("Location: ../index.php");
            exit;
        }
    }
}

$db->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
</head>
<body>
    <h1>Profil</h1>
    <p>Szia, <?php echo $_SESSION['user_fnev']; ?>!</p>

    <h2>Felhasználónév módosítása</h2>
    <form action="" method="post">
        <input type="text" name="new-username" placeholder="Új felhasználónév" required>
        <button type="submit" name="update-username">Módosítás</button>
    </form>

    <h2>E-mail cím módosítása</h2>
    <form action="" method="post">
        <input type="email" name="new-email" placeholder="Új e-mail cím" required>
        <button type="submit" name="update-email">Módosítás</button>
    </form>

    <h2>Jelszó módosítása</h2>
    <form action="" method="post">
        <input type="password" name="new-password" placeholder="Új jelszó" required>
        <button type="submit" name="update-password">Módosítás</button>
    </form>

    <h2>Fiók törlése</h2>
    <p>Figyelem: A fiók törlése visszavonhatatlan! Biztosan törölni szeretnéd a fiókodat?</p>
    <form action="" method="post">
        <input type="checkbox" name="confirm-delete" value="yes"> Igen, szeretném törölni a fiókomat<br>
        <button type="submit" name="delete-account">Fiók törlése</button>
    </form>

    <a href="../index.php">Vissza a kezdőlapra</a>
</body>
</html>
