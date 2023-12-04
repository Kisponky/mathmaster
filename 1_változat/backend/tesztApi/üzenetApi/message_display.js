// Az üzenetek megjelenítéséhez szükséges elem kiválasztása
const messageContainer = document.getElementById("message-container");

// Az üzenetek lekérése a szerverről
function fetchMessages() {
    fetch('/api.php')
        .then(response => response.json())
        .then(data => {
            // Ellenőrzés, hogy van-e üzenet
            if (data && Object.keys(data).length > 0) {
                // Üzenetek megjelenítése
                for (const messageId in data) {
                    const message = data[messageId];
                    const messageElement = document.createElement('div');
                    messageElement.innerHTML = `<strong>Felhasználó: ${message.felhasznaloId}</strong><br>${message.text}<br><hr>`;
                    messageContainer.appendChild(messageElement);
                }
            } else {
                messageContainer.innerHTML = "Nincsenek üzenetek.";
            }
        })
        .catch(error => {
            console.error('Hiba történt az üzenetek lekérése közben:', error);
        });
}

// Az üzenetek lekérése az oldal betöltésekor
fetchMessages();