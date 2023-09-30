<?php
$db = new mysqli('localhost', 'root', 'secret', 'jatekosmatek');

// Ellenőrizd a kapcsolódás hibáját
if ($db->connect_error) {
    die("Hiba a kapcsolódás során: " . $db->connect_error);
}

if (isset($_POST['submit'])) {
    // Űrlap adatok beolvasása
    $teljesNev = $_POST['fullname'];
    $fnev = $_POST['username'];
    $email = $_POST['email'];
    $jelszo = $_POST['pw'];
    $jelszo2 = $_POST['pw2'];

    // Ellenőrizd, hogy a két jelszó egyezik-e
    if ($jelszo != $jelszo2) {
        echo "A két jelszó nem egyezik meg. Kérjük, próbálja újra.";
    } else {
        // Ellenőrizd, hogy az e-mail cím érvényes
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Az e-mail cím nem érvényes. Kérjük, adjon meg egy érvényes e-mail címet.";
        } else {
            $jelszoHash = password_hash($jelszo, PASSWORD_DEFAULT); // Jelszó hash-elése

            // Ellenőrizd, hogy van-e már regisztrált felhasználó az e-mail címmel
            $query = "SELECT id FROM Users WHERE email = ?";
            $stmt = $db->prepare($query);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                echo "Ez az e-mail cím már regisztrálva van.";
            } else {
                // Hozzáadás az adatbázishoz
                $insertQuery = "INSERT INTO Users (teljesNev, fnev, email, jelszo, letrehozas) VALUES (?, ?, ?, ?, NOW())";
                $insertStmt = $db->prepare($insertQuery);
                $insertStmt->bind_param("ssss", $teljesNev, $fnev, $email, $jelszoHash);
                
                if ($insertStmt->execute()) {
                    echo "Sikeres regisztráció!";
                    header("Location: index.php");
                    exit;
                } else {
                    echo "Hiba a regisztráció során: " . $insertStmt->error;
                }
                $insertStmt->close();
            }
            // Lezárás és adatbázis kapcsolat bezárása
            $stmt->close();
        }
    }

    
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regiszter</title>
</head>
<body>
    <h1>Regisztráció</h1>
    <form action="register.php" method="post">
        <input type="text" name="fullname" placeholder="Full name"><br>
        <input type="text" name="username" placeholder="username"><br>
        <input type="email" name="email" placeholder="e-mail"><br>
        <input type="password" name="pw" placeholder="password"><br>
        <input type="password" name="pw2" placeholder="re-password"><br>    
        <input value="Registration" type="submit" name="submit">
    </form>
</body>
</html>
