var ctx = document.getElementById('myChart').getContext('2d');
var myBarChart;



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

window.addEventListener('resize', function () {
    updateChart();
});

updateChart();
