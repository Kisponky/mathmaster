<?php
session_start();

// Kapcsolódás az adatbázishoz
$db = new mysqli('localhost', 'root', 'secret', 'jatekosmatek');
if ($db->connect_error) {
    die("Kapcsolódási hiba: " . $db->connect_error);
}

// Törlés művelet kezelése
if (isset($_POST['delete_message'])) {
    $message_id = $_POST['message_id'];
    $delete_sql = "DELETE FROM contactUs WHERE id = ?";
    $delete_stmt = $db->prepare($delete_sql);
    $delete_stmt->bind_param("i", $message_id);
    if ($delete_stmt->execute()) {
        echo "Az üzenet sikeresen törölve.";
        exit;
    } else {
        echo "Hiba az üzenet törlésekor: " . $delete_stmt->error;
    }
    $delete_stmt->close();
}

// Lekérdezés a contactUs és Users táblák között INNER JOIN segítségével
$sql = "SELECT Users.fnev, Users.email, contactUs.created_at, contactUs.text, contactUs.id
        FROM contactUs
        INNER JOIN Users ON contactUs.felhasznaloId = Users.id
        ORDER BY contactUs.created_at DESC";

$result = $db->query($sql);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kapcsolat üzenetek</title>
</head>
<body>
    <h1>Kapcsolat üzenetek</h1>
    <table border="1">
        <tr>
            <th>Felhasználónév</th>
            <th>Email</th>
            <th>Beküldés ideje</th>
            <th>Üzenet</th>
            <th>Törlés</th>
        </tr>
        <?php
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($row['fnev']) . "</td>";
            echo "<td>" . htmlspecialchars($row['email']) . "</td>";
            echo "<td>" . htmlspecialchars($row['created_at']) . "</td>";
            echo "<td>" . htmlspecialchars($row['text']) . "</td>";
            echo "<td>";
            echo "<form method='POST' action=''>";
            echo "<input type='hidden' name='message_id' value='" . $row['id'] . "'>";
            echo "<input type='submit' name='delete_message' value='Törlés'>";
            echo "</form>";
            echo "</td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>
<?php
$db->close();
?>
