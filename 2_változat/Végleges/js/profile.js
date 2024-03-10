// Felhasználónév frissítése
function updateUsername() {
    // Az új felhasználónév begyűjtése az űrlapról
    const newUsername = document.getElementById('userName').value;
    var userNameRegex = /^[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/;

    // Üres input mező ellenőrzése
    if (!newUsername) {
        Swal.fire({
            title: "A mező üres!",
            text: "Kérjük, adjon meg egy új felhasználónevet.",
            icon: "warning",
            confirmButtonColor: "#3498db"
        });
        return;
    } else if (!newUsername.match(userNameRegex)) {
        Swal.fire({
            title: "Hibás felhasználónév!",
            text: "A felhasználónév csak betűket, számokat és ékezetes karaktereket tartalmazhat!",
            icon: "warning",
            confirmButtonColor: "#3498db"
        });
        return;
    }

    // Felhasználónév frissítésének kérése a szerver felé
    fetch('http://localhost:8000/users/update-username', {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Sikeres frissítés üzenet megjelenítése
            Swal.fire({
                title: "Felhasználónév sikeresen frissítve!",
                text: `A te új felhasználóneved: ${newUsername}`,
                icon: "success",
                confirmButtonColor: "#3498db"
            });
            // Űrlap mezők ürítése
            document.getElementById("userName").value = "";
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Hibaüzenet megjelenítése
            Swal.fire({
                title: "Hiba történt a felhasználónév frissítése során.",
                text: `${error}`,
                icon: "error",
                confirmButtonColor: "#3498db"
            });
        });
}



// Email cím frissítése
function updateEmail() {
    // Az új email cím begyűjtése az űrlapról
    const newEmail = document.getElementById('userMail').value;
    var emailRegex = /^[a-z0-9._+\-~]+@[a-z0-9.\-]+\.[a-z]{2,}$/;

    // Üres input mező ellenőrzése
    if (!newEmail) {
        Swal.fire({
            title: "A mező üres!",
            text: "Kérjük, adjon meg egy új email címet.",
            icon: "warning",
            confirmButtonColor: "#3498db"
        });
        return;
    } else if (!newEmail.match(emailRegex)) {
        Swal.fire({
            title: "Hibás email cím!",
            text: "Kérjük, adjon meg egy érvényes email címet!",
            icon: "warning",
            confirmButtonColor: "#3498db"
        });
        return;
    }

    // Email frissítésének kérése a szerver felé
    fetch('http://localhost:8000/users/update-email', {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newEmail })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Sikeres frissítés esetén üzenet megjelenítése
            Swal.fire({
                title: "Email cím sikeresen frissítve!",
                text: `Az új email címe: ${newEmail}`,
                icon: "success",
                confirmButtonColor: "#3498db"
            });
            // Űrlap mezők ürítése
            document.getElementById("userMail").value = "";
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Hiba esetén üzenet megjelenítése
            Swal.fire({
                title: "Hiba történt az email cím frissítése során.",
                text: `${error}`,
                icon: "error",
                confirmButtonColor: "#3498db"
            });
        });
}




// Jelszó frissitése
function changePassword() {
    // A régi, új és megerősített jelszó begyűjtése az űrlapról
    const oldPassword = document.getElementById('oldPw').value;
    const newPassword = document.getElementById('newPw').value;
    const newPassword2 = document.getElementById('newPw2').value;
    var passwordRegex = /^[a-zA-Z0-9._+\-~!?]+$/;

    // Üres input mezők ellenőrzése
    if (!oldPassword || !newPassword || !newPassword2) {
        Swal.fire({
            title: "Hiányzó jelszó",
            text: "Kérjük, töltse ki az összes mezőt.",
            icon: "warning",
            confirmButtonColor: "#3498db"
        });
        return;
    } else if (newPassword.length < 6) {
        Swal.fire({
            title: "Hibás jelszó!",
            text: "A jelszónak legalább 6 karakter hosszúnak kell lennie!",
            icon: "warning",
            confirmButtonColor: "#3498db"
        });
        return;
    } else if (!newPassword.match(passwordRegex)) {
        Swal.fire({
            title: "Hibás jelszó!",
            text: "A jelszó csak betűket, számokat és speciális karaktereket (_ . - + ~ ! ?) tartalmazhat!",
            icon: "warning",
            confirmButtonColor: "#3498db"
        });
        return;
    }

    // Az új jelszavak egyezőségének ellenőrzése
    if (newPassword != newPassword2) {
        Swal.fire({
            title: "Hibás jelszó!",
            text: "A két jelsző nem egyezik.",
            icon: "warning",
            confirmButtonColor: "#3498db"
        });
        return;
    }

    // Jelszó frissítésének kérése a szerver felé
    fetch('http://localhost:8000/users/change-password', {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Sikeres jelszóváltoztatás esetén üzenet megjelenítése
            Swal.fire({
                title: "Jelszó sikeresen megváltoztatva!",
                icon: "success",
                confirmButtonColor: "#3498db"
            });
            // Űrlap mezők ürítése
            document.getElementById("oldPw").value = "";
            document.getElementById("newPw").value = "";
            document.getElementById("newPw2").value = "";
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Hiba esetén üzenet megjelenítése
            Swal.fire({
                title: "Hiba történt a jelszóváltás során.",
                text: `${error}`,
                icon: "error",
                confirmButtonColor: "#3498db"
            });
        });
}



// Felhasználói profil törlése
function deleteUserProfile() {
    // Felhasználó megerősítésének kérése a törlés előtt
    Swal.fire({
        title: "Biztos vagy benne?",
        text: "A fiók törlése visszavonhatatlan és minden adat törlődik! Hooty hiányolni fog.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#800000",
        cancelButtonColor: "#277049",
        cancelButtonText: "Mégsem",
        confirmButtonText: "Igen, töröld!",
        backdrop: "rgba(0, 0, 0, 0.93)",
    })
        .then((result) => {
            if (result.isConfirmed) {
                // Felhasználó törlése a szerverről
                fetch(`http://localhost:8000/users/deleteProfile`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token'),
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        // Sikeres törlés esetén üzenet megjelenítése
                        Swal.fire({
                            title: "A felhasználó törlésre került!",
                            icon: "success",
                            confirmButtonColor: "#3498db"
                        });
                        // Lokális tárolók ürítése
                        localStorage.removeItem('token')
                        localStorage.removeItem('admin')
                        // Újratöltés az index oldalra irányítással
                        setTimeout(function () {
                            location.href = "../index.html";
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                        // Hiba esetén üzenet megjelenítése
                        Swal.fire({
                            title: "Sikertelen törlés!",
                            text: `${error}`,
                            icon: "error",
                            confirmButtonColor: "#3498db"
                        });
                    });
            } else {
                // Törlés visszavonása esetén üzenet megjelenítése
                Swal.fire({
                    title: "Törlés visszavonva",
                    icon: "info",
                    confirmButtonColor: "#3498db"
                });
            }
        });
}