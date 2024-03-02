function feladatGeneral() {
    fetch(`http://localhost:8000/api/tasks/task?osztaly=${localStorage.getItem('class')}&tipus=kvíz`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("token"),
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => kiir(data.tartalom, data.valaszlehetosegek))
        .catch(error => console.error('Hiba a fetch kérés során: ', error));
}
feladatGeneral();



function kiir(feladat, valaszok) {
    document.getElementById("kerdes").innerHTML = feladat;
    let valaszokBontva = valaszok.split(";");
    console.log(valaszokBontva);
    document.getElementById("valasz1").innerHTML = (valaszokBontva[0]);
    document.getElementById("valasz2").innerHTML = (valaszokBontva[1]);
    document.getElementById("valasz3").innerHTML = (valaszokBontva[2]);
    document.getElementById("valasz4").innerHTML = (valaszokBontva[3]);

    console.log(atob("helyes1"))
    localStorage.setItem('valasz', btoa(btoa(`val${valaszokBontva[4].toString()}asz`)))

    var btn = document.getElementsByClassName('btn');
    var max = btn[0];

    for (let i = 1; i < btn.length; i++) {
        if (btn[i].innerText.length > max.innerText.length) {
            max = btn[i];
        }
    }

    for (let i = 0; i < btn.length; i++) {
        btn[i].style.width = ''; 
    }

    for (let i = 0; i < btn.length; i++) {
        btn[i].style.width = max.offsetWidth + 10 + 'px';
    }

    console.log(max.innerText)
}



function valasz(id) {
    if (btoa(btoa(`val${id.toString()}asz`)) == localStorage.getItem('valasz')) {
        swal({
            icon: "success", 
            title: "Jó válasz!", 
            text: "Hooti büszke rád!", 
            timer: "2000"
        })

        setTimeout(() => {
            feladatGeneral();
        }, 2500);
    } else {
        swal({
            icon: "error", 
            title: "Rossz válasz!", 
            text: "Hooti bízik benned!", 
            timer: "2000"
        })
    }
}