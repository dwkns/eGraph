// Draw graph Lib
// Usage...
// let graphContex = document.getElementById('myChart');
// const eGraph = new ElevationGraph(graphContex);
// eGraph.createGraph(elevationData);


import Chart from 'chart.js';
import { vLine } from './vLine.js';

const brandOrange = ['rgba(255, 179, 74, 1)'];

function yAxesFormatter(value) {
    if (value != 0) {
        return value + ' m';
    } else {
        return value;
    }
}

function xAxesFormatter(value, index, values) {
    if (value === 0) {
        return value; // No 'km' on zero
    } else {
        if (index === values.length - 1) return ''; // No last value
        return value + ' km'; // Everything else has a km attached.
    }
}

function maxDistance(chartData) {
    // max distance is the last point in the distance/elevation array
    let maxDistance = chartData[chartData.length - 1]['x'];
    maxDistance = Math.round(maxDistance * 100) / 100; // Round to 2 decimal places
    return maxDistance;
}

export class ElevationGraph {
    constructor(graphContext) {
        this.graphContext = graphContext;
    }

    createGraph(elevationData) {
        this.elevationData = elevationData;
        return new Chart(this.graphContext, {

            plugins: vLine,
            type: 'line',
            data: {
                datasets: [{
                    data: this.elevationData,
                    backgroundColor: brandOrange,
                    borderColor: brandOrange,
                    borderWidth: 0,
                    pointHoverRadius: 0,
                    pointRadius: 0
                }]
            },
            options: {
                animation: {
                    duration: 0
                },
                tooltips: {
                    enabled: false,
                    // animationDuration: 0,
                    // custom: customTooltips,
                    // position: 'custom',
                    intersect: false
                },
                legend: {
                    display: false

                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: undefined,
                            min: 0,
                            stepSize: 50,
                            callback: yAxesFormatter
                        }
                    }],
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        ticks: {
                            beginAtZero: true,
                            max: maxDistance(this.elevationData),
                            min: 0,
                            stepSize: 10,
                            maxTicksLimit: 12,
                            callback: xAxesFormatter

                        }
                    }]
                }
            }
        });
    }
}