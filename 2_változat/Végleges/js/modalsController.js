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



function bejelentkez() {
  var emailL = document.getElementById('emailL').value;
  var jelszoL = document.getElementById('passwordL').value;
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
      if (data.admin == true) {
        localStorage.setItem('admin', data.admin);
      }
      navBar();
      $(bezarL).modal('hide');
    })
    .catch(error => {
      console.error('Hiba történt:', error);
    });
}



function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
  navBar();
}



function uzenet() {
  var text = document.getElementById("text").value;
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
          setTimeout(() => {
            $(bezarT).modal('hide');
          }, 3000);
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



$(function () {
  $('#registerContainer').load('../html/modal/register.html');
});

$(function () {
  $('#loginContainer').load('../html/modal/login.html');
});

$(function () {
  $('#uzenetContainer').load('../html/modal/uzenet.html');
});
