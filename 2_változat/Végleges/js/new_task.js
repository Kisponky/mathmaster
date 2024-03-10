const { default: Swal } = require("sweetalert2");

var currentForm = 1;
var darab = 0;
var kerdesek = [];
var valaszokA = [];
var valaszokB = [];
var valaszokC = [];
var valaszokD = [];
var radio = [];
var osztaly = document.getElementById('osztaly');


// Fő függvény a bemenet ellenőrzéséhez és a formok megjelenítéséhez
function checkInput() {
    var darabSzamInput = document.getElementById("darabSzamInput");
    darab = parseInt(darabSzamInput.value);

    if (currentForm != darab + 1) {


        if (!isNaN(darab) && darab >= 1 && darab <= 10 && !isNaN(osztaly.value)) {
            showForm(currentForm);
            darabSzamInput.disabled = true;
            osztaly.disabled = true;
            next();
        } else {
            Swal.fire({
                title: "Info",
                text: "Adj meg 1 és 10 közötti számot és válaszd ki az osztályt is!",
                icon: "info",
                confirmButtonColor: "#3498db"
            });
        }
    } else {
        createNewTask();
        alert(osztaly.value)
    }
}




//Megjeleníti a megadott űrlap számát a képernyőn, és elrejti az összes többit.
function showForm(formNumber) {
    for (var i = 1; i <= 10; i++) {
        document.getElementById("form" + i).classList.add("d-none");
    }
    document.getElementById("form" + formNumber).classList.remove("d-none");
}



/*
  Ellenőrzi a jelenlegi űrlapon lévő mezők kitöltését és a helyes válasz kiválasztását.
  Ha minden szükséges mező ki van töltve, és a helyes válasz kiválasztva, akkor a következő űrlapot jeleníti meg.
  Ellenkező esetben hibaüzenet jelenik meg.
*/
function next() {
    // var currentFormElement = document.getElementById("form" + currentForm);
    // var inputs = currentFormElement.getElementsByTagName("input");

    var kerdesInput = document.getElementById("kerdes" + currentForm).value;
    var valaszAInput = document.getElementById("valaszA" + currentForm).value;
    var valaszBInput = document.getElementById("valaszB" + currentForm).value;
    var valaszCInput = document.getElementById("valaszC" + currentForm).value;
    var valaszDInput = document.getElementById("valaszD" + currentForm).value;
    var radioButton = document.getElementsByName("helyes_valasz" + currentForm);

    if (kerdesInput && valaszAInput && valaszBInput && valaszCInput && valaszDInput) {
        var radioChecked = false;
        for (let i = 0; i < radioButton.length; i++) {
            if (radioButton[i].checked) {
                radioChecked = true;
                radioButton = radioButton[i].value
                break;
            }
        }
        if (radioChecked) {
            kerdesek.push(kerdesInput);
            valaszokA.push(valaszAInput);
            valaszokB.push(valaszBInput);
            valaszokC.push(valaszCInput);
            valaszokD.push(valaszDInput);
            radio.push(radioButton);
            currentForm++;
            if (currentForm <= darab) {
                showForm(currentForm);
            } else {
                showAllData();
            }
        } else {
            Swal.fire({
                title: "Info",
                text: "Kérlek válassz ki egy helyes választ!",
                icon: "info",
                confirmButtonColor: "#3498db"
            });
        }
    } else {
        Swal.fire({
            title: "Info",
            text: "Kérlek tölts ki minden mezőt!",
            icon: "info",
            confirmButtonColor: "#3498db"
        });
    }

}



/*
  Az összes kitöltött űrlap és a hozzájuk tartozó mezők megjelenítése, valamint azok letiltása.
*/
function showAllData() {
    document.getElementById("formButton").innerHTML = "Feltöltés"
    for (var i = 0; i < darab; i++) {
        var formElement = document.getElementById("form" + (i + 1));
        formElement.classList.remove("d-none");

        document.getElementById("kerdes" + (i + 1)).disabled = true;
        document.getElementById("valaszA" + (i + 1)).disabled = true;
        document.getElementById("valaszB" + (i + 1)).disabled = true;
        document.getElementById("valaszC" + (i + 1)).disabled = true;
        document.getElementById("valaszD" + (i + 1)).disabled = true;

        var radioButtons = document.getElementsByName("helyes_valasz" + (i + 1));
        for (var j = 0; j < radioButtons.length; j++) {
            radioButtons[j].disabled = true;
        }
    }
}


// Példa fetch hívás a kliensoldalról a /task/new végpontra
const createNewTask = async () => {
    const studentClass = osztaly.value; // Helyettesítsd a saját osztálynévvel
    const content = kerdesek; // Helyettesítsd a saját feladattartalommal
    const answer = [valaszokA, valaszokB, valaszokC, valaszokD, radio]; // Helyettesítsd a saját válasszal
    console.log(answer)

    try {
      const response = await fetch('http://localhost:8000/api/tasks/task/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ studentClass, content, answer }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); // Sikeres válasz esetén
        Swal.fire({
            title: "Sikeres feltöltés",
            icon: "success",
            confirmButtonColor: "#3498db"
        });
        setTimeout(() => {
            location.href = "../index.html"
        }, 2000)
      } else {
        const errorData = await response.json();
        console.error('Hiba a szerver válaszában:', errorData);
      }
    } catch (error) {
      console.error('Hiba a fetch hívás során:', error);
    }
};

// Hívjuk meg a createNewTask funkciót
