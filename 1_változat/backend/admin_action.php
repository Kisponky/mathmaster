<?php
session_start();
$db = new mysqli('localhost', 'root', 'secret', 'jatekosmatek');

if ($db->connect_error) {
    die("Kapcsolódási hiba: " . $db->connect_error);
}

if (isset($_POST['make_admin'])) {
    $email = $_POST['email'];

    // Ellenőrizd, hogy az adott email címmel rendelkező felhasználó létezik-e
    $check_sql = "SELECT id FROM Users WHERE email = ?";
    if ($check_stmt = $db->prepare($check_sql)) {
        $check_stmt->bind_param("s", $email);
        $check_stmt->execute();
        $check_stmt->store_result();

        if ($check_stmt->num_rows == 1) {
            // Az email címmel rendelkező felhasználót adminná teszed
            $update_sql = "UPDATE Users SET admin = 1 WHERE email = ?";
            if ($update_stmt = $db->prepare($update_sql)) {
                $update_stmt->bind_param("s", $email);
                $update_stmt->execute();
                $update_stmt->close();
                
                echo "A felhasználó adminná lett téve.";
            } else {
                echo "Hiba a frissítés előkészítésekor: " . $db->error;
            }
        } else {
            echo "Nincs ilyen email című felhasználó.";
        }

        $check_stmt->close();
    } else {
        echo "Hiba a ellenőrzés előkészítésekor: " . $db->error;
    }
}

$db->close();
?>
