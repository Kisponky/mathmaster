var szazalekCtx = document.getElementById('szazalekChart').getContext('2d');
var szazalekChart;


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
                    data: [kivonas[5], kivonas[4], kivonas[3], kivonas[2], kivonas[1], kivonas[0]],
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    stack: 'Stack 1',
                },
                {
                    label: 'Szorzás',
                    data: [szorzas[5], szorzas[4], szorzas[3], szorzas[2], szorzas[1], szorzas[0]],
                    backgroundColor: 'rgba(255, 215, 99, 0.8)',
                    borderColor: 'rgba(255, 215, 99, 1)',
                    borderWidth: 1,
                    stack: 'Stack 2',
                },
                {
                    label: 'Osztás',
                    data: [osztas[5], osztas[4], osztas[3], osztas[2], osztas[1], osztas[0]],
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

document.addEventListener('DOMContentLoaded', function () {
    chart();
    updateChart();
});
