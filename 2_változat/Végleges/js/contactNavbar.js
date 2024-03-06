document.addEventListener("DOMContentLoaded", function () {
    navBar();
});

function navBar() {
    var navbarMenu = document.getElementById('navbarMenu');
    var uzeneteim = document.getElementById('uzeneteim');
    var admin = document.getElementById('admin');

    navbarMenu.innerHTML = '';
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
        uzeneteim.innerHTML += '<li><a class="dropdown-item" href="./messages.html">Üzeneteim</a></li>';
    }



    // Admin menüpont megjelenítése
    if (localStorage.getItem("admin")) {
        admin.innerHTML += '<li><a class="dropdown-item" href="./admin.html">Admin</a></li>';
    }
}

// Függvény a menüpontok HTML kódjának generálásához
function getMenuHTML() {
    var menuHTML='';
    menuHTML += '<li class="nav-item"><a class="nav-link" aria-current="page" href="../index.html">Kezdőlap</a></li>';
    menuHTML += '<li class="nav-item"><a class="nav-link" href="./about.html">Rólunk</a></li>';
    menuHTML += '<li class="nav-item"><a class="nav-link  active" href="./contact.html">Kapcsolat</a></li>';
    // menuHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#uzenet">Üzenet küldés</a></li>';
    return menuHTML;
}