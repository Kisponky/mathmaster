var ctx = document.getElementById('myChart').getContext('2d');
var myBarChart;

function updateChart() {
    if (myBarChart) {
        myBarChart.destroy();
    }

    myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június'],
            datasets: [
                {
                    label: 'Összeadás',
                    data: [3, 4, 6, 4, 1, 7],
                    backgroundColor: 'rgba(99, 131, 255, 0.8)',
                    borderColor: 'rgba(99, 131, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Kivonás',
                    data: [6, 9, 3, 5, 2, 6],
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Szorzás',
                    data: [6, 1, 8, 2, 3, 3],
                    backgroundColor: 'rgba(255, 215, 99, 0.8)',
                    borderColor: 'rgba(255, 215, 99, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Osztás',
                    data: [9, 6, 9, 4, 6, 4],
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