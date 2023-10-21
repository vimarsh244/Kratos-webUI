// Define global variables for the chart and data.
let chart;
let sub_data = [];

// Initialize the chart when the page loads.
document.addEventListener('DOMContentLoaded', () => {
    // Get the canvas element.
    const ctx = document.getElementById('myChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Timestamps or x-axis data
            datasets: [{
                label: 'Linear Accln IMU X',
                data: sub_data, // Initial data
                borderColor: 'yellow', // Set the line color to yellow
                backgroundColor: 'white', // Set the background color to white
                // fill: true, // Fill the area under the line
            }]
        },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'GRAPHSSSS',
                // text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
              }
            },
            scales: {
                x: [{
                    type: 'linear',
                    position: 'bottom',
                }],
                y: [{
                    ticks: {
                        beginAtZero: false,
                        suggestedMin: -3, // Set the minimum value on the Y-axis
                        suggestedMax: 3,  // Set the maximum value on the Y-axis
                    }
                }]
            },

        },

    });
});

