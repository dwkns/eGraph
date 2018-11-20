// source/js/main.js
/*eslint-disable no-console*/

import { elevationData } from './elevationData.js';
import Chart from 'chart.js';
import { vLine } from './vLine.js';

let ctx = document.getElementById('myChart');

const brandOrange = ['rgba(255, 179, 74, 1)'];

new Chart(ctx, {

    plugins:  vLine ,
    type: 'line',
    data: {
        datasets: [{
            data: elevationData,
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
                    callback: function(value) {
                        if (value != 0) {
                            return value + ' m';
                        } else {
                            return value;
                        }
                    }
                }
            }],
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                    beginAtZero: true,
                    max: maxDistance(elevationData),
                    min: 0,
                    stepSize: 10,
                    maxTicksLimit: 12,
                    callback: function(value, index, values) {
                        if (value === 0) {
                            return value; // No 'km' on zero
                        } else {
                            if (index === values.length - 1) return ''; // No last value
                            return value + ' km'; // Everything else has a km attached.
                        }

                    }
                }
            }]
        }
    }
});

/* *********************** utils *********************** */

function maxDistance(chartData) {
    // max distance is the last point in the distance/elevation array
    let maxDistance = chartData[chartData.length - 1]['x'];
    maxDistance = Math.round(maxDistance * 100) / 100; // Round to 2 decimal places
    return maxDistance;
}