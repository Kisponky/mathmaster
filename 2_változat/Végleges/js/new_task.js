var currentForm = 1;
var darab = 0;
var kerdesek = [];
var valaszokA = [];
var valaszokB = [];
var valaszokC = [];
var valaszokD = [];
var radio = [];
var osztaly = document.getElementById('osztaly');


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




function showForm(formNumber) {
    for (var i = 1; i <= 10; i++) {
        document.getElementById("form" + i).classList.add("d-none");
    }
    document.getElementById("form" + formNumber).classList.remove("d-none");
}




function next() {

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


const createNewTask = async () => {
    const studentClass = osztaly.value; 
    const content = kerdesek; 
    const answer = [valaszokA, valaszokB, valaszokC, valaszokD, radio]; 
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
        console.log(result); 
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