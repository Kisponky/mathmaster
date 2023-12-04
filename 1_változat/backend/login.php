<?php
// Adatbázis kapcsolás
$db = new mysqli('localhost', 'root', 'secret', 'jatekosmatek');

// Kapcsolódás ellenőrzése
if ($db->connect_error) {
    die("Hiba a kapcsolódás során: " . $db->connect_error);
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Felhasználói adatok ellenőrzése
    $query = "SELECT id, fnev, email, jelszo FROM Users WHERE email = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        // Felhasználó megtalálva, jelszó ellenőrzés
        $stmt->bind_result($userId, $fnev, $dbEmail, $dbPassword);
        $stmt->fetch();

        if (password_verify($password, $dbPassword)) {
            // Sikeres bejelentkezés
            session_start();
            $_SESSION['user_id'] = $userId;
            $_SESSION['user_email'] = $dbEmail;
            $_SESSION['user_fnev'] = $fnev;
            header("Location: index.php"); // Átirányítás a sikeres bejelentkezés után
            exit;
        } else {
            echo "Hibás jelszó. Kérjük, próbálja újra.";
        }
    } else {
        echo "Nincs ilyen felhasználó ezzel az e-mail címmel.";
    }
    $stmt->close();
}

// Adatbázis kapcsolat bezárása
$db->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bejelentkezés</title>
</head>
<body>
    <h1>Bejelentkezés</h1>
    <form action="login.php" method="post">
        <label for="email">E-mail:</label>
        <input type="email" name="email" required><br>
        
        <label for="password">Jelszó:</label>
        <input type="password" name="password" required><br>

        <input type="submit" value="Bejelentkezés">
    </form>
</body>
</html>
