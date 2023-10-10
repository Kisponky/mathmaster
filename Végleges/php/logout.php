<?php
session_start(); // sessions munkamenet megnyitása

// Ellenőrizze, hogy a felhasználó be van-e jelentkezve
if (isset($_SESSION['user_id'])) {
    // Ha be van jelentkezve, akkor szüntesse meg a sessions munkamenetet és átirányít a kijelentkezés utáni oldalra
    session_destroy();
    header("Location: ../index.php"); // Átirányítás a kijelentkezés utáni oldalra (például a bejelentkezési oldalra)
    exit;
}
?>