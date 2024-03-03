document.addEventListener("DOMContentLoaded", function () {
    var navbarMenu = document.getElementById('navbarMenu');
    if (localStorage.getItem("token")) {
        navbarMenu.innerHTML += '<li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Kezdőlap</a></li>';
        navbarMenu.innerHTML += '<li class="nav-item"><a class="nav-link" href="./html/about.html">Rólunk</a></li>';
        navbarMenu.innerHTML += '<li class="nav-item"><a class="nav-link" href="./html/contact.html">Kapcsolat</a></li>';
        navbarMenu.innerHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#uzenet">Üzenet küldés</a></li>';
    } else {
        navbarMenu.innerHTML += '<li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Kezdőlap</a></li>';
        navbarMenu.innerHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#regisztracio">Regisztráció</a></li>';
        navbarMenu.innerHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#bejelentkezes">Bejelentkezés</a></li>';
        navbarMenu.innerHTML += '<li class="nav-item"><a class="nav-link" href="#">Rólunk</a></li>';
    }



    var admin = document.getElementById('admin');
    if (localStorage.getItem("admin")) {
        admin.innerHTML += '<li><a class="dropdown-item" href="./html/admin.html">Admin</a></li>';
    }



    var uzeneteim = document.getElementById('uzeneteim');
    if (!localStorage.getItem("admin")) {
        uzeneteim.innerHTML += '<li><a class="dropdown-item" href="./html/messages.html">Üzeneteim</a></li>';
    }



    if (!localStorage.getItem("token")) {
        document.getElementById("profilom").style.display = "none";
    }
});
