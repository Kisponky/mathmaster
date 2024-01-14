var ctx = document.getElementById('myChart').getContext('2d');
var myChart;

function updateChart() {
    // Ellenőrizd, hogy a diagram létezik-e, és ha igen, töröld azt
    if (myChart) {
        myChart.destroy();
    }

    // Új diagram létrehozása a frissített beállításokkal
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Január', 'Február', 'Március', 'Április', 'Május'],
            datasets: [
                {
                    label: 'Helytelen válaszok',
                    data: [2, 3, 4, 2, 1],
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Helyes válaszok',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgba(75, 192, 192, 1)',
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
                    text: 'Statisztikád hónapokra bontva',
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            }
        }              
    });
}

// Az ablak méretváltozásakor frissítsd a diagramot
window.addEventListener('resize', function() {
    updateChart();
});

// Oldal betöltésekor hozd létre az első diagramot
updateChart();

/*Nagy Ferót megkérdezni, hogyan lakítsuk ki a mobil nézetet és a nála nagyobb méreteket, 
amikor üres rész kerül a diagram alá*/