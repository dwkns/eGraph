// source/js/main.js
/*eslint-disable no-console*/

import { elevationData } from './elevationData.js';
import Chart from 'chart.js';
import { vLine } from './vLine.js';
import {brandOrange, yAxesFormatter, xAxesFormatter, maxDistance, ElevationGraph} from './elevationGraph.js';


let graphContex = document.getElementById('myChart');

const eGraph= new ElevationGraph(graphContex);


new Chart(graphContex, {

    plugins: vLine,
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
                    callback: yAxesFormatter
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
                    callback: xAxesFormatter

                }
            }]
        }
    }
});

