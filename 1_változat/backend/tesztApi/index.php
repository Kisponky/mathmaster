<?php
require_once __DIR__ . '/config.php';
class API {
    function Select() {
        $db = new Connect;
        $users = array();
        $data = $db->prepare('SELECT * FROM Users WHERE 1');
        $data->execute();
        while($OutpuData = $data->fetch(PDO::FETCH_ASSOC)){
        $users[$OutpuData['id']] = array(
            'id'    => $OutpuData['id'],
            'teljesNev'  => $OutpuData['teljesNev'],
            'fnev'  => $OutpuData['fnev'],
            'email'  => $OutpuData['email'],
            'jelszo'  => $OutpuData['jelszo'],
            'letrehozas'  => $OutpuData['letrehozas'],
            'admin'  => $OutpuData['admin'],
        );
    }
    return json_encode($users);
    }
}

$API = new API;
header('Content-Type: application/json');
$response = $API->Select();

// JSON válasz dekódolása
$data = json_decode($response, true);

// Ellenőrzés, hogy a dekódolás sikeres volt-e
if ($data === null) {
    echo "Hiba a JSON dekódolás során.";
} else {
    // Most már hozzáférhetsz a kívánt adatokhoz
    if (isset($data[16]['id'])) {
        $userId = $data[16]['id'];
        $userEmail = $data[16]['teljesNev'];

        echo "Email cím: " . $userEmail;
    } else {
        echo "A megadott felhasználói azonosító nem található.";
    }
}