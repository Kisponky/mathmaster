<?php
session_start();

// A felhasználó bejelentkezésének ellenőrzése
if (isset($_SESSION['user_fnev'])) {
    $fnev = $_SESSION['user_fnev'];

    // A Form elküldésének ellenőrzése
    if (isset($_POST['submit'])) {
        // Textarea kitöltésének ellenőrzése
        if (!empty($_POST['message'])) {
            $email = $_SESSION['user_email'];
            $message = $_POST['message'];

            // Kapcsolódás az adatbázishoz
            $db = new mysqli('localhost', 'root', 'secret', 'jatekosmatek');
            if ($db->connect_error) {
                die("Kapcsolódási hiba: " . $db->connect_error);
            }

            // Üzenet mentése a "contactUs" táblába
            $sql = "INSERT INTO contactUs (felhasznaloId, text) VALUES (?, ?)";
            if ($stmt = $db->prepare($sql)) {
                $stmt->bind_param("is", $felhasznaloId, $message);
                $felhasznaloId = $_SESSION['user_id'];
                if ($stmt->execute()) {
                    echo "Az üzenet sikeresen elküldve!";
                    exit;
                } else {
                    echo "Hiba az üzenet elküldésekor: " . $stmt->error;
                }
                $stmt->close();
            } else {
                echo "Hiba az SQL előkészítésekor: " . $db->error;
            }


            $db->close();
        } else {
            echo "Az üzenet mező kitöltése kötelező!";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kapcsolat</title>
</head>

<body>
    <?php
    if (isset($_SESSION['user_fnev'])) {
        // Ha be van jelentkezve, form űrlap megjelenítése:
    ?>
        <h1>Küldj üzenetet a fejlesztőknek</h1>
        <form method="POST" action="">
            <label for="message">Üzenet:</label>
            <textarea id="message" name="message" rows="4" cols="50" required></textarea><br>
            <input type="submit" name="submit" value="Küldés">
        </form>
    <?php
    } else {
        // Ha nincs bejelentkezve:
        echo "Kérjük, először jelentkezz be, hogy üzenetet küldj!";
    }
    ?>
</body>

</html>