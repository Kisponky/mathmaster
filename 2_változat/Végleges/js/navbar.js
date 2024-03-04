document.addEventListener("DOMContentLoaded", function () {
    var navbarMenu = document.getElementById('navbarMenu');
    var uzeneteim = document.getElementById('uzeneteim');
    var admin = document.getElementById('admin');



    // Felhasználó bejelentkezésének ellenőrzése
    if (localStorage.getItem("token")) {
        navbarMenu.innerHTML += getMenuHTML();
    } else {
        navbarMenu.innerHTML += getMenuHTML(false);
    }



    // Függvény a menüpontok HTML kódjának generálásához
    function getMenuHTML(isLoggedIn = true) {
        var menuHTML = '';
        menuHTML += '<li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Kezdőlap</a></li>';
        if (isLoggedIn) {
            menuHTML += '<li class="nav-item"><a class="nav-link" href="./html/about.html">Rólunk</a></li>';
            menuHTML += '<li class="nav-item"><a class="nav-link" href="./html/contact.html">Kapcsolat</a></li>';
            menuHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#uzenet">Üzenet küldés</a></li>';
        } else {
            menuHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#regisztracio">Regisztráció</a></li>';
            menuHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#bejelentkezes">Bejelentkezés</a></li>';
            menuHTML += '<li class="nav-item"><a class="nav-link" href="./html/about.html">Rólunk</a></li>';
        }
        return menuHTML;
    }


    
    // Profilom menü elrejtése, ha a felhasználó nincs bejelentkezve
    if (!localStorage.getItem("token")) {
        document.getElementById("profilom").style.display = "none";
    }



    // Üzenetek menüpont megjelenítése
    if (!localStorage.getItem("admin")) {
        uzeneteim.innerHTML += '<li><a class="dropdown-item" href="./html/messages.html">Üzeneteim</a></li>';
    }



    // Admin menüpont megjelenítése
    if (localStorage.getItem("admin")) {
        admin.innerHTML += '<li><a class="dropdown-item" href="./html/admin.html">Admin</a></li>';
    }
});
