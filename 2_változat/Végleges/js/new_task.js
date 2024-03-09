var currentForm = 1;
var darab = 0;
var kerdesek = [];
var valaszokA = [];
var valaszokB = [];
var valaszokC = [];
var valaszokD = [];
var radio = [];


// Fő függvény a bemenet ellenőrzéséhez és a formok megjelenítéséhez
function checkInput() {
    var darabSzamInput = document.getElementById("darabSzamInput");
    darab = parseInt(darabSzamInput.value);

    if (currentForm != darab + 1) {


        if (!isNaN(darab) && darab >= 1 && darab <= 10) {
            showForm(currentForm);
            darabSzamInput.disabled = true;
            next();
        } else {
            Swal.fire({
                title: "Info",
                text: "Kérlek adj meg egy érvényes számot 1 és 10 között!",
                icon: "info",
                confirmButtonColor: "#3498db"
            });
        }
    } else {
        alert("vége")
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