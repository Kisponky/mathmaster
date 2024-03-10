document.addEventListener("DOMContentLoaded", function () {
    navBar();
});

function navBar() {
    var navbarMenu = document.getElementById('navbarMenu');
    var new_task = document.getElementById('new_task');
    var uzeneteim = document.getElementById('uzeneteim');
    var admin = document.getElementById('admin');

    navbarMenu.innerHTML = '';
    new_task.innerHTML = '';
    uzeneteim.innerHTML = '';
    admin.innerHTML = '';

    // Felhasználó bejelentkezésének ellenőrzése
    if (localStorage.getItem("token")) {
        navbarMenu.innerHTML += getMenuHTML();
    } else {
        navbarMenu.innerHTML += getMenuHTML(false);
    }



    // Profilom menü elrejtése, ha a felhasználó nincs bejelentkezve
    if (!localStorage.getItem("token")) {
        document.getElementById("profilom").style.display = "none";
    } else {
        document.getElementById("profilom").style.display = "block";
    }



    // Üzenetek menüpont megjelenítése
    if (!localStorage.getItem("admin")) {
        uzeneteim.innerHTML += '<li><a class="dropdown-item" href="./html/messages.html">Üzeneteim</a></li>';
    }



    // Admin menüpont megjelenítése
    if (localStorage.getItem("admin")) {
        new_task.innerHTML += '<li><a class="dropdown-item" href="./html/new_task.html">Új feladat...</a></li>';
        admin.innerHTML += '<li><a class="dropdown-item" href="./html/admin.html">Admin</a></li>';
    }
}

// Függvény a menüpontok HTML kódjának generálásához
function getMenuHTML(isLoggedIn = true) {
    var menuHTML='';
    menuHTML += '<li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Kezdőlap</a></li>';
    var aboutMenu = '<li class="nav-item"><a class="nav-link" href="./html/about.html">Rólunk</a></li>';
    if (isLoggedIn) {
        menuHTML += aboutMenu;
        menuHTML += '<li class="nav-item"><a class="nav-link" href="./html/contact.html">Kapcsolat</a></li>';
        menuHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#uzenet">Üzenet küldés</a></li>';
    } else {
        menuHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#regisztracio">Regisztráció</a></li>';
        menuHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#bejelentkezes">Bejelentkezés</a></li>';
        menuHTML += aboutMenu;
    }
    return menuHTML;
}