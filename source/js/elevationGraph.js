/*eslint-disable no-unused-vars*/

export const brandOrange = ['rgba(255, 179, 74, 1)'];

export function yAxesFormatter(value) {
    if (value != 0) {
        return value + ' m';
    } else {
        return value;
    }
}

export function xAxesFormatter(value, index, values) {
    if (value === 0) {
        return value; // No 'km' on zero
    } else {
        if (index === values.length - 1) return ''; // No last value
        return value + ' km'; // Everything else has a km attached.
    }
}

export function maxDistance(chartData) {
    // max distance is the last point in the distance/elevation array
    let maxDistance = chartData[chartData.length - 1]['x'];
    maxDistance = Math.round(maxDistance * 100) / 100; // Round to 2 decimal places
    return maxDistance;
}

export class ElevationGraph {
    constructor(graphContext) {
        this.ctx = graphContext;
    }

    createGraph(graphData){
        
    }
}