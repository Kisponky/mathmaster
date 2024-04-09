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

    if (localStorage.getItem("token")) {
        navbarMenu.innerHTML += getMenuHTML();
    } else {
        navbarMenu.innerHTML += getMenuHTML(false);
    }



    if (!localStorage.getItem("token")) {
        document.getElementById("profilom").style.display = "none";
    } else {
        document.getElementById("profilom").style.display = "block";
    }



    if (!localStorage.getItem("admin")) {
        uzeneteim.innerHTML += '<li><a class="dropdown-item  active" href="./messages.html">Üzeneteim</a></li>';
    }



    if (localStorage.getItem("admin")) {
        new_task.innerHTML += '<li><a class="dropdown-item" href="./new_task.html">Új feladat...</a></li>';
        admin.innerHTML += '<li><a class="dropdown-item" href="./admin.html">Admin</a></li>';
    }
}

function getMenuHTML() {
    var menuHTML='';
    menuHTML += '<li class="nav-item"><a class="nav-link" aria-current="page" href="../index.html">Kezdőlap</a></li>';
    if (window.location.href.includes("admin.html")) {
        menuHTML += '<li class="nav-item"><a class="nav-link active" href="./admin.html">Beérkező üzenetek</a></li>';
    } else {
        menuHTML += '<li class="nav-item"><a class="nav-link" href="./admin.html">Beérkező üzenetek</a></li>';
    }
    if (window.location.href.includes("vizsgalati_naplo.html")) {
        menuHTML += '<li class="nav-item"><a class="nav-link active" href="./vizsgalati_naplo.html">Vizsgálati napló</a></li>';
    } else {
        menuHTML += '<li class="nav-item"><a class="nav-link" href="./vizsgalati_naplo.html">Vizsgálati napló</a></li>';
    }
    menuHTML += '<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#adminModal">Admin felvétel</a></li>';
    return menuHTML;
}