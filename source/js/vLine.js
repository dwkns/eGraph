/*eslint-disable no-console*/
import Chart from 'chart.js';

// Configure plugin namespace
Chart.vLine = Chart.vLine || {};

function pointInRectange(point, rectangle) {

    if ((point.x >= rectangle.left) &&
        (point.x <= rectangle.right) &&
        (point.y <= rectangle.bottom) &&
        (point.y >= rectangle.top)) {
        return true;
    } else {
        return false;
    }
}

export var vLine = {
    id: 'vLine',
    showTooltip: false,
    tooltipWidth: 120,
    point: { x: 0, y: 0 },
    dataAtCurrentPosition: { x: 0, y: 0 },
    lineStrokeStyle: 'black',
    lineWidth: 0.5,

    // beforeInit: function(chartInstance, pluginOptions)
    beforeInit: function(chartInstance) {
        this.ensureTooltipElementExists(chartInstance);
        this.chartArea = chartInstance; // ensure that chartArea is not undefined.
    },

    // beforeEvent: function(chartInstance, event, pluginOptions)
    beforeEvent: function(chartInstance, event) {

        if (event.type === 'mousemove') {
            this.currentEvent = event;

            this.point = { x: event.x, y: event.y };

            this.chartArea = event.chart.chartArea;
            if (pointInRectange(this.point, this.chartArea)) {
                this.showTooltip = true;
            } else {
                this.showTooltip = false;
                this.tooltipElement.style.opacity = 0;
            }
            this.dataAtCurrentPosition = this.getDataAtXpos(chartInstance, event);

        }
    },

    // afterDraw: function(chartInstance, easingValue, pluginOptions)
    afterDraw: function(chartInstance) {
        // console.log('afterDraw');

        if (this.showTooltip) {
            var ctx = chartInstance.chart.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.point.x, this.chartArea.bottom);
            ctx.lineTo(this.point.x, this.chartArea.top);
            ctx.strokeStyle = this.lineStrokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.stroke();
            ctx.restore();

            let tooltipPosition = this.determineTooltipPosition(chartInstance, this.point);

            this.tooltipElement.innerHTML = `${this.getTooltipContent()}`;
            this.tooltipElement.style.opacity = 1;
            this.tooltipElement.style.position = 'absolute';
            this.tooltipElement.style.width = this.tooltipWidth;
            this.tooltipElement.style.backgroundColor = 'red';
            this.tooltipElement.style.pointerEvents = 'none';
            this.tooltipElement.style.left = tooltipPosition.x + 'px';
            this.tooltipElement.style.top = tooltipPosition.y + 'px';
        }
    },

    getTooltipContent() {
        const distance = this.dataAtCurrentPosition.x;
        const elevation = this.dataAtCurrentPosition.y;

        const distanceRounded = parseFloat(Math.round(distance * 100) / 100).toFixed(1);
        const elevationRounded = parseFloat(Math.round(elevation * 100) / 100).toFixed();

        const tooltipContent = `
        Distance : ${distanceRounded} km </br>
        Elevation : ${elevationRounded} m`;

        return tooltipContent;
    },

    determineTooltipPosition(chartInstance, point) {
        const chartPosition = chartInstance.chart.canvas.getBoundingClientRect();
        const top = chartPosition.top;

        let maxPosXforLine = chartPosition.right - this.tooltipWidth;
        let xPos = this.point.x;
        let yPos = top;

        if (point.x >= maxPosXforLine - 5 ) {
            xPos -= this.tooltipWidth;     
        } 

        return { x: xPos, y: yPos };
    },

    getDataAtXpos: function(chartInstance, event) {
        const dataSet = 0; //  assume only one dataset
        const dataIndexAtXposition = chartInstance.getElementsAtXAxis(event)[dataSet]._index;
        const dataAtindex = chartInstance.data.datasets[dataSet].data[dataIndexAtXposition];
        return dataAtindex;
    },

    ensureTooltipElementExists: function(chartInstance) {
        if (typeof this.tooltipElement === 'undefined') {
            this.tooltipElement = document.createElement('div');
            this.tooltipElement.id = 'output';
            this.tooltipElement.innerHTML = '';
            this.tooltipElement.style.opacity = 0;
            chartInstance.canvas.parentNode.appendChild(this.tooltipElement);
        }
    }
};

Chart.pluginService.register(vLine);