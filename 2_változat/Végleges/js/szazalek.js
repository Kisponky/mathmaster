var szazalekCtx = document.getElementById('szazalekChart').getContext('2d');
var szazalekChart;

<<<<<<< HEAD


// osszeadasH = [2, 3, 3, 3, 1, 4];
// osszeadasO = [3, 4, 6, 4, 1, 7];

=======
var osszeadas = [];
for (let i = 0; i < 6; i++) {
    if (osszeadasO[i] != 0) {
        osszeadas.push((osszeadasH[i] / osszeadasO[i]) * 100);
    } else {
        osszeadas.push(0)
    }
}
console.log(osszeadas)
>>>>>>> 53047f82330c28384148ad71861ef40901e340cd

var kivonasH = [0, 0, 0, 0, 0, 0];
var kivonasO = [0, 0, 0, 0, 0, 0];
var kivonas = [];
for (let i = 0; i < kivonasH.length; i++) {
    if (kivonasO[i] != 0) {
        kivonas.push((kivonasH[i] / kivonasO[i]) * 100);
    } else {
        kivonas.push(0)
    }
}

var szorzasH = [0, 0, 0, 0, 0, 0];
var szorzasO = [0, 0, 0, 0, 0, 0];
var szorzas = [];
for (let i = 0; i < szorzasH.length; i++) {
    if (szorzasO[i] != 0) {
        szorzas.push((szorzasH[i] / szorzasO[i]) * 100);
    } else {
        szorzas.push(0)
    }
}

var osztasH = [0, 0, 0, 0, 0, 0];
var osztasO = [0, 0, 0, 0, 0, 0];
var osztas = [];
for (let i = 0; i < osztasH.length; i++) {
    if (osztasO[i] != 0) {
        osztas.push((osztasH[i] / osztasO[i]) * 100);
    } else {
        osztas.push(0)
    }
}

function chart() {
    if (szazalekChart) {
        szazalekChart.destroy();
    }

    szazalekChart = new Chart(szazalekCtx, {
        type: 'bar',
        data: {
            labels: [aktHonapok[5], aktHonapok[4], aktHonapok[3], aktHonapok[2], aktHonapok[1], aktHonapok[0]],
            datasets: [
                {
                    label: 'Összeadás',
                    data: [osszeadas[5], osszeadas[4], osszeadas[3], osszeadas[2], osszeadas[1], osszeadas[0]],
                    backgroundColor: 'rgba(99, 131, 255, 0.8)',
                    borderColor: 'rgba(99, 131, 255, 1)',
                    borderWidth: 1,
                    stack: 'Stack 0',
                },
                {
                    label: 'Kivonás',
                    data: [kivonas[0], kivonas[1], kivonas[2], kivonas[3], kivonas[4], kivonas[5]],
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    stack: 'Stack 1',
                },
                {
                    label: 'Szorzás',
                    data: [szorzas[0], szorzas[1], szorzas[2], szorzas[3], szorzas[4], szorzas[5]],
                    backgroundColor: 'rgba(255, 215, 99, 0.8)',
                    borderColor: 'rgba(255, 215, 99, 1)',
                    borderWidth: 1,
                    stack: 'Stack 2',
                },
                {
                    label: 'Osztás',
                    data: [osztas[0], osztas[1], osztas[2], osztas[3], osztas[4], osztas[5]],
                    backgroundColor: 'rgba(99, 255, 124, 0.8)',
                    borderColor: 'rgba(99, 255, 124, 1)',
                    borderWidth: 1,
                    stack: 'Stack 3',
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
                    min: 0,
                    max: 100,
                    ticks: {
                        color: 'white',
                        font: {
                            size: 14
                        },
                        callback: function (value) {
                            return value + '%';
                        }
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
                    text: 'Helyes válaszok százalékban',
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

window.addEventListener('resize', function () {
    chart();
});

chart();


/*Nagy Ferót megkérdezni, hogyan lakítsuk ki a mobil nézetet és a nála nagyobb méreteket,
amikor üres rész kerül a diagram alá*/


// mychart.js
document.addEventListener('DOMContentLoaded', function () {
    // Itt folytathatod a mychart.js logikádat
    chart();
    updateChart();
});
