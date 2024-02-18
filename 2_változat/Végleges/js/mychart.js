var ctx = document.getElementById('myChart').getContext('2d');
var myBarChart;

//Backend
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

console.log(aktHonapok)



fetch(`http://localhost:8000/statisztika/${localStorage.getItem("token")}/${"összeadás"}`)
            .then(response => response.json())
            .then(data => {
                // alert(data.osszes + " / " + data.jo);
                console.log(data)
                if (jelenlegiHo < 5) {
                    // Felső for ciklus - sorrend: 9, 10, 11, 12
                    for (let i = 0; i < jelenlegiHo + 1; i++) {
                        osszeadasO.push(data[i + (6 - (jelenlegiHo + 1))].osszes);
                        osszeadasH.push(data[i + (6 - (jelenlegiHo + 1))].jo);
                    }
                
                    // Alsó for ciklus - sorrend: 1, 2
                    for (let i = 0; i < 6 - (jelenlegiHo + 1); i++) {
                        osszeadasO.push(data[i].osszes);
                        osszeadasH.push(data[i].jo);
                    }
                }
                
            })
            .catch(error => console.error('Hiba a fetch kérés során: ', error));

// console.log(osszeadasH);
// alert("Fut a chatr.js :)");
function updateChart() {
    if (myBarChart) {
        myBarChart.destroy();
    }

    myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [aktHonapok[5], aktHonapok[4], aktHonapok[3], aktHonapok[2], aktHonapok[1], aktHonapok[0]],
            datasets: [
                {
                    label: 'Összeadás',
                    data: [osszeadasO[5], osszeadasO[4], osszeadasO[3], osszeadasO[2], osszeadasO[1], osszeadasO[0]],
                    backgroundColor: 'rgba(99, 131, 255, 0.8)',
                    borderColor: 'rgba(99, 131, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Kivonás',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Szorzás',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(255, 215, 99, 0.8)',
                    borderColor: 'rgba(255, 215, 99, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Osztás',
                    data: [0, 0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(99, 255, 124, 0.8)',
                    borderColor: 'rgba(99, 255, 124, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14
                        },
                    },
                    grid: {
                        color: 'white'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14
                        },
                    },
                    grid: {
                        color: 'white'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Adott hónapban megoldott feladatok',
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

window.addEventListener('resize', function() {
    updateChart();
});

updateChart();

/*Nagy Ferót megkérdezni, hogyan lakítsuk ki a mobil nézetet és a nála nagyobb méreteket,
amikor üres rész kerül a diagram alá*/