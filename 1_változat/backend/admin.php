<?php
session_start(); // sessions munkamenet megnyitása
$db = new mysqli('localhost', 'root', 'secret', 'jatekosmatek');

if ($db->connect_error) {
    die("Kapcsolódási hiba: " . $db->connect_error);
}

if (isset($_SESSION['user_fnev'])) {
    // Felhasználónév biztonságos beállítása
    $user_fnev = $_SESSION['user_fnev'];

    // Lekérdezés előkészítése
    $sql = "SELECT admin FROM Users WHERE fnev = ?";

    // Lekérdezés végrehajtása
    if ($stmt = $db->prepare($sql)) {
        $stmt->bind_param("s", $user_fnev);
        $stmt->execute();
        $stmt->bind_result($admin);

        // Eredmények kiolvasása && Az $admin változó tartalmazza a lekérdezés eredményét
        if ($stmt->fetch() && $admin == 1) {
            echo "Admin vagy!";

            // Űrlap megjelenítése az email cím megadásához
            echo "<form action='admin_action.php' method='POST'>
              <label for='email'>Új admin felvétele:</label>
              <input type='text' name='email' id='email' required>
              <input type='submit' name='make_admin' value='Felvesz'>
          </form>";
        } else {
            // Átirányítás, ha nincs eredmény && Átirányítás, ha nem vagy admin
            header("Location: ../backend/index.php");
            exit;
        }
    } else {
        // Hiba esetén
        echo "Hiba a lekérdezés előkészítésekor: " . $db->error;
    }

    // Lekérdezés lezárása
    $stmt->close();
} else {
    // Felhasználó nincs bejelentkezve, kezelheted a helyzetet, ahogy szeretnéd
    echo "Nincs bejelentkezve";
    header("Location: ../backend/login.php");
}
// Adatbázis kapcsolat bezárása
$db->close();
?>