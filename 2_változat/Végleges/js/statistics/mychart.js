var ctx = document.getElementById('myChart').getContext('2d');
var myBarChart;



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
                    data: [kivonasO[5], kivonasO[4], kivonasO[3], kivonasO[2], kivonasO[1], kivonasO[0]],
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Szorzás',
                    data: [szorzasO[5], szorzasO[4], szorzasO[3], szorzasO[2], szorzasO[1], szorzasO[0]],
                    backgroundColor: 'rgba(255, 215, 99, 0.8)',
                    borderColor: 'rgba(255, 215, 99, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Osztás',
                    data: [osztasO[5], osztasO[4], osztasO[3], osztasO[2], osztasO[1], osztasO[0]],
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