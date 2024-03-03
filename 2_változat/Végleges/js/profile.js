function updateUsername() {
    const newUsername = document.getElementById('userName').value;

    if (!newUsername) {
        Swal.fire({
            title: "A mező üres!",
            text: "Kérjük, adjon meg egy új felhasználónevet.",
            icon: "info",
            confirmButtonColor: "#3498db"
        })
        return;
    }

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
            Swal.fire({
                title: "Felhasználónév sikeresen frissítve!",
                text: `A te új felhasználóneved: ${document.getElementById("userName").value}`,
                icon: "success",
                confirmButtonColor: "#3498db"
            });
            document.getElementById("userName").value = "";
        })
        .catch(error => {
            console.error('Fetch error:', error);
            Swal.fire({
                title: "Hiba történt a felhasználónév frissítése során.",
                text: `${error}`,
                icon: "error",
                confirmButtonColor: "#3498db"
            });
        });
}



function updateEmail() {
    const newEmail = document.getElementById('userMail').value;

    if (!newEmail) {
        Swal.fire({
            title: "A mező üres!",
            text: "Kérjük, adjon meg egy új email címet.",
            icon: "info",
            confirmButtonColor: "#3498db"
        });
        return;
    }

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
            Swal.fire({
                title: "Email cím sikeresen frissítve!",
                text: `A te új email címed: ${document.getElementById("userMail").value}`,
                icon: "success",
                confirmButtonColor: "#3498db"
            });
            document.getElementById("userMail").value = "";
        })
        .catch(error => {
            console.error('Fetch error:', error);
            Swal.fire({
                title: "Hiba történt az email cím frissítése során.",
                text: `${error}`,
                icon: "error",
                confirmButtonColor: "#3498db"
            });
        });
}



function changePassword() {
    const oldPassword = document.getElementById('oldPw').value;
    const newPassword = document.getElementById('newPw').value;
    const newPassword2 = document.getElementById('newPw2').value;

    if (!oldPassword || !newPassword || !newPassword2) {
        Swal.fire({
            title: "Hiányzó jelszó",
            text: "Kérjük, töltse ki az összes mezőt.",
            icon: "info",
            confirmButtonColor: "#3498db"
        });
        return;
    }

    if (newPassword != newPassword2) {
        Swal.fire({
            title: "Hibás jelszó!",
            text: "A két jelsző nem egyezik.",
            icon: "info",
            confirmButtonColor: "#3498db"
        });
        return;
    }

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
            Swal.fire({
                title: "Jelszó sikeresen megváltoztatva!",
                icon: "success",
                confirmButtonColor: "#3498db"
            });
            document.getElementById("oldPw").value = "";
            document.getElementById("newPw").value = "";
            document.getElementById("newPw2").value = "";
        })
        .catch(error => {
            console.error('Fetch error:', error);
            Swal.fire({
                title: "Hiba történt a jelszóváltás során.",
                text: `${error}`,
                icon: "error",
                confirmButtonColor: "#3498db"
            });
        });
}



function deleteUserProfile() {

    Swal.fire({
        title: "Bizotos vagy benne?",
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

                        Swal.fire({
                            title: "A felhasználó törlésre került!",
                            icon: "success",
                            confirmButtonColor: "#3498db"
                        });

                        localStorage.removeItem('token')
                        localStorage.removeItem('admin')

                        setTimeout(function () {
                            location.href = "../index.html";
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                        Swal.fire({
                            title: "Sikertelen törlés!",
                            text: `${error}`,
                            icon: "error",
                            confirmButtonColor: "#3498db"
                        });
                    });


            } else {
                Swal.fire({
                    title: "Törlés visszavonva",
                    icon: "info",
                    confirmButtonColor: "#3498db"
                });
            }
        });

}





