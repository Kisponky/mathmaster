<?php
session_start(); // sessions munkamenet megnyitása

// Ellenőrizze, hogy a felhasználó be van-e jelentkezve
if (isset($_SESSION['user_fnev'])) {
    $fnev = $_SESSION['user_fnev']; // Változtattam $fnev-t $_SESSION['user_email']-ra, mivel a bejelentkezett felhasználónak van e-mail címe
    echo '<a href="logout.php">KIJELNTKEZÉS</a>'; // Kijelentkezés link megjelenítése
    echo "Hello, $fnev!<br>";
    echo '<a href="profile.php">Profil szerkesztés</a><br>';
    echo '<a href="admin.php">Admin panel</a>';
} else {
    // Ha nincs bejelentkezve, akkor jelenítse meg a "Bejelentkezés" és "Regisztráció" linkeket
    echo '<a href="register.php">REGISZTRÁCIÓ</a><br>';
    echo '<a href="login.php">BEJELENTKEZÉS</a>';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kezdőoldal</title>
</head>
<body>
</body>
</html>
