const chart = document.getElementById('odom_chart');

let sub_data = [];

const layout = {
    title: 'Real-time Chart with Plotly',
    xaxis: {
        title: 'Time'
    },
    yaxis: {
        title: 'Value',
        range: [-3, 3] // Set Y-axis range between -3 and 3
    }
};
const initialData = [{
    x: [],
    y: [],
    line: {color: 'blue'} // Set the line color to blue
}];

Plotly.newPlot(chart, initialData, layout);
