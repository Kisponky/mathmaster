<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['message'])) {
        $message = $_POST['message'];
        // Felhasználó azonosítója, amit példányosításkor a megfelelő módon állíts be
        $userId = 1; // Példa felhasználó azonosítója

        $db = new Connect;
        $stmt = $db->prepare('INSERT INTO contactUS (felhasznaloId, text, created_at) VALUES (:userId, :message, NOW())');
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->bindParam(':message', $message, PDO::PARAM_STR);

        if ($stmt->execute()) {
            echo "Az üzenet elküldése sikeres volt.";
        } else {
            echo "Hiba történt az üzenet elküldése közben.";
        }
    } else {
        echo "Az üzenet nem lett megadva.";
    }
}
?>
