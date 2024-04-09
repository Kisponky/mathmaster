document.addEventListener("DOMContentLoaded", function () {
    adminCheck();
    uezenetekBetolt();
});



function adminCheck() {
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8000/api/auth/check-admin';

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message.includes('403') || error.message.includes('401')) {
                window.location.href = '../index.html';
            }
        });
}




function uezenetekBetolt() {
    const url = 'http://localhost:8000/api/admin/messages';
    const token = localStorage.getItem('token');

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const messagesContainer = document.getElementById('messages');
            data.forEach(kapcsolat => {
                const messageHTML = createMessageHTML(kapcsolat);
                messagesContainer.innerHTML += messageHTML;
            });
        })
        .catch(error => console.error('Hiba a fetch kérés során:', error));
}

function createMessageHTML(kapcsolat) {
    return `
        <div class="message-buborek" id="message-buborek${kapcsolat.kapcsolat_id}">
            <div class="message-header">
                <div class="message-user">${kapcsolat.felhasznalo_teljes_nev}</div>
                <div class="message-date">${new Date(kapcsolat.letrehozas_datuma).toLocaleDateString()}</div>
            </div>
            <div class="message-text">
                ${kapcsolat.beerkezett_uzenet}
                <textarea
                    oninput="this.style.height = ''; this.style.height = (this.scrollHeight + 2) + 'px';"
                    class="form-control" id="inputMezo${kapcsolat.kapcsolat_id}" rows="1"
                    placeholder="Ide írja válaszát..."></textarea>
                <button onclick="valaszKuldes(${kapcsolat.kapcsolat_id})" class="btn btn-info btn-info-class" id="inputButton${kapcsolat.kapcsolat_id}">Küldés</button>
            </div>
            <div class="message-actions">
                <button class="btn btn-primary btn-primary-class"
                    onclick="valaszInputMezo(${kapcsolat.kapcsolat_id})">Válasz</button>
                <button class="btn btn-danger btn-danger-class" onclick="torles(${kapcsolat.kapcsolat_id})">Törlés</button>
            </div>
        </div>
    `;
}

function valaszInputMezo(id) {
    const inputMezo = document.getElementById(`inputMezo${id}`);
    inputMezo.style.display = "block";
    const inputButton = document.getElementById(`inputButton${id}`);
    inputButton.style.display = "block";
}

function valaszKuldes(id) {
    const valaszUzenet = document.getElementById(`inputMezo${id}`).value;
    const url = `http://localhost:8000/api/admin/valasz/${id}`;
    const token = localStorage.getItem('token');

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({ uzenet: valaszUzenet, token: token }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('A szerver hibát adott vissza');
            }
            document.getElementById(`message-buborek${id}`).remove();
            return response.json();
        })
        .catch(error => {
            console.error('Hiba történt az API hívás során:', error.message);
        });
}

function torles(id) {
    const url = `http://localhost:8000/api/admin/kapcsolat/${id}`;
    const token = localStorage.getItem('token');

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP hiba! Státusz: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Sikeres törlés:', data);
            Swal.fire("Sikeres törlés!", "Az üzenet törlésre került.", "success");
            Swal.fire({
                title: "Sikeres törlés!",
                text: "Az üzenet törlésre került.",
                icon: "success",
                confirmButtonColor: "#3498db",
                timer: 2000
            });
            document.getElementById(`message-buborek${id}`).remove();
        })
        .catch(error => {
            console.error('Hiba a törlés során:', error);
        });
}



function adminFelvetel() {
    const url = 'http://localhost:8000/users/newAdmin';
    const token = localStorage.getItem('token');
    const emailInput = document.getElementById("ujAdminEmail").value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            email: emailInput
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP hiba! Státusz: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Sikeres admin felvétel:', data);
            Swal.fire({
                title: "Sikeres admin felvétel!",
                icon: "success",
                confirmButtonColor: "#3498db",
                timer: 2000
            });
        })
        .catch(error => {
            console.error('Hiba az admin felvétel során:', error);
        });
}