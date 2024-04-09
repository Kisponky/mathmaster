function osztaly(szam) {
  localStorage.setItem('class', szam);
  location.href = "./html/quiz_selector.html";
}

function register() {
  var fullName = document.getElementById('fullName').value;
  var userName = document.getElementById('userName').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var password2 = document.getElementById('password2').value;
  var bezar = document.getElementById('regisztracio');

  var fullNameRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/;
  var userNameRegex = /^[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/;
  var emailRegex = /^[a-z0-9._+\-~]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
  var passwordRegex = /^[a-zA-Z0-9._+\-~!?]+$/;

  if (!fullName || !userName || !email || !password || !password2) {
    Swal.fire({
      title: "Hiányzó adat!",
      text: "Kérjük, töltse ki az összes mezőt!",
      icon: "warning",
      confirmButtonColor: "#3498db"
    });
  } else if (!fullName.match(fullNameRegex)) {
    Swal.fire({
      title: "Hibás név!",
      text: "A teljes név csak betűket és ékezetes karaktereket tartalmazhat!",
      icon: "warning",
      confirmButtonColor: "#3498db"
    });
  } else if (!fullName.includes(" ")) {
    Swal.fire({
      title: "Hibás név!",
      text: "A teljes nevét adja meg!",
      icon: "warning",
      confirmButtonColor: "#3498db"
    });
  } else if (!userName.match(userNameRegex)) {
    Swal.fire({
      title: "Hibás felhasználónév!",
      text: "A felhasználónév csak betűket, számokat és ékezetes karaktereket tartalmazhat!",
      icon: "warning",
      confirmButtonColor: "#3498db"
    });
  } else if (!email.match(emailRegex)) {
    Swal.fire({
      title: "Hibás email cím!",
      text: "Kérjük, adjon meg egy érvényes email címet!",
      icon: "warning",
      confirmButtonColor: "#3498db"
    });
  } else if (password.length < 6) {
    Swal.fire({
      title: "Hibás jelszó!",
      text: "A jelszónak legalább 6 karakter hosszúnak kell lennie!",
      icon: "warning",
      confirmButtonColor: "#3498db"
    });
  } else if (!password.match(passwordRegex)) {
    Swal.fire({
      title: "Hibás jelszó!",
      text: "A jelszó csak betűket, számokat és speciális karaktereket (_ . - + ~ ! ?) tartalmazhat!",
      icon: "warning",
      confirmButtonColor: "#3498db"
    });
  } else if (password != password2) {
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
        if (response.status == 404 || response.status == 400) {
        }
        return response.json();
      })
      .then((data) => {
        if (data.error != undefined) {
          Swal.fire({
            title: "Sikertelen regisztráció!",
            text: data.error,
            icon: "error",
            confirmButtonColor: "#3498db",
            timer: 2000
          });
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
      console.log('Bejelentkezés állapota:', data);
      if (data.token != undefined) {
        localStorage.setItem('token', data.token);
        const expirationTime = new Date(new Date().getTime() + data.expiresIn * 1000); 
        localStorage.setItem('expirationTime', expirationTime.toISOString());
        if (data.admin == true) {
          localStorage.setItem('admin', data.admin);
        }
        navBar();
        autoLogout();
        $(bezarL).modal('hide');
      } else {
        Swal.fire({
          title: "Sikertelen bejelentkezés",
          text: data.error,
          icon: "warning",
          confirmButtonColor: "#3498db"
        });
      }
    })
    .catch(error => {
      console.error('Hiba történt:', error);
    });
}



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



function uzenet() {
  var text = document.getElementById("text").value;
  document.getElementById("text").value = "";
  var token = localStorage.getItem("token");
  var bezarT = document.getElementById('uzenet');

  var textRegex = /^[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\s!%^*()_\-+=:,.\/?]+$/;

  if (text.length > 0) {
    if (!text.match(textRegex)) {
      Swal.fire({
        title: "Hibás karakter az üzenetben!",
        text: "Az üzenet csak betűket, számokat és a következő speciális karaktereket tartalmazhatja: ! % ^ * ( ) _ - + = : , . / ?",
        icon: "warning",
        confirmButtonColor: "#3498db"
      });
    } else if (token) {
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