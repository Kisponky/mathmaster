// Az osztály kiválasztása és átirányítás a megfelelő oldalra
function osztaly(szam) {
  localStorage.setItem('class', szam);
  location.href = "./html/quiz_selector.html";
}

// Regisztráció
function register() {
  var fullName = document.getElementById('fullName').value;
  var userName = document.getElementById('userName').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var password2 = document.getElementById('password2').value;
  var bezar = document.getElementById('regisztracio');


  if (password != password2) {
    Swal.fire({
      title: "A jelszavak nem egyeznek!",
      text: "Kérjük megegyező jelszavakat adjon meg!",
      icon: "warning",
      confirmButtonColor: "#3498db"
    });
  } else {
    fetch("http://localhost:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        userName: userName,
        email: email,
        password: password
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == 404) {
          let err = document.getElementById("error");
          err.innerHTML = data.error;
        } else {
          Swal.fire({
            title: "Sikeres regisztráció!",
            icon: "success",
            confirmButtonColor: "#3498db",
            timer: 2000
          });
          setTimeout(() => {
            $(bezar).modal('hide');
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}



// Bejelentkezés
function bejelentkez() {
  var emailL = document.getElementById('emailL').value;
  var jelszoL = document.getElementById('passwordL').value;
  document.getElementById('emailL').value = "";
  document.getElementById('passwordL').value = "";
  var apiEndpoint = 'http://localhost:8000/users/login';
  var bezarL = document.getElementById('bejelentkezes');

  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: emailL, jelszo: jelszoL }),
  };


  fetch(apiEndpoint, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log('Sikeres bejelentkezés:', data);
      localStorage.setItem('token', data.token);
      const expirationTime = new Date(new Date().getTime() + data.expiresIn * 1000); // Az expiresIn másodpercben van, ezért szorozzuk meg 1000-rel
      localStorage.setItem('expirationTime', expirationTime.toISOString());
      if (data.admin == true) {
        localStorage.setItem('admin', data.admin);
      }
      navBar();
      autoLogout()
      $(bezarL).modal('hide');
    })
    .catch(error => {
      console.error('Hiba történt:', error);
    });
}



// Autómata kijelentkeztetés
function autoLogout() {
  if (new Date().getTime() < new Date(localStorage.getItem('expirationTime')).getTime()) {
    console.log((new Date(localStorage.getItem('expirationTime')).getTime()) - (new Date().getTime()))
    setTimeout(() => {
      logout()
    }, (new Date(localStorage.getItem('expirationTime')).getTime()) - (new Date().getTime()))
  
  } else {
    if (localStorage.getItem("token")) {
      logout()
    }
  }
}

autoLogout()


// Kijelentkezés
function logout() {
  if (localStorage.getItem("token")) {
    Swal.fire({
      title: "Sikeres kijelentkezés!",
      text: "Ön sikeresen kijelentkezett az oldalról.",
      icon: "success",
      confirmButtonColor: "#3498db",
      timer: 1000
    });
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }
  navBar();
  if (window.location.href.includes("/html/")) {
    setTimeout(() => {
      location.href = "../index.html"
    }, 1000);
  }
}



// Üzenet küldése
function uzenet() {
  var text = document.getElementById("text").value;
  document.getElementById("text").value = "";
  var token = localStorage.getItem("token");
  var bezarT = document.getElementById('uzenet');


  if (text.length > 0) {
    if (token) {
      var data = {
        text: text,
        token: token
      };

      fetch("http://localhost:8000/api/admin/text", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, token: token }),
      })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          Swal.fire({
            title: "Az üzenet sikeresen elküldve!",
            text: "Hamarosan válaszolunk önnek!",
            icon: "success",
            confirmButtonColor: "#3498db",
            timer: 3000
          });
          $(bezarT).modal('hide');
        })
        .catch(error => {
          console.error('Hiba történt a fetch kérés során:', error);
          Swal.fire({
            title: "Hiba történt az üzenet küldése közben!",
            text: `Hiba történt a szerveren: ${error}!`,
            icon: "error",
            confirmButtonColor: "#3498db"
          });
        });
    } else {
      Swal.fire({
        title: "Sikertelen volt bejelentkezés, kérjük próbáld újra!",
        text: "Az üzenetedet nem tudtuk továbbítani!",
        icon: "warning",
        confirmButtonColor: "#3498db"
      });
    }
  } else {
    Swal.fire({
      title: "Az üzenet nincs megadva!",
      text: "Kérem adjon meg egy üzenetet!",
      icon: "info",
      confirmButtonColor: "#3498db"
    });
  }
}



// Modálok betöltése
if (window.location.href.includes("index.html")) {
  $(function () {
    $('#registerContainer').load('./html/modal/register.html');
  });
  
  $(function () {
    $('#loginContainer').load('./html/modal/login.html');
  });
  
  $(function () {
    $('#uzenetContainer').load('./html/modal/uzenet.html');
  });
} else {
  $(function () {
    $('#registerContainer').load('../html/modal/register.html');
  });
  
  $(function () {
    $('#loginContainer').load('../html/modal/login.html');
  });
  
  $(function () {
    $('#uzenetContainer').load('../html/modal/uzenet.html');
  });
}

if (localStorage.getItem("admin")) {
  $(function () {
    $('#adminContainer').load('./modal/admin.html');
  });
}