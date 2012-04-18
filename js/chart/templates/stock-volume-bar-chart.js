/*global define*/
define(['./background', './y-axis-markers',  './x-axis-date-labels', './bars', './hotspots-column'], function (background, yAxisMarkers, xAxisDateLabels, bars, columnHotspots) {

    return function (labels) {

        this.print(background);
        this.print(yAxisMarkers, [function(n) { return (n / 1000 / 1000).toFixed(1) + 'm'; }, 'right']);
        this.print(xAxisDateLabels);
        this.print(bars, [0.5, 1]);
        this.print(columnHotspots);
    };

});

