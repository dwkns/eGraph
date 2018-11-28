// source/js/main.js
/*eslint-disable no-console*/

import { elevationData } from './elevationData.js';
import { ElevationGraph } from './elevationGraph.js';


let graphContex = document.getElementById('myChart');
const eGraph = new ElevationGraph(graphContex);
const elevationGraph = eGraph.createGraph(elevationData);
console.log(elevationGraph);

