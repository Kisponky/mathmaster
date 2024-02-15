var szazalekCtx = document.getElementById('szazalekChart').getContext('2d');
var szazalekChart;



var osszeadasH = [2, 3, 3, 3, 1, 4];
var osszeadasO = [3, 4, 6, 4, 1, 7];
var osszeadas = [];
for (let i = 0; i < osszeadasH.length; i++) {
    osszeadas.push((osszeadasH[i] / osszeadasO[i]) * 100);
}

var kivonasH = [4, 5, 3, 4, 2, 4];
var kivonasO = [6, 9, 3, 5, 2, 6];
var kivonas = [];
for (let i = 0; i < kivonasH.length; i++) {
    kivonas.push((kivonasH[i] / kivonasO[i]) * 100);
}

var szorzasH = [2, 1, 4, 1, 2, 2];
var szorzasO = [6, 1, 8, 2, 3, 3];
var szorzas = [];
for (let i = 0; i < szorzasH.length; i++) {
    szorzas.push((szorzasH[i] / szorzasO[i]) * 100);
}

var osztasH = [4, 5, 3, 3, 2, 4];
var osztasO = [9, 6, 9, 4, 6, 4];
var osztas = [];
for (let i = 0; i < osztasH.length; i++) {
    osztas.push((osztasH[i] / osztasO[i]) * 100);
}

function chart() {
    if (szazalekChart) {
        szazalekChart.destroy();
    }

    szazalekChart = new Chart(szazalekCtx, {
        type: 'bar',
        data: {
            labels: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június'],
            datasets: [
                {
                    label: 'Összeadás',
                    data: [osszeadas[0], osszeadas[1], osszeadas[2], osszeadas[3], osszeadas[4], osszeadas[5]],
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