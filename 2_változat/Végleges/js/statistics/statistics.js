let m1 = false;
let m2 = false;
let m3 = false;
let m4 = false;

function loadContent() {
    if (m1 == true && m2 == true && m3 == true && m4 == true) {
        updateChart();
        chart()
    }
}

let honapok = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Júlus', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
let jelenlegiHo = new Date().getMonth();
let aktHonapok = [];
if (jelenlegiHo < 5) {
    for (let i = jelenlegiHo; i >= 0; i--) {
        aktHonapok.push(honapok[i])
    }
    for (let i = 11; i > jelenlegiHo + 6; i--) {
        aktHonapok.push(honapok[i])
    }
} else {
    for (let i = jelenlegiHo; i >= jelenlegiHo - 5; i--) {
        aktHonapok.push(honapok[i])
    }
}

let osszeadasO = [];
let osszeadasH = [];

var osszeadas = [];

fetch(`http://localhost:8000/api/tasks/statistics/${"összeadás"}`, {
    method: 'GET',
    headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (jelenlegiHo < 5) {
            for (let i = 0; i < jelenlegiHo + 1; i++) {
                osszeadasO.push(data[i + (6 - (jelenlegiHo + 1))].osszes);
                osszeadasH.push(data[i + (6 - (jelenlegiHo + 1))].jo);
            }
            for (let i = 0; i < 6 - (jelenlegiHo + 1); i++) {
                osszeadasO.push(data[i].osszes);
                osszeadasH.push(data[i].jo);
            }
        } else {
            for (let i = jelenlegiHo; i >= jelenlegiHo - 5; i--) {
                osszeadasO.push(data[i].osszes);
                osszeadasH.push(data[i].jo);
            }
        }

        for (let i = 0; i < 6; i++) {
            if (osszeadasO[i] != 0) {
                osszeadas.push((osszeadasH[i] / osszeadasO[i]) * 100);
            } else {
                osszeadas.push(0)
            }
        }
        console.log(osszeadas)
        m1 = true;
        loadContent()

    })
    .catch(error => console.error('Hiba a fetch kérés során: ', error));

    
let kivonasO = [];
let kivonasH = [];

var kivonas = [];

fetch(`http://localhost:8000/api/tasks/statistics/${"kivonás"}`, {
    method: 'GET',
    headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (jelenlegiHo < 5) {
            for (let i = 0; i < jelenlegiHo + 1; i++) {
                kivonasO.push(data[i + (6 - (jelenlegiHo + 1))].osszes);
                kivonasH.push(data[i + (6 - (jelenlegiHo + 1))].jo);
            }
            for (let i = 0; i < 6 - (jelenlegiHo + 1); i++) {
                kivonasO.push(data[i].osszes);
                kivonasH.push(data[i].jo);
            }
        } else {
            for (let i = jelenlegiHo; i >= jelenlegiHo - 5; i--) {
                kivonasO.push(data[i].osszes);
                kivonasH.push(data[i].jo);
            }
        }

        for (let i = 0; i < 6; i++) {
            if (kivonasO[i] != 0) {
                kivonas.push((kivonasH[i] / kivonasO[i]) * 100);
            } else {
                kivonas.push(0)
            }
        }
        console.log(kivonas)
        m2 = true;
        loadContent()
    })
    .catch(error => console.error('Hiba a fetch kérés során: ', error));


let szorzasO = [];
let szorzasH = [];

var szorzas = [];

fetch(`http://localhost:8000/api/tasks/statistics/${"szorzás"}`, {
    method: 'GET',
    headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (jelenlegiHo < 5) {
            for (let i = 0; i < jelenlegiHo + 1; i++) {
                szorzasO.push(data[i + (6 - (jelenlegiHo + 1))].osszes);
                szorzasH.push(data[i + (6 - (jelenlegiHo + 1))].jo);
            }
            for (let i = 0; i < 6 - (jelenlegiHo + 1); i++) {
                szorzasO.push(data[i].osszes);
                szorzasH.push(data[i].jo);
            }
        } else {
            for (let i = jelenlegiHo; i >= jelenlegiHo - 5; i--) {
                szorzasO.push(data[i].osszes);
                szorzasH.push(data[i].jo);
            }
        }

        for (let i = 0; i < 6; i++) {
            if (szorzasO[i] != 0) {
                szorzas.push((szorzasH[i] / szorzasO[i]) * 100);
            } else {
                szorzas.push(0)
            }
        }
        console.log(szorzas)
        m3 = true;
        loadContent()
    })
    .catch(error => console.error('Hiba a fetch kérés során: ', error));


let osztasO = [];
let osztasH = [];

var osztas = [];

fetch(`http://localhost:8000/api/tasks/statistics/${"osztás"}`, {
    method: 'GET',
    headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (jelenlegiHo < 5) {
            for (let i = 0; i < jelenlegiHo + 1; i++) {
                osztasO.push(data[i + (6 - (jelenlegiHo + 1))].osszes);
                osztasH.push(data[i + (6 - (jelenlegiHo + 1))].jo);
            }
            for (let i = 0; i < 6 - (jelenlegiHo + 1); i++) {
                osztasO.push(data[i].osszes);
                osztasH.push(data[i].jo);
            }
        } else {
            for (let i = jelenlegiHo; i >= jelenlegiHo - 5; i--) {
                osztasO.push(data[i].osszes);
                osztasH.push(data[i].jo);
            }
        }

        for (let i = 0; i < 6; i++) {
            if (osztasO[i] != 0) {
                osztas.push((osztasH[i] / osztasO[i]) * 100);
            } else {
                osztas.push(0)
            }
        }
        console.log(osztas)
        m4 = true;
        loadContent()

    })
    .catch(error => console.error('Hiba a fetch kérés során: ', error));